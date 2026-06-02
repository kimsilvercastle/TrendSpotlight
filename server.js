const http = require('http');
const fs = require('fs');
const path = require('path');
const { GoogleGenAI } = require('@google/generative-ai');

// Simple helper to load environment variables from env.txt or .env file
function loadEnv() {
  let envPath = path.resolve(process.cwd(), 'env.txt');
  if (!fs.existsSync(envPath)) {
    envPath = path.resolve(process.cwd(), '.env');
  }
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    content.split('\n').forEach(line => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = match[2] || '';
        // Remove quotes if present
        if (value.length > 0 && value.charAt(0) === '"' && value.charAt(value.length - 1) === '"') {
          value = value.substring(1, value.length - 1);
        }
        if (value.length > 0 && value.charAt(0) === "'" && value.charAt(value.length - 1) === "'") {
          value = value.substring(1, value.length - 1);
        }
        process.env[key] = value.trim();
      }
    });
  }
}

loadEnv();

const PORT = 5000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml'
};

const server = http.createServer(async (req, res) => {
  // Handle API route for Gemini Chat
  if (req.url === '/api/chat' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        const { message } = JSON.parse(body);
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey || apiKey === "YOUR_ACTUAL_API_KEY_HERE") {
          res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ 
            error: "Gemini API Key가 설정되지 않았습니다. 프로젝트 루트 폴더의 .env 파일에 실제 API 키를 입력해 주세요." 
          }));
          return;
        }

        // Initialize Google Gen AI
        const ai = new GoogleGenAI({ apiKey });
        
        // Generate content using gemini-1.5-flash
        const response = await ai.models.generateContent({
          model: 'gemini-1.5-flash',
          contents: message,
        });

        const reply = response.text || "답변을 받아올 수 없습니다.";

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ reply }));

      } catch (err) {
        console.error("Gemini API Error:", err);
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: "Gemini API 처리 중 오류 발생: " + err.message }));
      }
    });
    return;
  }

  // Handle static file serving
  let filePath = req.url === '/' ? './index.html' : '.' + req.url;
  filePath = filePath.split('?')[0];
  
  const ext = path.extname(filePath);
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('500 Internal Server Error: ' + err.code);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});

