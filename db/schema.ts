import {
  pgTable,
  uuid,
  text,
  integer,
  boolean,
  timestamp,
  uniqueIndex,
  jsonb,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// 1. Users / Members (Combined Table)
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkId: text("clerk_id").notNull().unique(), 
  name: text("name"),
  username: text("username"),
  avatarUrl: text("avatar_url"),
  email: text("email").notNull(),
  isAdmin: boolean("is_admin").default(false),
  apiKeyPreference: text("api_key_preference").default("quotaExhausted"),
  apiKeyValue: text("api_key_value"), 
  apiKeyOpenAI: text("api_key_openai"),
  apiKeyXAI: text("api_key_xai"),
  apiKeyGoogle: text("api_key_google"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 2. Sessions (Linked to Users)
export const sessions = pgTable("sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  memberId: uuid("member_id").references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 3. Chats (Linked to Sessions)
export const chats = pgTable(
  "chats",
  {
    id: uuid("id").primaryKey().defaultRandom(), 
    creatorId: uuid("creator_id").references(() => sessions.id, { onDelete: "cascade" }),
    urlId: text("url_id"), 
    description: text("description"),
    timestamp: timestamp("timestamp").defaultNow(),
    lastMessageRank: integer("last_message_rank"),
    lastSubchatIndex: integer("last_subchat_index").default(0),
    hasBeenDeployed: boolean("has_been_deployed").default(false),
    isDeleted: boolean("is_deleted").default(false),
    convexProjectKind: text("convex_project_kind"), 
    projectSlug: text("project_slug"),
    teamSlug: text("team_slug"),
    deploymentUrl: text("deployment_url"),
    deploymentName: text("deployment_name"),
  },
  (table) => ({
    creatorUrlIdx: uniqueIndex("creator_url_idx").on(table.creatorId, table.urlId),
  })
);

// 4. Chat Messages Storage
export const chatMessagesStorageState = pgTable("chat_messages_storage_state", {
  id: uuid("id").primaryKey().defaultRandom(),
  chatId: uuid("chat_id").references(() => chats.id, { onDelete: "cascade" }).notNull(),
  storageUrl: text("storage_url"), 
  subchatIndex: integer("subchat_index").notNull(),
  lastMessageRank: integer("last_message_rank").notNull(),
  description: text("description"),
  partIndex: integer("part_index").notNull(),
  snapshotUrl: text("snapshot_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 5. Shares
export const shares = pgTable("shares", {
  id: uuid("id").primaryKey().defaultRandom(),
  chatId: uuid("chat_id").references(() => chats.id, { onDelete: "cascade" }).notNull(),
  snapshotUrl: text("snapshot_url").notNull(),
  code: text("code").notNull().unique(), 
  chatHistoryUrl: text("chat_history_url"),
  lastMessageRank: integer("last_message_rank").notNull(),
  lastSubchatIndex: integer("last_subchat_index").notNull(),
  partIndex: integer("part_index"),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 6. Social Shares
export const socialShares = pgTable("social_shares", {
  id: uuid("id").primaryKey().defaultRandom(),
  chatId: uuid("chat_id").references(() => chats.id, { onDelete: "cascade" }).notNull(),
  code: text("code").notNull().unique(),
  thumbnailImageUrl: text("thumbnail_image_url"),
  sharedStatus: text("shared_status").default("noPreferenceExpressed"), 
  allowForkFromLatest: boolean("allow_fork_from_latest").default(true),
  linkToDeployed: boolean("link_to_deployed").default(true),
  referralCode: text("referral_code"),
});

// 7. Projects (Linked to Users)
export const projects = pgTable('projects', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: "cascade" }).notNull(),
  name: text('name').notNull(),
  description: text('description'),
  framework: text('framework').default('nextjs'), 
  status: text('status').default('planning'), 
  config: jsonb('config').default({}),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 8. Project Files
export const projectFiles = pgTable('project_files', {
  id: uuid('id').primaryKey().defaultRandom(),
  projectId: uuid('project_id').references(() => projects.id, { onDelete: "cascade" }).notNull(),
  path: text('path').notNull(),
  content: text('content').notNull(),
  language: text('language').notNull(),
  isEntry: boolean('is_entry').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 9. Generation Logs
export const generationLogs = pgTable('generation_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  projectId: uuid('project_id').references(() => projects.id, { onDelete: "cascade" }).notNull(),
  prompt: text('prompt').notNull(),
  model: text('model').notNull(),
  tokensUsed: integer('tokens_used'),
  duration: integer('duration'), 
  status: text('status').notNull(), 
  error: text('error'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 10. Deployments
export const deployments = pgTable('deployments', {
  id: uuid('id').primaryKey().defaultRandom(),
  projectId: uuid('project_id').references(() => projects.id, { onDelete: "cascade" }).notNull(),
  platform: text('platform').notNull(), 
  url: text('url'),
  status: text('status').notNull(), 
  logs: text('logs'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});


// --- MERGED RELATIONS ---

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  projects: many(projects),
}));

export const sessionsRelations = relations(sessions, ({ one, many }) => ({
  user: one(users, {
    fields: [sessions.memberId],
    references: [users.id],
  }),
  chats: many(chats),
}));

export const chatsRelations = relations(chats, ({ one, many }) => ({
  creator: one(sessions, {
    fields: [chats.creatorId],
    references: [sessions.id],
  }),
  messagesState: many(chatMessagesStorageState),
  shares: many(shares),
  socialShares: many(socialShares),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
  user: one(users, {
    fields: [projects.userId],
    references: [users.id],
  }),
  files: many(projectFiles),
  logs: many(generationLogs),
  deployments: many(deployments),
}));

export const projectFilesRelations = relations(projectFiles, ({ one }) => ({
  project: one(projects, {
    fields: [projectFiles.projectId],
    references: [projects.id],
  }),
}));

export const generationLogsRelations = relations(generationLogs, ({ one }) => ({
  project: one(projects, {
    fields: [generationLogs.projectId],
    references: [projects.id],
  }),
}));

export const deploymentsRelations = relations(deployments, ({ one }) => ({
  project: one(projects, {
    fields: [deployments.projectId],
    references: [projects.id],
  }),
}));