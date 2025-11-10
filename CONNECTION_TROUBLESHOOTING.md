# 연결 문제 해결 가이드

## ✅ 서버 상태 확인

서버가 포트 3000에서 실행 중입니다!

## 올바른 접속 방법

### 1. 브라우저에서 접속

**반드시 다음 형식으로 접속하세요:**

```
http://localhost:3000/index.html
```

**❌ 잘못된 접속 방법:**
- `file:///C:/boostweb-master/HTML/index.html` (파일 직접 열기)
- `localhost:3000` (경로 없이)
- `127.0.0.1:3000` (경로 없이)

**✅ 올바른 접속 방법:**
- `http://localhost:3000/index.html`
- `http://localhost:3000/signup.html`
- `http://localhost:3000/login.html`

### 2. 주요 페이지 URL

서버가 실행 중일 때 다음 URL로 접속하세요:

- **홈페이지**: http://localhost:3000/index.html
- **회원가입**: http://localhost:3000/signup.html
- **로그인**: http://localhost:3000/login.html
- **Admin 초기화**: http://localhost:3000/admin-init.html
- **문의하기**: http://localhost:3000/contact.html

## 문제 해결 단계

### 단계 1: 서버 실행 확인

터미널에서 다음 명령어로 서버를 실행하세요:

```bash
npm run dev
```

서버가 실행되면 다음과 같은 메시지가 표시됩니다:
```
Serving "C:\boostweb-master\HTML" at http://127.0.0.1:3000
```

### 단계 2: 브라우저에서 접속

1. 브라우저를 엽니다 (Chrome, Edge, Firefox 등)
2. 주소창에 입력: `http://localhost:3000/index.html`
3. Enter 키를 누릅니다

### 단계 3: 연결이 안 될 때

#### 문제 1: "연결할 수 없음" 오류

**해결 방법:**
1. 서버가 실행 중인지 확인 (터미널 창 확인)
2. 포트 3000이 다른 프로그램에서 사용 중인지 확인
3. 방화벽 설정 확인

#### 문제 2: "404 Not Found" 오류

**해결 방법:**
- URL에 `/index.html` 같은 파일명을 포함했는지 확인
- 파일 경로가 올바른지 확인

#### 문제 3: CORS 오류

**해결 방법:**
- 파일을 직접 열지 마세요
- 반드시 `http://localhost:3000` 형식으로 접속하세요

#### 문제 4: 포트가 이미 사용 중

**해결 방법:**
1. 다른 포트로 실행:
   ```bash
   live-server HTML --port=3001
   ```
2. 또는 `package.json` 수정:
   ```json
   "dev": "live-server HTML --port=3001 --open=/index.html"
   ```

## 빠른 테스트

브라우저에서 다음 URL을 직접 입력해보세요:

```
http://localhost:3000/index.html
```

이 URL이 작동하면 서버는 정상적으로 실행 중입니다.

## 서버 재시작

문제가 계속되면:

1. 터미널에서 `Ctrl + C`로 서버 중지
2. 다시 실행:
   ```bash
   npm run dev
   ```

## 추가 도움말

- 서버 로그를 확인하여 오류 메시지 확인
- 브라우저 개발자 도구(F12) → Console 탭에서 오류 확인
- 방화벽이 localhost 연결을 차단하지 않는지 확인

