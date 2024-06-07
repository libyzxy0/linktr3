import { pgTable, varchar, uuid, integer, boolean, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm'

export const users = pgTable('users', {
  id: uuid('id').primaryKey().notNull(),
  name: varchar('name').notNull(),
  username: varchar('username'),
  bio: varchar('bio'), 
  email: varchar('email').notNull(), 
  avatar: varchar('avatar'), 
  password: varchar('password'), 
  provider: varchar('provider').notNull(), 
  visits: integer('visits').notNull(), 
  cover: varchar('cover'), 
  email_verified: boolean('email_verified')
});

export const links = pgTable('links', {
  id: uuid('id').primaryKey().notNull(),
  user_id: uuid('user_id').notNull().references(() => users.id),
  name: varchar('name').notNull(),
  logo: varchar('logo'),  
  url: varchar('url').notNull(), 
  clicks: integer('clicks').notNull()
});

export const linksRelations = relations(links, ({ one }) => ({
  user_id: one(users, {
    fields: [links.user_id],
    references: [users.id],
  }),
}));

export const cards = pgTable('cards', {
  id: uuid('id').primaryKey().notNull(),
  user_id: uuid('user_id').notNull().references(() => users.id),
  title: varchar('title').notNull(),
  description: varchar('description').notNull(), 
  image: varchar('image').notNull(), 
  url: varchar('url').notNull(), 
  clicks: integer('clicks').notNull()
});

export const cardsRelations = relations(links, ({ one }) => ({
  user_id: one(users, {
    fields: [cards.user_id],
    references: [users.id],
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  links: many(links),
  cards: many(cards)
}));

export const otps = pgTable('otp', {
  id: uuid('id').primaryKey().notNull(),
  email: varchar('email').notNull(),
  code: integer('code').notNull(), 
  created_at: timestamp('created_at').notNull(), 
});