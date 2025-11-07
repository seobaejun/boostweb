// 공통 모달 스크립트
(function() {
  // jQuery가 로드될 때까지 대기
  function initModals() {
    if (typeof jQuery === 'undefined') {
      setTimeout(initModals, 100);
      return;
    }
    
    var $ = jQuery;
    
    // 서비스 약관 모달 열기
    $(document).on('click', '.terms-modal-btn', function(e) {
      e.preventDefault();
      e.stopPropagation();
      var $modal = $('#terms-modal');
      if ($modal.length) {
        $modal.addClass('active');
        $('body').css('overflow', 'hidden');
      }
    });
    
    // 개인정보 보호정책 모달 열기
    $(document).on('click', '.privacy-modal-btn', function(e) {
      e.preventDefault();
      e.stopPropagation();
      var $modal = $('#privacy-modal');
      if ($modal.length) {
        $modal.addClass('active');
        $('body').css('overflow', 'hidden');
      }
    });
    
    // 환불 정책 모달 열기
    $(document).on('click', '.refund-modal-btn', function(e) {
      e.preventDefault();
      e.stopPropagation();
      var $modal = $('#refund-modal');
      if ($modal.length) {
        $modal.addClass('active');
        $('body').css('overflow', 'hidden');
      }
    });
    
    // 모달 닫기
    $(document).on('click', '.terms-modal-close, .terms-modal-overlay', function(e) {
      e.stopPropagation();
      $('#terms-modal, #privacy-modal, #refund-modal').removeClass('active');
      $('body').css('overflow', '');
    });
    
    // ESC 키로 모달 닫기
    $(document).on('keydown', function(e) {
      if (e.key === 'Escape' || e.keyCode === 27) {
        var $termsModal = $('#terms-modal');
        var $privacyModal = $('#privacy-modal');
        var $refundModal = $('#refund-modal');
        if ($termsModal.hasClass('active')) {
          $termsModal.removeClass('active');
          $('body').css('overflow', '');
        }
        if ($privacyModal.hasClass('active')) {
          $privacyModal.removeClass('active');
          $('body').css('overflow', '');
        }
        if ($refundModal.hasClass('active')) {
          $refundModal.removeClass('active');
          $('body').css('overflow', '');
        }
      }
    });
  }
  
  // DOM이 준비되면 초기화
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initModals);
  } else {
    initModals();
  }
})();

