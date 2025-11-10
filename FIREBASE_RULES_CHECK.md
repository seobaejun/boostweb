# Firebase Firestore 보안 규칙 확인 가이드

## 문제: Firestore에 데이터가 저장되지 않음

## 해결 방법

### 1. Firebase Console 접속
- https://console.firebase.google.com 접속
- 프로젝트 선택: `boostweb-93027`

### 2. Firestore Database로 이동
- 왼쪽 메뉴에서 "Firestore Database" 클릭
- 상단 탭에서 "규칙" (Rules) 클릭

### 3. 보안 규칙 확인 및 수정
현재 규칙이 다음과 같이 설정되어 있어야 합니다:

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### 4. 규칙 배포 (중요!)
- 규칙을 수정한 후 반드시 **"배포"** 버튼을 클릭해야 합니다
- 배포하지 않으면 규칙이 적용되지 않습니다
- 배포 완료까지 몇 초 걸릴 수 있습니다

### 5. 확인 방법
- 브라우저 콘솔(F12)에서 오류 메시지 확인
- `permission-denied` 오류가 나오면 규칙이 제대로 배포되지 않은 것입니다

## 추가 확인사항

1. **Firestore Database 생성 확인**
   - Firestore Database가 생성되어 있는지 확인
   - "데이터" 탭에서 컬렉션이 보이는지 확인

2. **프로젝트 ID 확인**
   - `HTML/signup.html`의 `firebaseConfig`에서 `projectId`가 `boostweb-93027`인지 확인

3. **네트워크 연결 확인**
   - 인터넷 연결이 정상인지 확인
   - 방화벽이나 보안 소프트웨어가 Firebase를 차단하지 않는지 확인

## 디버깅

회원가입 시 브라우저 콘솔(F12)에서 다음 로그를 확인하세요:

1. `Firebase 초기화 완료` - Firebase가 초기화되었는지
2. `Firestore 인스턴스: 생성됨` - Firestore가 초기화되었는지
3. `1. Firestore 인스턴스 확인:` - db 객체가 존재하는지
4. `15. ✅ Firestore set() 완료` - set()이 성공했는지
5. `19. 문서 존재 여부: true` - 문서가 저장되었는지

어느 단계에서 멈추는지 확인하면 문제를 찾을 수 있습니다.

