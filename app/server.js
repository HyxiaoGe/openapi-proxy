const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

app.get('/', (req, res) => {
  res.send('API Proxy Service is running!');
});

// 添加健康检查端点
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
});

// OpenAI代理
app.use('/openai', createProxyMiddleware({
  target: 'https://api.openai.com',
  changeOrigin: true,
  pathRewrite: {'^/openai': ''},
  onProxyReq: (proxyReq) => {
    proxyReq.setHeader('User-Agent', 'Mozilla/5.0');
  }
}));

// Anthropic代理
app.use('/anthropic', createProxyMiddleware({
  target: 'https://api.anthropic.com',
  changeOrigin: true,
  pathRewrite: {'^/anthropic': ''},
  onProxyReq: (proxyReq) => {
    proxyReq.setHeader('User-Agent', 'Mozilla/5.0');
  }
}));

// 其他平台可以按照类似方式添加

// 启动服务
app.listen(3000, () => {
  console.log('Proxy server running on port 3000');
});
