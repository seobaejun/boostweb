# Firestore Users 컬렉션 설정 가이드

## 문제 해결: Users 컬렉션이 생성되지 않는 경우

Firestore는 **첫 번째 문서가 생성될 때 컬렉션이 자동으로 생성**됩니다. 따라서 `users` 컬렉션이 보이지 않는다면 아직 회원가입이 이루어지지 않았거나 문서가 생성되지 않은 것입니다.

## 해결 방법

### 방법 1: 회원가입을 통한 자동 생성 (권장)

1. **회원가입 페이지로 이동**: `signup.html`
2. **Admin 계정으로 회원가입**:
   - 이메일: `sprince1004@naver.com`
   - 비밀번호: 원하는 비밀번호 입력
   - 이름: 원하는 이름 입력
3. 회원가입 완료 시 `users` 컬렉션이 자동으로 생성되고 Admin 사용자 문서가 저장됩니다.

### 방법 2: Admin 초기화 페이지 사용

1. **Admin 초기화 페이지로 이동**: `admin-init.html`
2. **로그인**: `sprince1004@naver.com`으로 로그인
3. **상태 확인**: "컬렉션 상태 확인" 버튼 클릭
4. **Admin 사용자 생성**: "Admin 사용자 생성" 버튼 클릭

### 방법 3: Firebase Console에서 직접 생성

1. Firebase Console 접속: https://console.firebase.google.com
2. 프로젝트 선택: `boostweb-93027`
3. Firestore Database → 데이터 탭
4. "컬렉션 시작" 클릭
5. 컬렉션 ID: `users` 입력
6. 문서 ID: 자동 생성 또는 수동 입력
7. 필드 추가:
   - `name` (문자열): "Admin"
   - `email` (문자열): "sprince1004@naver.com"
   - `role` (문자열): "admin"
   - `createdAt` (타임스탬프): 현재 시간
   - `updatedAt` (타임스탬프): 현재 시간

## Users 컬렉션 구조

### 문서 구조

```javascript
{
  name: "사용자 이름",
  email: "사용자 이메일",
  role: "admin" | "user",  // sprince1004@naver.com은 "admin"
  createdAt: Timestamp,
  updatedAt: Timestamp,
  referralId: "추천인 아이디",  // 선택사항
  referralInfo: {  // 선택사항
    uid: "추천인 UID",
    email: "추천인 이메일",
    name: "추천인 이름",
    role: "추천인 역할"
  },
  referredAt: Timestamp  // 선택사항
}
```

### 역할 구분

- **Admin**: `sprince1004@naver.com` 이메일로 가입한 사용자
- **User**: 그 외 모든 이메일로 가입한 사용자

## 보안 규칙 확인

`firestore.rules` 파일이 Firebase Console에 적용되었는지 확인하세요:

1. Firestore Database → 규칙 탭
2. `firestore.rules` 파일의 내용이 적용되어 있는지 확인
3. 적용되지 않았다면 복사하여 붙여넣고 "게시" 클릭

## 문제 해결 체크리스트

- [ ] Firebase 프로젝트가 올바르게 설정되었는가?
- [ ] `firestore.rules` 파일이 Firebase Console에 적용되었는가?
- [ ] 회원가입 페이지에서 회원가입을 시도했는가?
- [ ] Admin 이메일(`sprince1004@naver.com`)로 회원가입했는가?
- [ ] 브라우저 콘솔에 오류가 없는가?

## 주의사항

1. **보안 규칙**: `firestore.rules`가 적용되지 않으면 문서 생성이 실패할 수 있습니다.
2. **이메일 일치**: 회원가입 시 저장되는 이메일이 인증된 사용자의 이메일과 일치해야 합니다.
3. **역할 자동 설정**: `sprince1004@naver.com`으로 가입하면 자동으로 `admin` 역할이 부여됩니다.

## 추가 도움말

문제가 지속되면:
1. 브라우저 개발자 도구(F12) → Console 탭에서 오류 확인
2. Firebase Console → Firestore Database → 규칙 탭에서 규칙 확인
3. `admin-init.html` 페이지에서 상태 확인

