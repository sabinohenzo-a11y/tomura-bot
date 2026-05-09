import { verifyKey } from 'discord-interactions';

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');

  const signature = req.headers['x-signature-ed25519'];
  const timestamp = req.headers['x-signature-timestamp'];
  
  const rawBody = await getRawBody(req);
  
  const PUBLIC_KEY = '076b5178da63296b76414bbfb959157f8878488e05cd1b2d0519d218f5b116fa';
  
  const isValid = verifyKey(rawBody, signature, timestamp, PUBLIC_KEY);
  
  if (!isValid) return res.status(401).send('Bad request signature');
  
  const interaction = JSON.parse(rawBody);
  if (interaction.type === 1) return res.status(200).json({ type: 1 });
  
  return res.status(200).json({
    type: 4,
    data: { content: 'Tomura Bot online!' }
  });
}

async function getRawBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks);
}