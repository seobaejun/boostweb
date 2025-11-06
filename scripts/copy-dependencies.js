const fs = require('fs-extra');
const path = require('path');

// node_modules에서 assets 폴더로 복사할 라이브러리 매핑
const dependencies = {
  'jquery/dist/jquery.min.js': 'HTML/assets/js/jquery-3.7.0.js',
  'jquery-migrate/dist/jquery-migrate.min.js': 'HTML/assets/js/jquery-migrate-3.4.1.js',
  'bootstrap/dist/css/bootstrap.min.css': 'HTML/assets/css/bootstrap.min.css',
  'bootstrap/dist/js/bootstrap.bundle.min.js': 'HTML/assets/js/bootstrap.bundle.min.js',
  'slick-carousel/slick/slick.css': 'HTML/assets/css/slick.css',
  'slick-carousel/slick/slick.min.js': 'HTML/assets/js/slick.min.js',
  'scrollreveal/dist/scrollreveal.min.js': 'HTML/assets/js/scrollreveal.js',
  'swiper/swiper-bundle.min.css': 'HTML/assets/css/swiper-bundle.min.css',
  'swiper/swiper-bundle.min.js': 'HTML/assets/js/swiper-bundle.min.js',
  'countup.js/dist/countUp.min.js': 'HTML/assets/js/countUp.min.js',
  'waypoints/lib/jquery.waypoints.min.js': 'HTML/assets/js/waypoints.min.js',
  'animate.css/animate.min.css': 'HTML/assets/css/animate.min.css'
};

async function copyDependencies() {
  const nodeModulesPath = path.join(__dirname, '..', 'node_modules');
  
  console.log('📦 의존성 파일 복사 시작...\n');
  
  for (const [source, destination] of Object.entries(dependencies)) {
    const sourcePath = path.join(nodeModulesPath, source);
    const destPath = path.join(__dirname, '..', destination);
    const destDir = path.dirname(destPath);
    
    try {
      // 대상 디렉토리 생성
      await fs.ensureDir(destDir);
      
      // 파일 존재 확인
      if (await fs.pathExists(sourcePath)) {
        await fs.copy(sourcePath, destPath);
        console.log(`✅ ${source} → ${destination}`);
      } else {
        console.log(`⚠️  파일을 찾을 수 없습니다: ${sourcePath}`);
      }
    } catch (error) {
      console.error(`❌ 복사 실패: ${source} → ${destination}`, error.message);
    }
  }
  
  console.log('\n✨ 의존성 파일 복사 완료!');
}

copyDependencies().catch(console.error);

