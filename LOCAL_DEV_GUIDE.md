# 로컬 개발 환경 설정 가이드

## 개발 서버 실행 방법

### 방법 1: npm 스크립트 사용 (권장)

터미널에서 프로젝트 루트 디렉토리로 이동한 후:

```bash
# 의존성 설치 (최초 1회만)
npm install

# 개발 서버 실행
npm run dev
```

또는

```bash
npm start
```

서버가 실행되면 브라우저가 자동으로 열리고 `http://localhost:3000/index.html`에서 사이트를 확인할 수 있습니다.

### 방법 2: 직접 live-server 실행

```bash
# live-server 전역 설치 (최초 1회만)
npm install -g live-server

# HTML 폴더에서 서버 실행
cd HTML
live-server --port=3000
```

### 방법 3: Python 간단한 서버 (live-server가 없는 경우)

```bash
# Python 3가 설치되어 있는 경우
cd HTML
python -m http.server 3000
```

그 후 브라우저에서 `http://localhost:3000/index.html` 접속

## 주요 페이지 URL

서버 실행 후 다음 URL로 접속할 수 있습니다:

- **홈페이지**: http://localhost:3000/index.html
- **회원가입**: http://localhost:3000/signup.html
- **로그인**: http://localhost:3000/login.html
- **Admin 초기화**: http://localhost:3000/admin-init.html
- **문의하기**: http://localhost:3000/contact.html

## 문제 해결

### 포트가 이미 사용 중인 경우

다른 포트로 실행:

```bash
live-server HTML --port=3001
```

또는 `package.json`의 포트 번호를 변경:

```json
"dev": "live-server HTML --port=3001 --open=/index.html"
```

### 모듈을 찾을 수 없는 경우

```bash
# node_modules 삭제 후 재설치
rm -rf node_modules
npm install
```

### Windows에서 실행하는 경우

PowerShell 또는 명령 프롬프트에서:

```powershell
# 프로젝트 디렉토리로 이동
cd C:\boostweb-master

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

## 개발 서버 기능

- **자동 새로고침**: 파일을 저장하면 브라우저가 자동으로 새로고침됩니다
- **포트**: 기본 포트는 3000번입니다
- **핫 리로드**: HTML, CSS, JS 파일 변경 시 즉시 반영됩니다

## 주의사항

1. **Firebase 연결**: 로컬 환경에서도 Firebase는 정상적으로 작동합니다 (인터넷 연결 필요)
2. **CORS 문제**: 일부 브라우저에서 파일을 직접 열면 CORS 오류가 발생할 수 있으므로 반드시 개발 서버를 통해 실행해야 합니다.

