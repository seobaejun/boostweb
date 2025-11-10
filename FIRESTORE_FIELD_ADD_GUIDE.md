# Firestore 필드 추가 가이드

## 방법 1: Firebase Console에서 직접 추가 (수동)

### 단계별 가이드

1. **Firebase Console 접속**
   - https://console.firebase.google.com 접속
   - 프로젝트 `boostweb-93027` 선택

2. **Firestore Database로 이동**
   - 왼쪽 메뉴에서 "Firestore Database" 클릭
   - "데이터" 탭 선택

3. **users 컬렉션 찾기**
   - `users` 컬렉션 클릭
   - 필드를 추가할 사용자 문서 클릭

4. **필드 추가**
   - "필드 추가" 버튼 클릭
   - 필드 이름 입력:
     - `name` (문자열) - 사용자 이름
     - `referralId` (문자열) - 추천인 아이디 (선택사항)
   - 값 입력 후 "저장" 클릭

### 필드 구조

```
users/{userId}
├── name: "사용자 이름" (문자열)
├── email: "user@example.com" (문자열)
├── role: "admin" | "user" (문자열)
├── createdAt: (타임스탬프)
├── updatedAt: (타임스탬프)
├── referralId: "추천인아이디" (문자열, 선택사항)
├── referralInfo: {
│   ├── uid: "추천인UID"
│   ├── email: "추천인이메일"
│   ├── name: "추천인이름"
│   └── role: "추천인역할"
│ } (맵, 선택사항)
└── referredAt: (타임스탬프, 선택사항)
```

## 방법 2: Admin 초기화 페이지에서 자동 추가 (권장)

1. **Admin 초기화 페이지 접속**
   - http://localhost:3000/admin-init.html
   - 또는 배포된 사이트의 `/admin-init.html`

2. **로그인**
   - `sprince1004@naver.com`으로 로그인

3. **필드 추가**
   - "누락된 필드 추가 (name, referralId)" 버튼 클릭
   - 자동으로 name 필드가 추가됩니다

## 방법 3: 로그인 시 자동 추가

기존 사용자가 로그인하면 자동으로:
- `name` 필드가 비어있으면 자동으로 추가
- 이메일 앞부분을 이름으로 사용

## 필드 추가 규칙

### name 필드
- **필수**: 모든 사용자 문서에 있어야 함
- **자동 생성**: 비어있으면 이메일 앞부분 사용
- **예시**: `user@example.com` → `user`

### referralId 필드
- **선택사항**: 추천인이 있는 경우만 추가
- **형식**: 문자열 (이메일 또는 UID)

### referralInfo 필드
- **선택사항**: referralId가 있을 때 자동 생성
- **형식**: 맵 객체
- **내용**: 추천인의 상세 정보

## 주의사항

1. **기존 데이터 보존**: 필드를 추가할 때 기존 데이터는 유지됩니다
2. **타입 일치**: 필드 타입이 일치해야 합니다 (문자열, 숫자, 타임스탬프 등)
3. **권한 확인**: Admin 권한이 있어야 모든 사용자 문서를 수정할 수 있습니다

## 문제 해결

### 필드를 추가할 수 없는 경우
- Admin 권한이 있는지 확인
- Firestore 보안 규칙 확인
- 브라우저 콘솔에서 오류 메시지 확인

### 필드가 표시되지 않는 경우
- 페이지 새로고침
- Firestore Console에서 직접 확인
- Admin 초기화 페이지에서 상태 확인

