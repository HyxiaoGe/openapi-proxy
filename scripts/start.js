#!/usr/bin/env node

/**
 * 应用启动脚本
 */

const config = require('../app/config');

// 检查环境变量
const requiredEnvVars = ['NODE_ENV'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.warn('警告: 以下环境变量未设置:', missingEnvVars.join(', '));
  console.warn('将使用默认值继续运行...');
}

// 设置进程标题
process.title = 'openapi-proxy';

// 处理未捕获的异常
process.on('uncaughtException', (error) => {
  console.error('未捕获的异常:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('未处理的Promise拒绝:', reason);
  process.exit(1);
});

// 优雅关闭处理
process.on('SIGTERM', () => {
  console.log('收到SIGTERM信号，开始优雅关闭...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('收到SIGINT信号，开始优雅关闭...');
  process.exit(0);
});

// 启动应用
console.log('启动OpenAPI代理服务器...');
console.log('环境:', process.env.NODE_ENV || 'development');
console.log('端口:', config.server.port);

require('../app/server'); 