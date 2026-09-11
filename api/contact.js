import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, message } = req.body || {};

    if (!email || !message) {
      return res.status(400).json({ error: 'Email and message are required.' });
    }

    const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
    if (!databaseUrl) {
      console.warn('DATABASE_URL environment variable is missing.');
      return res.status(500).json({ error: 'Database connection string not configured.' });
    }

    const sql = neon(databaseUrl);

    await sql`
      INSERT INTO contact_submissions (name, email, phone, message)
      VALUES (${name || 'Anonymous'}, ${email}, ${phone || ''}, ${message})
    `;

    return res.status(200).json({ success: true, message: 'Your message has been received!' });
  } catch (error) {
    console.error('Neon contact submission error:', error);
    return res.status(500).json({ error: 'Failed to record message into database.' });
  }
}
