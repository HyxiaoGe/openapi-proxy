/**
 * 应用配置文件
 */

const config = {
  // 服务器配置
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || '0.0.0.0'
  },
  
  // 代理配置
  proxy: {
    timeout: 30000,
    changeOrigin: true,
    secure: true
  },
  
  // 支持的平台配置
  platforms: {
    openai: {
      target: 'https://api.openai.com',
      path: '/openai',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; OpenAPI-Proxy/1.0)'
      }
    },
    anthropic: {
      target: 'https://api.anthropic.com',
      path: '/anthropic',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; OpenAPI-Proxy/1.0)'
      }
    }
  },
  
  // 日志配置
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    format: 'combined'
  }
};

module.exports = config; 