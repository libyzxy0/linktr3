import { users, links } from '@/db/schema';
import { db } from '@/db';

(async function () {
  await db.delete(links);
  await db.delete(users);
})();