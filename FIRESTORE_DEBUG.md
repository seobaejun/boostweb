# Firestore 저장 문제 해결 가이드

## 문제: 회원가입 시 Firestore에 유저 정보가 저장되지 않음

### 해결 방법

#### 1. Firebase Console에서 보안 규칙 확인 및 배포

1. Firebase Console 접속: https://console.firebase.google.com/
2. 프로젝트 선택: `boostweb-93027`
3. 왼쪽 메뉴에서 **Firestore Database** 클릭
4. 상단 탭에서 **Rules** 클릭
5. 다음 규칙이 있는지 확인:

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

6. **"배포"** 버튼 클릭 (중요!)

#### 2. 브라우저 콘솔에서 오류 확인

1. 회원가입 페이지에서 F12 키를 눌러 개발자 도구 열기
2. **Console** 탭 클릭
3. 회원가입 시도
4. 콘솔에 나타나는 오류 메시지 확인:
   - `permission-denied`: 보안 규칙 문제
   - `unavailable`: 네트워크 문제
   - 기타 오류: 오류 메시지 확인

#### 3. 관리자 페이지에서 테스트 유저 생성

1. 관리자 계정(`sprince1004@naver.com`)으로 로그인
2. 관리자 페이지 접속
3. **"테스트 유저 생성"** 버튼 클릭
4. users 컬렉션이 생성되고 테스트 문서가 저장됨

#### 4. Firestore 데이터 확인

1. Firebase Console → Firestore Database → Data 탭
2. `users` 컬렉션이 있는지 확인
3. 문서가 있는지 확인

### 일반적인 문제

1. **보안 규칙이 배포되지 않음**
   - Rules 탭에서 "배포" 버튼을 클릭해야 함
   - 배포하지 않으면 변경사항이 적용되지 않음

2. **네트워크 문제**
   - 인터넷 연결 확인
   - 방화벽이나 프록시 설정 확인

3. **Firebase 프로젝트 설정 문제**
   - Firebase 프로젝트 ID 확인
   - API 키 확인

### 디버깅 팁

- 브라우저 콘솔(F12)에서 모든 로그 확인
- Firebase Console에서 실시간으로 데이터 확인
- 네트워크 탭에서 Firestore 요청 확인

