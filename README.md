# Marketing Website Project

마케팅 웹사이트 프로젝트입니다.

## 설치된 라이브러리

다음 라이브러리들이 npm을 통해 설치되었습니다:

- **jQuery** (^3.7.0) - DOM 조작 및 이벤트 처리
- **jQuery Migrate** (^3.4.1) - jQuery 버전 호환성
- **Bootstrap** (^5.3.0) - 반응형 UI 프레임워크
- **Slick Carousel** (^1.8.1) - 이미지 슬라이더
- **ScrollReveal** (^4.0.9) - 스크롤 애니메이션
- **Swiper** (^11.0.0) - 터치 슬라이더
- **CountUp.js** (^2.6.0) - 숫자 카운트업 애니메이션
- **Waypoints** (^4.0.1) - 스크롤 트리거
- **Animate.css** (^4.1.1) - CSS 애니메이션
- **Phosphor Icons** (^2.0.0) - 아이콘 라이브러리

## 설치 방법

```bash
npm install
```

설치 후 자동으로 `node_modules`의 파일들이 `HTML/assets` 폴더로 복사됩니다.

## 프로젝트 구조

```
Main_marketing/
├── HTML/              # HTML 파일들
│   ├── assets/        # CSS, JS, 이미지 파일
│   └── *.html         # 페이지 파일들
├── Documentation/      # 문서화 파일들
├── node_modules/      # npm 패키지 (자동 생성)
├── scripts/           # 유틸리티 스크립트
│   └── copy-dependencies.js
├── package.json       # 프로젝트 설정 및 의존성
└── README.md          # 이 파일
```

## 개발 서버 실행

### 빠른 시작 (Windows)

1. **더블클릭으로 실행**: 프로젝트 폴더에서 `start-server.bat` 파일을 더블클릭
2. 자동으로 의존성 설치 및 서버 실행

### 수동 실행

개발 서버를 시작하려면 다음 명령어를 실행하세요:

```bash
# 1. 의존성 설치 (최초 1회만)
npm install

# 2. 개발 서버 실행
npm run dev
```

또는

```bash
npm start
```

서버가 실행되면 브라우저가 자동으로 열리고 `http://localhost:3000/index.html`에서 사이트를 확인할 수 있습니다.

### 주요 페이지 URL

- **홈페이지**: http://localhost:3000/index.html
- **회원가입**: http://localhost:3000/signup.html
- **로그인**: http://localhost:3000/login.html
- **Admin 초기화**: http://localhost:3000/admin-init.html
- **문의하기**: http://localhost:3000/contact.html

### 개발 서버 기능

- **자동 새로고침**: 파일을 저장하면 브라우저가 자동으로 새로고침됩니다
- **포트**: 기본 포트는 3000번입니다
- **핫 리로드**: HTML, CSS, JS 파일 변경 시 즉시 반영됩니다

### 문제 해결

**포트가 이미 사용 중인 경우:**
- `package.json`의 포트 번호를 변경하거나
- 다른 터미널에서 실행 중인 서버를 종료하세요

**페이지를 연결할 수 없는 경우:**
- 반드시 개발 서버를 통해 실행해야 합니다 (파일을 직접 열면 CORS 오류 발생)
- `npm install`로 의존성이 설치되었는지 확인하세요

## 사용 방법

프로젝트는 정적 HTML 파일로 구성되어 있으며, 별도의 빌드 과정 없이 바로 사용할 수 있습니다.

## 참고사항

- 모든 라이브러리는 `HTML/assets` 폴더에 저장되어 있습니다.
- `scripts/copy-dependencies.js`를 실행하면 `node_modules`에서 최신 버전의 파일을 복사할 수 있습니다.

