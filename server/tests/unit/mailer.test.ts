import { expect, test } from 'vitest'
import { sum } from './sum'
import { transporter } from '../../src/utils/lib/nodemailer';

test('Mailer is ok?', async () => {
  const isMailerOk = await transporter.verify();
  expect(isMailerOk).toBe(true)
})