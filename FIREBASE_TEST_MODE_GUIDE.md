# Firebase Firestore 테스트 모드 설정 가이드

## Firestore를 테스트 모드로 설정하는 방법

### 1단계: Firebase Console 접속
1. 브라우저에서 https://console.firebase.google.com/ 접속
2. 프로젝트 선택: **boostweb-93027**

### 2단계: Firestore Database로 이동
1. 왼쪽 메뉴에서 **"Firestore Database"** 클릭
2. 상단 탭에서 **"Rules"** 탭 클릭

### 3단계: 테스트 모드로 설정
Rules 편집기에서 다음 코드로 **완전히 교체**하세요:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### 4단계: 배포 (중요!)
1. Rules 편집기 하단의 **"배포"** 버튼 클릭
2. 배포 완료까지 몇 초 대기
3. "Rules deployed successfully" 메시지 확인

### 5단계: 확인
1. Rules 탭에서 배포된 규칙 확인
2. 회원가입 다시 시도
3. Firestore Database → Data 탭에서 `users` 컬렉션 확인

## 주의사항

⚠️ **테스트 모드는 개발 중에만 사용하세요!**
- 프로덕션 환경에서는 보안 규칙을 다시 설정해야 합니다
- 현재 설정은 모든 사용자가 모든 데이터를 읽고 쓸 수 있습니다

## 문제 해결

### 배포가 안 될 때
- Firebase Console에서 로그아웃 후 다시 로그인
- 브라우저 캐시 삭제 후 다시 시도
- 다른 브라우저에서 시도

### 여전히 저장이 안 될 때
1. 브라우저 콘솔(F12)에서 오류 메시지 확인
2. Firebase Console → Firestore Database → Data 탭에서 `users` 컬렉션 확인
3. 네트워크 탭에서 Firestore 요청 확인

