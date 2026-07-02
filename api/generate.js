export default async function handler(req, res) {
  // CORS — Notion iframe, 로컬 테스트 모두 허용
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API 키가 설정되지 않았습니다. Vercel 환경변수를 확인하세요.' });
  }
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'prompt가 필요합니다.' });
  }
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 2000,
        system: '당신은 JSON만 출력하는 마케팅 분석 AI입니다. 어떤 경우에도 JSON 객체 하나만 출력하세요. 설명, 마크다운, 코드블록은 절대 사용하지 마세요. { 로 시작해서 } 로 끝내세요.',
        messages: [{ role: 'user', content: prompt }],
      }),
    });
    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: 'Anthropic API 오류: ' + errText.slice(0, 300) });
    }
    const data = await response.json();
    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }
    const text = (data.content || [])
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('\n');
    return res.status(200).json({ text });
  } catch (err) {
    return res.status(500).json({ error: '서버 오류: ' + err.message });
  }
}
