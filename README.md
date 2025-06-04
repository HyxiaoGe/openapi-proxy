# OpenAPI Proxy

一个基于 Node.js 和 Express 的 API 代理服务器，支持多个 AI 平台的 API 代理转发。

## 功能特性

- ✅ **OpenAI API 代理** - 支持 ChatGPT、GPT-4 等模型
- ✅ **Anthropic API 代理** - 支持 Claude 系列模型
- ✅ **健康检查端点** - 监控服务运行状态
- ✅ **请求头优化** - 自动设置 User-Agent
- ✅ **路径重写** - 自动处理 API 路径映射
- 🔧 **易于扩展** - 可轻松添加其他 AI 平台支持

## 技术栈

- **Node.js** - 运行环境
- **Express** - Web 框架
- **http-proxy-middleware** - 代理中间件

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动服务

```bash
# 生产环境
npm start

# 开发环境（需要 nodemon）
npm run dev
```

服务将在端口 3000 上启动。

## API 端点

### 基础端点

- `GET /` - 服务状态页面
- `GET /health` - 健康检查端点

### 代理端点

#### OpenAI API 代理

```bash
POST /openai/v1/chat/completions
```

代理到: `https://api.openai.com/v1/chat/completions`

#### Anthropic API 代理

```bash
POST /anthropic/v1/messages
```

代理到: `https://api.anthropic.com/v1/messages`

## 使用示例

### OpenAI API 调用

```bash
curl -X POST http://localhost:3000/openai/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_OPENAI_API_KEY" \
  -d '{
    "model": "gpt-3.5-turbo",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
```

### Anthropic API 调用

```bash
curl -X POST http://localhost:3000/anthropic/v1/messages \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -d '{
    "model": "claude-3-sonnet-20240229",
    "max_tokens": 1000,
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
```

### 健康检查

```bash
curl http://localhost:3000/health
```

响应示例：

```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 环境要求

- Node.js >= 14.0.0
- npm 或 yarn

## 开发

### 项目结构

``` bash
openapi-proxy/
├── app/
│   └── server.js          # 主服务器文件
├── package.json           # 项目配置
├── .gitignore            # Git 忽略文件
└── README.md             # 项目文档
```

### 添加新的 AI 平台

在 `app/server.js` 中添加新的代理配置：

```javascript
// 新平台代理示例
app.use('/newplatform', createProxyMiddleware({
  target: 'https://api.newplatform.com',
  changeOrigin: true,
  pathRewrite: {'^/newplatform': ''},
  onProxyReq: (proxyReq) => {
    proxyReq.setHeader('User-Agent', 'Mozilla/5.0');
  }
}));
```

## 部署

### Docker 部署（可选）

1. 创建 Dockerfile：

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

2.构建和运行：

```bash
docker build -t openapi-proxy .
docker run -p 3000:3000 openapi-proxy
```

### 传统部署

1.安装 PM2（进程管理器）：

```bash
npm install -g pm2
```

2.启动服务：

```bash
pm2 start app/server.js --name openapi-proxy
```

## 注意事项

- 🔑 请确保妥善保管你的 API 密钥
- 🌐 建议在生产环境中配置 HTTPS
- 📊 可根据需要添加请求日志和监控
- 🔒 考虑添加访问控制和频率限制

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request!
