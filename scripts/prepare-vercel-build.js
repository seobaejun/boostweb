const fs = require('fs-extra');
const path = require('path');

/**
 * Vercel 배포를 위한 빌드 스크립트
 * HTML 폴더의 내용을 그대로 유지하여 Vercel이 정적 사이트로 인식하도록 함
 * Vercel 환경 변수에서 API 키를 읽어서 config.js 생성
 */
async function prepareVercelBuild() {
  const htmlDir = path.join(__dirname, '..', 'HTML');
  const outputDir = path.join(__dirname, '..', 'HTML');
  
  console.log('📦 Vercel 빌드 준비 중...');
  console.log(`소스 디렉토리: ${htmlDir}`);
  console.log(`출력 디렉토리: ${outputDir}`);
  
  // HTML 디렉토리가 존재하는지 확인
  if (!(await fs.pathExists(htmlDir))) {
    console.error(`❌ HTML 디렉토리를 찾을 수 없습니다: ${htmlDir}`);
    process.exit(1);
  }
  
  // index.html이 존재하는지 확인
  const indexHtmlPath = path.join(htmlDir, 'index.html');
  if (!(await fs.pathExists(indexHtmlPath))) {
    console.error(`❌ index.html을 찾을 수 없습니다: ${indexHtmlPath}`);
    process.exit(1);
  }
  
  console.log('✅ HTML 디렉토리 확인 완료');
  console.log('✅ index.html 확인 완료');
  
  // Vercel 환경 변수에서 API 키 읽기 (또는 .env 파일)
  const openaiApiKey = process.env.OPENAI_API_KEY || '';
  const openaiApiUrl = process.env.OPENAI_API_URL || 'https://api.openai.com/v1/chat/completions';
  
  // config.js 생성
  const configPath = path.join(htmlDir, 'assets', 'js', 'config.js');
  const configDir = path.dirname(configPath);
  
  // 디렉토리 생성
  await fs.ensureDir(configDir);
  
  // config.js 내용 생성
  const configContent = `// 자동 생성된 설정 파일 - Vercel 환경 변수에서 생성됩니다
// 이 파일은 .gitignore에 포함되어 Git에 커밋되지 않습니다
window.APP_CONFIG = {
  OPENAI_API_KEY: "${openaiApiKey}",
  OPENAI_API_URL: "${openaiApiUrl}"
};
`;
  
  await fs.writeFile(configPath, configContent, 'utf8');
  console.log('✅ config.js 파일 생성 완료');
  console.log(`   위치: ${configPath}`);
  console.log(`   API 키 설정: ${openaiApiKey ? '✅ 설정됨' : '⚠️  설정되지 않음 (Vercel 환경 변수 확인 필요)'}`);
  
  console.log('✨ 빌드 준비 완료!');
}

prepareVercelBuild().catch((error) => {
  console.error('❌ 빌드 준비 중 오류 발생:', error);
  process.exit(1);
});

