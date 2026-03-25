// api/transition.js
module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { from, to } = req.body || {};
  if (!from || !to) return res.status(400).json({ error: 'Missing from/to' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key not configured' });

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 120,
        messages: [{
          role: 'user',
          content: `En 1-2 phrases poétiques en français (style narration documentaire historique), fais le lien entre ${from} et ${to}. Commence par "Entre..." ou "De..." ou "Du...". Évocateur, bref, mystérieux.`
        }]
      })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || 'API error');
    res.json({ text: data.content[0].text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
