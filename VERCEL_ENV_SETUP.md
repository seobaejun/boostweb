# Vercel 환경 변수 설정 가이드

## Vercel 대시보드에서 API 키 추가하기

### 방법 1: 웹 대시보드에서 설정 (권장)

1. **Vercel 대시보드 접속**
   - https://vercel.com 에 로그인
   - 프로젝트 선택

2. **환경 변수 설정 페이지로 이동**
   - 프로젝트 선택 → **Settings** 탭 클릭
   - 왼쪽 메뉴에서 **Environment Variables** 클릭

3. **환경 변수 추가**
   - **Add New** 버튼 클릭
   - 다음 환경 변수들을 추가:

   ```
   Key: OPENAI_API_KEY
   Value: sk-... (여기에 실제 OpenAI API 키 입력)
   ```

   ```
   Key: OPENAI_API_URL
   Value: https://api.openai.com/v1/chat/completions
   ```

4. **환경 설정**
   - 각 환경 변수에 대해 다음 환경을 선택:
     - ✅ **Production** (프로덕션 배포용)
     - ✅ **Preview** (프리뷰 배포용)
     - ✅ **Development** (개발 환경용)

5. **저장**
   - **Save** 버튼 클릭

6. **재배포**
   - 환경 변수를 추가한 후 자동으로 재배포가 시작됩니다
   - 또는 **Deployments** 탭에서 수동으로 재배포 가능

### 방법 2: Vercel CLI 사용

터미널에서 다음 명령어를 실행:

```bash
# Vercel CLI 설치 (최초 1회만)
npm install -g vercel

# 프로젝트 디렉토리에서 로그인
vercel login

# 환경 변수 추가
vercel env add OPENAI_API_KEY
# 프롬프트에 따라 환경 선택 (Production, Preview, Development)

vercel env add OPENAI_API_URL
# Value: https://api.openai.com/v1/chat/completions
```

## 필요한 환경 변수 목록

프로젝트에서 사용하는 환경 변수:

| 변수명 | 설명 | 필수 여부 | 기본값 |
|--------|------|----------|--------|
| `OPENAI_API_KEY` | OpenAI API 키 | ✅ 필수 | 없음 |
| `OPENAI_API_URL` | OpenAI API 엔드포인트 | 선택 | `https://api.openai.com/v1/chat/completions` |

## 빌드 과정에서의 처리

빌드 시 `scripts/prepare-vercel-build.js`가 실행되며:
1. Vercel 환경 변수에서 `OPENAI_API_KEY`와 `OPENAI_API_URL`을 읽습니다
2. `HTML/assets/js/config.js` 파일을 자동 생성합니다
3. 생성된 `config.js`는 프론트엔드에서 API 키를 사용할 수 있도록 합니다

## 확인 방법

배포 후 다음을 확인하세요:

1. **빌드 로그 확인**
   - Vercel 대시보드 → **Deployments** → 최신 배포 클릭
   - 빌드 로그에서 다음 메시지 확인:
     ```
     ✅ config.js 파일 생성 완료
     API 키 설정: ✅ 설정됨
     ```

2. **브라우저 콘솔 확인**
   - 배포된 사이트 접속
   - 브라우저 개발자 도구 (F12) → Console 탭
   - `window.APP_CONFIG` 객체 확인

## 문제 해결

### 환경 변수가 적용되지 않는 경우

1. **재배포 확인**
   - 환경 변수 추가 후 자동 재배포가 시작되었는지 확인
   - 수동으로 재배포: **Deployments** → **Redeploy**

2. **환경 변수 이름 확인**
   - 대소문자 정확히 일치하는지 확인
   - `OPENAI_API_KEY` (정확한 이름)

3. **빌드 로그 확인**
   - 빌드 로그에서 "API 키 설정: ⚠️ 설정되지 않음" 메시지가 나오면
   - 환경 변수가 제대로 설정되지 않은 것입니다

### API 키가 노출되는 경우

- `config.js`는 빌드 시 생성되며 Git에 커밋되지 않습니다
- 하지만 브라우저에서 접근 가능하므로, 클라이언트 사이드에서 사용하는 API 키는 공개되어도 안전해야 합니다
- OpenAI API 키의 경우, 사용량 제한을 설정하는 것을 권장합니다

## 보안 권장사항

1. **API 키 사용량 제한 설정**
   - OpenAI 대시보드에서 API 키별 사용량 제한 설정
   - 예상치 못한 사용량 발생 시 자동 차단

2. **환경별 다른 키 사용**
   - Production, Preview, Development 환경에 각각 다른 API 키 사용 권장
   - 개발/테스트 환경에서 실수로 많은 요청을 보내는 것을 방지

3. **정기적인 키 로테이션**
   - 보안을 위해 주기적으로 API 키 변경

