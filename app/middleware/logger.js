/**
 * 日志中间件
 */

const fs = require('fs');
const path = require('path');

// 确保日志目录存在
const logDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

/**
 * 请求日志中间件
 */
const requestLogger = (req, res, next) => {
  const start = Date.now();
  const timestamp = new Date().toISOString();
  
  // 记录请求开始
  console.log(`[${timestamp}] ${req.method} ${req.url} - Started`);
  
  // 监听响应结束
  res.on('finish', () => {
    const duration = Date.now() - start;
    const logMessage = `[${new Date().toISOString()}] ${req.method} ${req.url} - ${res.statusCode} - ${duration}ms`;
    console.log(logMessage);
    
    // 写入日志文件
    const logFile = path.join(logDir, 'access.log');
    fs.appendFileSync(logFile, logMessage + '\n');
  });
  
  next();
};

/**
 * 错误日志记录
 */
const errorLogger = (error, req, res, next) => {
  const timestamp = new Date().toISOString();
  const errorMessage = `[${timestamp}] ERROR ${req.method} ${req.url} - ${error.message}\n${error.stack}`;
  
  console.error(errorMessage);
  
  // 写入错误日志文件
  const errorLogFile = path.join(logDir, 'error.log');
  fs.appendFileSync(errorLogFile, errorMessage + '\n\n');
  
  next(error);
};

module.exports = {
  requestLogger,
  errorLogger
}; 