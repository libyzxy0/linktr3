import { expect, test } from 'vitest'
import { transporter } from '../../src/utils/lib/nodemailer';

test('Mailer is ok?', async () => {
  const isMailerOk = await transporter.verify();
  expect(isMailerOk, 10000).toBe(true);
})