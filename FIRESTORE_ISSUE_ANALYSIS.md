# Firestore 저장 실패 원인 분석

## 현재 상황
- ✅ Firebase Authentication: 저장 성공
- ❌ Firestore Database: 저장 실패 (오류 없음)
- `set()` 호출은 성공하지만 문서가 생성되지 않음

## 가능한 원인들

### 1. Firestore Database가 생성되지 않음 (가장 가능성 높음)
**확인 방법:**
- Firebase Console → Firestore Database → "데이터" 탭
- "Firestore Database를 생성하세요" 메시지가 보이면 생성 필요

**해결:**
- "데이터베이스 만들기" 클릭
- "테스트 모드에서 시작" 선택
- 위치 선택 후 "사용 설정"

### 2. 보안 규칙이 실제로 배포되지 않음
**확인 방법:**
- Firebase Console → Firestore Database → "규칙" 탭
- 규칙을 수정한 후 "게시" 버튼을 클릭했는지 확인
- "게시 완료" 메시지가 표시되었는지 확인

**해결:**
- 규칙을 다시 확인하고 "게시" 버튼 클릭
- 게시 후 몇 초 대기

### 3. 오프라인 모드로 인한 지연
**원인:**
- Firestore가 오프라인 모드로 동작
- `set()`은 성공하지만 실제 전송은 나중에 시도
- 네트워크 문제로 전송 실패

**확인 방법:**
- 브라우저 콘솔에서 `15-1. 저장 확인 시작...` 이후 로그 확인
- `15-1-1. 조회 결과:`가 계속 `❌ 없음`인지 확인

### 4. 네트워크/연결 문제
**확인 방법:**
- 브라우저 개발자 도구 → Network 탭
- Firestore API 호출이 실패하는지 확인
- `permission-denied` 오류가 있는지 확인

### 5. Firestore 초기화 문제
**확인 방법:**
- 브라우저 콘솔에서 `Firebase 초기화 완료` 로그 확인
- `Firestore 인스턴스: 생성됨` 로그 확인

## 비교: contact.html vs signup.html

### contact.html (정상 작동)
```javascript
const docRef = await db.collection('contacts').add({
  name: name,
  phone: phone,
  email: email,
  message: message,
  createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  status: 'new'
});
```
- `.add()` 사용 - 자동 문서 ID 생성
- `await`로 결과 대기

### signup.html (저장 실패)
```javascript
const docRef = usersCollection.doc(user.uid);
await docRef.set(userData);
```
- `.doc(user.uid).set()` 사용 - 특정 문서 ID 지정
- `set()`은 성공하지만 문서가 생성되지 않음

## 차이점 분석
1. **문서 ID 생성 방식**
   - `contact.html`: `.add()` - Firestore가 자동 생성
   - `signup.html`: `.doc(user.uid).set()` - 사용자 지정

2. **가능한 문제**
   - 특정 문서 ID로 저장할 때 권한 문제가 발생할 수 있음
   - 보안 규칙이 특정 경로에 대해 다르게 적용될 수 있음

## 해결 방법

### 방법 1: Firestore Database 생성 확인
1. Firebase Console → Firestore Database
2. "데이터베이스 만들기" 클릭 (없다면)
3. "테스트 모드에서 시작" 선택

### 방법 2: 보안 규칙 재확인
1. Firebase Console → Firestore Database → "규칙" 탭
2. 다음 규칙 확인:
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
3. "게시" 버튼 클릭
4. "게시 완료" 확인

### 방법 3: contact.html 방식으로 변경 (테스트)
- `.add()` 방식으로 변경하여 테스트
- 성공하면 문서 ID 지정 방식의 문제일 수 있음

## 디버깅 체크리스트
- [ ] Firestore Database가 생성되어 있는가?
- [ ] 보안 규칙이 `allow read, write: if true;`로 설정되어 있는가?
- [ ] "게시" 버튼을 클릭했는가?
- [ ] 브라우저 콘솔에서 `15. ✅ Firestore set() 완료` 로그가 나오는가?
- [ ] `15-1-1. 조회 결과:`가 `❌ 없음`인가?
- [ ] Network 탭에서 Firestore API 호출이 실패하는가?

