// 서비스 약관 모달 스크립트
$(document).ready(function() {
  // 모달 열기
  $('.terms-modal-btn').on('click', function(e) {
    e.preventDefault();
    $('#terms-modal').addClass('active');
    $('body').css('overflow', 'hidden');
  });
  
  // 모달 닫기
  $('.terms-modal-close, .terms-modal-overlay').on('click', function() {
    $('#terms-modal').removeClass('active');
    $('body').css('overflow', '');
  });
  
  // ESC 키로 모달 닫기
  $(document).on('keydown', function(e) {
    if (e.key === 'Escape' && $('#terms-modal').hasClass('active')) {
      $('#terms-modal').removeClass('active');
      $('body').css('overflow', '');
    }
  });
});


