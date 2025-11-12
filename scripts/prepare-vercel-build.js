const fs = require('fs-extra');
const path = require('path');

/**
 * Vercel 배포를 위한 빌드 스크립트
 * HTML 폴더의 내용을 그대로 유지하여 Vercel이 정적 사이트로 인식하도록 함
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
  console.log('✨ 빌드 준비 완료! (정적 사이트이므로 추가 빌드 불필요)');
}

prepareVercelBuild().catch((error) => {
  console.error('❌ 빌드 준비 중 오류 발생:', error);
  process.exit(1);
});

