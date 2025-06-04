/**
 * 请求验证工具
 */

/**
 * 验证API密钥格式
 */
const validateApiKey = (key, platform) => {
  if (!key) {
    return { valid: false, error: 'API密钥不能为空' };
  }
  
  switch (platform) {
    case 'openai':
      if (!key.startsWith('sk-')) {
        return { valid: false, error: 'OpenAI API密钥格式无效' };
      }
      break;
    case 'anthropic':
      if (!key.startsWith('sk-ant-')) {
        return { valid: false, error: 'Anthropic API密钥格式无效' };
      }
      break;
  }
  
  return { valid: true };
};

/**
 * 验证请求头
 */
const validateHeaders = (req, platform) => {
  const errors = [];
  
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    errors.push('Content-Type必须为application/json');
  }
  
  if (platform === 'openai' && !req.headers.authorization) {
    errors.push('缺少Authorization头');
  }
  
  if (platform === 'anthropic') {
    if (!req.headers['x-api-key']) {
      errors.push('缺少x-api-key头');
    }
    if (!req.headers['anthropic-version']) {
      errors.push('缺少anthropic-version头');
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};

/**
 * 验证请求体
 */
const validateRequestBody = (body, platform) => {
  if (!body) {
    return { valid: false, error: '请求体不能为空' };
  }
  
  if (platform === 'openai') {
    if (!body.model) {
      return { valid: false, error: '缺少model参数' };
    }
    if (!body.messages || !Array.isArray(body.messages)) {
      return { valid: false, error: 'messages必须是数组' };
    }
  }
  
  if (platform === 'anthropic') {
    if (!body.model) {
      return { valid: false, error: '缺少model参数' };
    }
    if (!body.messages || !Array.isArray(body.messages)) {
      return { valid: false, error: 'messages必须是数组' };
    }
    if (!body.max_tokens) {
      return { valid: false, error: '缺少max_tokens参数' };
    }
  }
  
  return { valid: true };
};

module.exports = {
  validateApiKey,
  validateHeaders,
  validateRequestBody
}; 