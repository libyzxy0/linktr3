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