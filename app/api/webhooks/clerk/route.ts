// app/api/webhooks/clerk/route.ts
import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { db } from '@/lib/supabase';
import { users } from '@/db/schema';

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        throw new Error('CLERK_WEBHOOK_SECRET is not set in .env.local');
    }

    // Get headers
    const svix_id = headers().get('svix-id');
    const svix_timestamp = headers().get('svix-timestamp');
    const svix_signature = headers().get('svix-signature');

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error: Missing svix headers', { status: 400 });
    }

    // Get body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Verify webhook
    const wh = new Webhook(WEBHOOK_SECRET);
    let evt: any;

    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        });
    } catch (err: any) {
        console.error('Error verifying webhook:', err.message);
        return new Response('Error: Invalid signature', { status: 400 });
    }

    // Handle the event
    const { id, ...attributes } = evt.data;

    if (evt.type === 'user.created') {
        console.log(`Creating user in DB for Clerk ID: ${id}`);

        const primaryEmail = attributes.email_addresses?.find((e: any) => e.id === attributes.primary_email_address_id)?.email_address || '';
        const firstName = attributes.first_name || '';
        const lastName = attributes.last_name || '';

        await db.insert(users).values({
            clerkId: id,
            email: primaryEmail,
            name: `${firstName} ${lastName}`.trim() || 'Unknown User',
            username: attributes.username || null,
            avatarUrl: attributes.image_url || null,
        }).onConflictDoNothing(); // If already exists, do not throw an error
    }

    return new Response('Webhook received successfully', { status: 200 });
}