# Firebase Firestore 저장 문제 해결 단계별 가이드

## 문제: Firebase Authentication에는 저장되지만 Firestore에는 저장되지 않음

## 해결 단계

### 1단계: Firestore Database 생성 확인

1. https://console.firebase.google.com 접속
2. 프로젝트 `boostweb-93027` 선택
3. 왼쪽 메뉴에서 **"Firestore Database"** 클릭
4. **"데이터"** 탭 확인
   - 만약 "Firestore Database를 생성하세요"라는 메시지가 보이면 → **"데이터베이스 만들기"** 클릭
   - "테스트 모드에서 시작" 선택 → "다음" → 위치 선택 → "사용 설정"

### 2단계: Firestore 보안 규칙 확인 및 배포

1. **"규칙"** 탭 클릭
2. 현재 규칙 확인:
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
3. 규칙이 다르면 위와 같이 수정
4. **"배포"** 버튼 클릭 (중요!)
5. "배포 완료" 메시지 확인

### 3단계: 테스트

1. 회원가입 시도
2. Firestore Database → "데이터" 탭에서 `users` 컬렉션 확인
3. 문서가 생성되었는지 확인

## 확인 방법

### 브라우저 콘솔 확인 (F12)
회원가입 시 다음 로그 확인:
- `15. ✅ Firestore set() 완료` - set() 성공 여부
- `15-2. 즉시 조회 결과:` - 문서 존재 여부

### Firebase Console 확인
- Firestore Database → "데이터" 탭
- `users` 컬렉션이 있는지 확인
- 문서가 생성되었는지 확인

## 여전히 안 되면

1. Firebase Console → Firestore Database → "규칙" 탭
2. "배포" 버튼을 다시 클릭
3. 회원가입 재시도
4. 브라우저 콘솔(F12)에서 오류 메시지 확인

