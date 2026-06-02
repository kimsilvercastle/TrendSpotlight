const { GoogleGenAI } = require('@google/generative-ai');

module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  try {
    let payload = req.body;
    if (typeof payload === 'string') {
      payload = JSON.parse(payload);
    }
    const { message } = payload || {};

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      res.status(500).json({ 
        error: "Gemini API Key가 설정되지 않았습니다. Vercel 환경 변수(Environment Variables)에 GEMINI_API_KEY를 등록해 주세요." 
      });
      return;
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: message,
    });

    const reply = response.text || "답변을 받아올 수 없습니다.";
    res.status(200).json({ reply });
  } catch (err) {
    console.error("Gemini API Error:", err);
    res.status(500).json({ error: "Gemini API 처리 중 오류 발생: " + err.message });
  }
};
