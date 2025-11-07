const fs = require('fs');
const path = require('path');

// .env 파일 읽기
function loadEnvFile() {
  const envPath = path.join(__dirname, '..', '.env');
  const env = {};
  
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      line = line.trim();
      // 주석이나 빈 줄 무시
      if (line && !line.startsWith('#')) {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0) {
          env[key.trim()] = valueParts.join('=').trim();
        }
      }
    });
  }
  
  return env;
}

// config.js 파일 생성
function generateConfig() {
  const env = loadEnvFile();
  const configPath = path.join(__dirname, '..', 'HTML', 'assets', 'js', 'config.js');
  const configDir = path.dirname(configPath);
  
  // 디렉토리 생성
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }
  
  // config.js 내용 생성
  const configContent = `// 자동 생성된 설정 파일 - .env 파일에서 생성됩니다
// 이 파일은 .gitignore에 포함되어 Git에 커밋되지 않습니다
window.APP_CONFIG = {
  OPENAI_API_KEY: "${env.OPENAI_API_KEY || ''}",
  OPENAI_API_URL: "${env.OPENAI_API_URL || 'https://api.openai.com/v1/chat/completions'}"
};
`;
  
  fs.writeFileSync(configPath, configContent, 'utf8');
  console.log('✅ config.js 파일이 생성되었습니다.');
  console.log(`   위치: ${configPath}`);
}

generateConfig();

