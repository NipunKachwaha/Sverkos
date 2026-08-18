import type { Metadata } from 'next';
import PlanClientPage from './PlanClientPage';

export const metadata: Metadata = {
    title: 'Plan AI',
};

export default function PlanPage() {
    return <PlanClientPage />;
}