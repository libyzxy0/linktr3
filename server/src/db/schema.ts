import { pgTable, varchar, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().notNull(),
  name: varchar('name').notNull(),
  username: varchar('username'),
  bio: varchar('bio'), 
  email: varchar('email').notNull(), 
  avatar: varchar('avatar'), 
  password: varchar('password'), 
  provider: varchar('provider').notNull()
});

export const links = pgTable('links', {
  id: uuid('id').primaryKey().notNull(),
  user_id: uuid('user_id').references(() => users.id).notNull(),
  name: varchar('name').notNull(),
  logo: varchar('logo'),  
  url: varchar('url').notNull(), 
});

export const cards = pgTable('cards', {
  id: uuid('id').primaryKey().notNull(),
  user_id: uuid('user_id').references(() => users.id).notNull(),
  title: varchar('title').notNull(),
  description: varchar('description').notNull(), 
  image: varchar('image').notNull(), 
  url: varchar('url').notNull(), 
});