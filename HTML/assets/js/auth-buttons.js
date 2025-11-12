// Firebase Auth 상태 확인 및 로그아웃 공통 스크립트
(function() {
  // 상수 정의 - 관리자 이메일 목록
  const ADMIN_EMAILS = [
    'sprince1004@naver.com',      // 서배준님
    'kylesung0901@gmail.com',      // 성민성님
    'didalsdk1@naver.com'          // 양민아님
  ];

  // Firebase 설정
  const firebaseConfig = {
    apiKey: "AIzaSyCQP1vx3cEtQUYOOqMsKS5HPM3SFMNxasY",
    authDomain: "boostweb-93027.firebaseapp.com",
    projectId: "boostweb-93027",
    storageBucket: "boostweb-93027.firebasestorage.app",
    messagingSenderId: "402354704129",
    appId: "1:402354704129:web:0c5cdd4f51b93ba4ef1500",
    measurementId: "G-2C1TW1KZ7X"
  };

  // Firebase 초기화
  if (typeof firebase !== 'undefined') {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    const auth = firebase.auth();
    const db = firebase.firestore();

    // 로그인 상태에 따라 버튼 업데이트
    async function updateAuthButtons() {
      const authButtons = document.getElementById('authButtons');
      if (!authButtons) return;

      const user = auth.currentUser;
      
      if (user) {
        // Admin 여부 확인
        const isAdmin = ADMIN_EMAILS.includes(user.email);
        
        // 로그인된 경우: 로그아웃 버튼 표시
        let buttonsHTML = '<a class="text-white text-button pr-24 hover-underline" href="#" id="logoutBtn" style="text-decoration: none; cursor: pointer;">로그아웃</a>';
        
        // Admin인 경우 관리자 페이지 버튼 추가
        if (isAdmin) {
          buttonsHTML = '<a class="text-white text-button pr-16 hover-underline" href="admin-init.html" style="text-decoration: none;">관리자페이지</a><span class="text-white pr-16">|</span>' + buttonsHTML;
        }
        
        authButtons.innerHTML = buttonsHTML;
        
        // 로그아웃 버튼 이벤트 리스너
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
          logoutBtn.addEventListener('click', async function(e) {
            e.preventDefault();
            try {
              await auth.signOut();
              window.location.reload();
            } catch (error) {
              console.error('로그아웃 오류:', error);
              alert('로그아웃 중 오류가 발생했습니다.');
            }
          });
        }
      } else {
        // 로그인되지 않은 경우: 로그인/회원가입 버튼 표시
        authButtons.innerHTML = '<a class="text-white text-button pr-16 hover-underline" href="login.html" style="text-decoration: none;">로그인</a><span class="text-white pr-16">|</span><a class="text-white text-button pr-24 hover-underline" href="signup.html" style="text-decoration: none;">회원가입</a>';
      }
    }

    // 인증 상태 변경 감지
    auth.onAuthStateChanged(function(user) {
      updateAuthButtons();
    });

    // 페이지 로드 시 즉시 확인
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', updateAuthButtons);
    } else {
      updateAuthButtons();
    }
  }
})();


