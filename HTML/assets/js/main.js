// Preload app
const preload = document.querySelector('#preload')

window.addEventListener('load', () => {
  setTimeout(() => {
    if (preload) {
      preload.classList.add('disable')
    }
  }, 0)
})


// Animation when scroll 
ScrollReveal({
  distance: '200px',
  duration: 1000,
  delay: 500,
})

// Scroll bottom to top 
ScrollReveal().reveal('.scroll-bottom-to-top1', { delay: 200, origin: 'bottom' })
ScrollReveal().reveal('.scroll-bottom-to-top2', { delay: 300, origin: 'bottom' })
ScrollReveal().reveal('.scroll-bottom-to-top3', { delay: 400, origin: 'bottom' })
ScrollReveal().reveal('.scroll-bottom-to-top4', { delay: 500, origin: 'bottom' })
ScrollReveal().reveal('.scroll-bottom-to-top5', { delay: 600, origin: 'bottom' })
ScrollReveal().reveal('.scroll-bottom-to-top6', { delay: 700, origin: 'bottom' })
ScrollReveal().reveal('.scroll-bottom-to-top7', { delay: 800, origin: 'bottom' })
ScrollReveal().reveal('.scroll-bottom-to-top8', { delay: 900, origin: 'bottom' })

// Scroll left to right
ScrollReveal().reveal('.scroll-left-to-right1', { delay: 200, origin: 'left' })
ScrollReveal().reveal('.scroll-left-to-right2', { delay: 300, origin: 'left' })
ScrollReveal().reveal('.scroll-left-to-right3', { delay: 400, origin: 'left' })
ScrollReveal().reveal('.scroll-left-to-right4', { delay: 500, origin: 'left' })

// Scroll right to left
ScrollReveal().reveal('.scroll-right-to-left1', { delay: 200, origin: 'right' })
ScrollReveal().reveal('.scroll-right-to-left2', { delay: 300, origin: 'right' })
ScrollReveal().reveal('.scroll-right-to-left3', { delay: 400, origin: 'right' })
ScrollReveal().reveal('.scroll-right-to-left4', { delay: 500, origin: 'right' })

// Text slide animation bottom to top 
ScrollReveal().reveal('.text-scroll-bottom-to-top1', { delay: 400, origin: 'bottom' })
ScrollReveal().reveal('.text-scroll-bottom-to-top2', { delay: 600, origin: 'bottom' })
ScrollReveal().reveal('.text-scroll-bottom-to-top3', { delay: 800, origin: 'bottom' })
ScrollReveal().reveal('.text-scroll-bottom-to-top4', { delay: 1000, origin: 'bottom' })
ScrollReveal().reveal('.text-scroll-bottom-to-top5', { delay: 1200, origin: 'bottom' })
ScrollReveal().reveal('.text-scroll-bottom-to-top6', { delay: 1400, origin: 'bottom' })
ScrollReveal().reveal('.text-scroll-bottom-to-top7', { delay: 1600, origin: 'bottom' })
ScrollReveal().reveal('.text-scroll-bottom-to-top8', { delay: 1800, origin: 'bottom' })
ScrollReveal().reveal('.text-scroll-bottom-to-top9', { delay: 2000, origin: 'bottom' })



// Pop up newsletter
const popupNewsletterBlock = document.querySelector('#popup-newsletter-block')
const popupNewsletterMain = document.querySelector('#popup-newsletter-block .popup-newsletter-main')
const closePopupNewsletterBtn = document.querySelector('#popup-newsletter-block .close-block')

window.onload = () => {
  // 뉴스레터 팝업 비활성화
  // if (popupNewsletterBlock) {
  //   setTimeout(() => {
  //     popupNewsletterBlock.classList.add('open')
  //   }, 1000)
  // }
}

if (closePopupNewsletterBtn) {
  closePopupNewsletterBtn.addEventListener('click', () => {
    popupNewsletterBlock.classList.remove('open')
  })
}

// click outside mobile menu, close mobile menu
if (popupNewsletterBlock) {
  popupNewsletterBlock.addEventListener('click', () => {
    popupNewsletterBlock.classList.remove('open')
  })
}

// prevent default behavior when clicking mobile menu
if (popupNewsletterMain) {
  popupNewsletterMain.addEventListener('click', function (event) {
    event.stopPropagation()
  })
}

// Prevent Pop up
// check for saved 'darkMode' in localStorage
let popupNewsletter = localStorage.getItem('popupNewsletter');
localStorage.setItem('popupNewsletter', '')

const disablePopupNewsletter = () => {
  // 1. Add the class to the body
  document.body.classList.add('prevent-popupNewsletter');
  // 2. Update popupNewsletter in localStorage
  localStorage.setItem('popupNewsletter', 'prevent');
}

const enablepopupNewsletter = () => {
  // 1. Remove the class from the body
  document.body.classList.remove('prevent-popupNewsletter');
  // 2. Update popupNewsletter in localStorage 
  localStorage.setItem('popupNewsletter', null);
}

// If the user already visited and prevent popupNewsletter
// start things off with it on
if (popupNewsletter === 'prevent') {
  disablePopupNewsletter();
}

// When someone clicks the button
const preventPopupInput = document.querySelector('.prevent-popup-input')
if (preventPopupInput) {
  preventPopupInput.addEventListener('change', () => {
    // get their popupNewsletter setting
    popupNewsletter = localStorage.getItem('popupNewsletter');

    // if it not current prevent, enable it
    if (preventPopupInput.checked) {
      disablePopupNewsletter();
      // if it has been prevent, turn it off  
    } else {
      enablepopupNewsletter();
    }
  });
}


// header menu sticky when scroll, show scroll to top button
window.addEventListener('scroll', () => {
  let headerMenu = document.querySelector('.header-menu')
  let scrollTopBtn = document.querySelector('.scroll-to-top-btn')
  if (window.scrollY > 700) {
    scrollTopBtn.classList.add('active');
    headerMenu.classList.add('sticky');
  }
  else {
    scrollTopBtn.classList.remove('active');
    headerMenu.classList.remove('sticky');
  }
})


// mobile menu
const mobileMenuBtn = document.querySelector('.menu-humburger i')
const menuMobile = document.querySelector('#menu-mobile-block')
const menuMobileMain = document.querySelector('#menu-mobile-block .menu-mobile-main')
const closeMobileBtn = document.querySelector('#menu-mobile-block .close-block')
const subMenuMobile = document.querySelectorAll('#menu-mobile-block .sub-nav-mobile')

// click menu humburger icon, show mobile menu
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    menuMobile.classList.add('open')
  })
}

const itemLinks = document.querySelectorAll('#menu-mobile-block ul li')

itemLinks.forEach(item => {
  item.addEventListener('click', () => {
    item.querySelector('.sub-nav-mobile').classList.toggle('open')
  })

  let backIcon = document.querySelector('.sub-nav-mobile .back-block')
  backIcon.addEventListener('click', () => {
    subMenuMobile.classList.remove('open')
  })
})


// click icon close, close mobile menu
if (closeMobileBtn) {
  closeMobileBtn.addEventListener('click', () => {
    menuMobile.classList.remove('open')
  })
}

// click outside mobile menu, close mobile menu
if (menuMobile) {
  menuMobile.addEventListener('click', () => {
    menuMobile.classList.remove('open')
  })
}

// prevent default behavior when clicking mobile menu
if (menuMobileMain) {
  menuMobileMain.addEventListener('click', function (event) {
    event.stopPropagation()
  })
}


// Chatbot AI Home1
const formChat = document.querySelector('.section-form-chat .form-chat')
const chatContainer = document.getElementById("chat-container")
const chatInput = document.querySelector('.section-form-chat .form-chat textarea')
const sendChatBtn = document.querySelector('.section-form-chat .form-chat span')
const newChatBtn = document.querySelector('.section-form-chat .new-chat')

// 최대 메시지 수 (10줄 기준)
const MAX_MESSAGES = 10

let userMessage;
// Get api keys on OpenAI
const API_KEY = window.APP_CONFIG?.OPENAI_API_KEY || "";
if (chatInput) {
  var inputInitHeight = chatInput.scrollHeight
}

// AutoScroll 라이브러리 사용
let autoScrollInstance = null;
if (chatContainer && typeof AutoScroll !== 'undefined') {
  autoScrollInstance = new AutoScroll(chatContainer, {
    behavior: 'auto',
    block: 'end',
    debounce: 50
  });
}

// 새 채팅 시작 (모든 메시지 삭제)
const startNewChat = () => {
  console.log('새 채팅 시작 - 메시지 삭제');
  if (chatContainer) {
    // 모든 메시지 삭제
    chatContainer.innerHTML = '';
    console.log('메시지 삭제 완료');
    
    // 스크롤을 맨 위로
    chatContainer.scrollTop = 0;
  }
}

// 새 채팅 버튼 클릭 이벤트 - 더 강력한 방법
if (newChatBtn) {
  console.log('새 채팅 버튼 찾음:', newChatBtn);
  
  // 버튼 전체 영역 클릭 가능하도록
  const handleNewChat = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('새 채팅 버튼 클릭됨');
    startNewChat();
    return false;
  };
  
  newChatBtn.addEventListener('click', handleNewChat, true); // capture phase에서도 작동
  newChatBtn.style.cursor = 'pointer';
  newChatBtn.style.userSelect = 'none';
  
  // 자식 요소들도 클릭 가능하도록
  const newChatChildren = newChatBtn.querySelectorAll('*');
  newChatChildren.forEach(child => {
    child.style.cursor = 'pointer';
    child.style.pointerEvents = 'auto';
    child.addEventListener('click', handleNewChat, true);
  });
  
  // 버튼에 직접 스타일 추가
  newChatBtn.setAttribute('role', 'button');
  newChatBtn.setAttribute('tabindex', '0');
  newChatBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      startNewChat();
    }
  });
}

const createChatLi = (message, className) => {
  // Create a chat <li> element 
  const chatLi = document.createElement('li')
  chatLi.classList.add('chat', className)
  let chatContent = `<p></p>`
  chatLi.innerHTML = chatContent
  chatLi.querySelector('p').textContent = message
  return chatLi;
}

// If you want to answer the right question,
// change API Key on your OpenAI account 
const generateResponse = (incomingChatLi) => {
  const API_URL = window.APP_CONFIG?.OPENAI_API_URL || 'https://api.openai.com/v1/chat/completions'
  const messageResponse = incomingChatLi.querySelector('p');

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: userMessage
        }
      ]
    })
  }

  // Send POST request to API, get response
  fetch(API_URL, requestOptions)
    .then(res => res.json())
    .then(data => {
      messageResponse.textContent = data.choices[0].message.content
      // MutationObserver가 자동으로 스크롤 처리
    })
    .catch(error => {
      messageResponse.textContent = 'API 연결이 필요합니다. .env 파일에 OPENAI_API_KEY를 설정해주세요.'
      // MutationObserver가 자동으로 스크롤 처리
    })
}

const handleChat = () => {
  userMessage = chatInput.value.trim()
  if (!userMessage) return;
  chatInput.value = '';
  chatInput.style.height = '30px'
  if (document.body.clientWidth < 576) {
    chatInput.style.height = '20px'
  }
  formChat.style.borderRadius = '99px'

  // 메시지가 10개를 넘으면 가장 오래된 메시지 삭제
  const chatMessages = chatContainer.querySelectorAll('li')
  if (chatMessages.length >= MAX_MESSAGES) {
    // 가장 오래된 메시지 2개 삭제 (사용자 메시지 + AI 응답)
    const messagesToRemove = Math.min(2, chatMessages.length)
    for (let i = 0; i < messagesToRemove; i++) {
      chatMessages[i].remove()
    }
  }

  // Append the user's message to the chatbox
  const userChatLi = createChatLi(userMessage, 'outgoing')
  chatContainer.appendChild(userChatLi)
  // MutationObserver가 자동으로 스크롤 처리

  setTimeout(() => {
    const incomingChatLi = createChatLi('...', 'incoming')
    chatContainer.appendChild(incomingChatLi)
    // MutationObserver가 자동으로 스크롤 처리
    generateResponse(incomingChatLi)
  }, 600)
}

// Auto height, listen event press Enter on keyboard
if (chatInput) {
  chatInput.addEventListener('input', () => {
    chatInput.style.height = `${inputInitHeight}px`
    chatInput.style.height = `${chatInput.scrollHeight}px`

    if (chatInput.scrollHeight > 100) {
      formChat.style.borderRadius = '20px'
    }
  })

  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleChat()
    }
  })
}

if (sendChatBtn) {
  sendChatBtn.addEventListener('click', handleChat)
}



// Testimonial Home1
$(".testimonial-block.style-one .container .row .list-avatar .avatar").slick({
  dots: false,
  arrows: true,
  prevArrow: '.prev-btn',
  nextArrow: '.next-btn',
  slidesToShow: 5,
  slidesToScroll: 1,
  touchThreshold: 1000,
  swipe: true,
  swipeToSlide: true,
  autoplay: true,
  autoplaySpeed: 3000,
  centerMode: true,
  pauseOnFocus: false,
  pauseOnHover: false,
  pauseOnDotsHover: false,
  infinite: true,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
      }
    },
  ]
});

// Testimonial slick carousel 스크롤바 제거
const removeTestimonialScrollbar = () => {
  const testimonialSlickList = document.querySelectorAll('.testimonial-block.style-one .slick-list')
  const testimonialSlickTrack = document.querySelectorAll('.testimonial-block.style-one .slick-track')
  const allSlickList = document.querySelectorAll('.slick-list')
  const allSlickTrack = document.querySelectorAll('.slick-track')
  
  const removeOverflow = (elements) => {
    if (elements && elements.length > 0) {
      elements.forEach(el => {
        if (el) {
          el.style.overflow = 'hidden'
          el.style.overflowX = 'hidden'
          el.style.overflowY = 'hidden'
          el.style.setProperty('overflow', 'hidden', 'important')
          el.style.setProperty('overflow-x', 'hidden', 'important')
          el.style.setProperty('overflow-y', 'hidden', 'important')
        }
      })
    }
  }
  
  removeOverflow(testimonialSlickList)
  removeOverflow(testimonialSlickTrack)
  removeOverflow(allSlickList)
  removeOverflow(allSlickTrack)
}

// 여러 번 실행하여 확실히 적용
setTimeout(removeTestimonialScrollbar, 100)
setTimeout(removeTestimonialScrollbar, 500)
setTimeout(removeTestimonialScrollbar, 1000)

// slick 초기화 후에도 실행
$(document).on('init reInit', '.slick-slider', function() {
  removeTestimonialScrollbar()
})


// Change avatar testimonial home1
const prevBtn = document.querySelector('.testimonial-block.style-one .list-avatar .prev-btn')
const nextBtn = document.querySelector('.testimonial-block.style-one .list-avatar .next-btn')
const listCmt = document.querySelector('.testimonial-block.style-one .list-comment')
const commentItems = document.querySelectorAll('.testimonial-block.style-one .list-comment .cmt-item')

// Listen event click prev btn 
if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    commentItems.forEach(item => {
      let indexCmt = item.getAttribute('data-name')
      let avatarCurrent = document.querySelector('.testimonial-block.style-one .list-avatar .slick-current')
      let indexAvatar = avatarCurrent.getAttribute('data-name')

      if (indexCmt === indexAvatar) {
        listCmt.querySelector('.active').classList.remove('active')
        item.classList.add('active')
      }
    })
  })
}

// Listen event click next btn 
if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    commentItems.forEach(item => {
      let indexCmt = item.getAttribute('data-name')
      let avatarCurrent = document.querySelector('.testimonial-block.style-one .list-avatar .slick-current')
      let indexAvatar = avatarCurrent.getAttribute('data-name')

      if (indexCmt === indexAvatar) {
        listCmt.querySelector('.active').classList.remove('active')
        item.classList.add('active')
      }
    })
  })
}

// Listen event slide list avatar 
const slickList = document.querySelector('.testimonial-block.style-one .list-avatar .slick-list')

if (slickList) {
  slickList.addEventListener('mousemove', (e) => {
    commentItems.forEach(item => {
      let indexCmt = item.getAttribute('data-name')
      let avatarCurrent = document.querySelector('.testimonial-block.style-one .list-avatar .slick-current')
      let indexAvatar = avatarCurrent.getAttribute('data-name')

      if (indexCmt === indexAvatar) {
        listCmt.querySelector('.active').classList.remove('active')
        item.classList.add('active')
      }
    })
  })
}

// Auto change comment when slide changes
$(".testimonial-block.style-one .container .row .list-avatar .avatar").on('afterChange', function(event, slick, currentSlide){
  const currentAvatar = document.querySelector('.testimonial-block.style-one .list-avatar .slick-current')
  if (currentAvatar) {
    const indexAvatar = currentAvatar.getAttribute('data-name')
    commentItems.forEach(item => {
      const indexCmt = item.getAttribute('data-name')
      if (indexCmt === indexAvatar) {
        listCmt.querySelector('.active').classList.remove('active')
        item.classList.add('active')
      }
    })
  }
})


// change active nav, filter item by category - Projects Home1
const listNav = document.querySelectorAll('.list-nav')
const filterItem = document.querySelectorAll('.item-filter')

if (listNav) {
  listNav.forEach(listNavItem => {
    listNavItem.onclick = function (selectedItem) {
      if (selectedItem.target.classList.contains("nav-item")) {
        // add active class
        if (listNavItem.querySelector('.active')) {
          listNavItem.querySelector('.active').classList.remove('active')
          selectedItem.target.classList.add('active')
        }

        //get data-name value
        let filterName = selectedItem.target.getAttribute('data-name')

        filterItem.forEach((item) => {
          if (filterName === item.getAttribute('data-name')) {
            item.classList.add('show')
            item.classList.remove('hide')
          } else {
            item.classList.remove('show')
            item.classList.add('hide')
          }
        })
      }
    }
  })
}




// Count number Home2
if (document.querySelector('.counter .count-number')) {
  $('.counter .count-number').counterUp({
    delay: 6,
    time: 800,
    scrollSpyOnce: true,
  });
}


// Testimonial Home2
var swiper = new Swiper(".list-comment-two", {
  direction: "vertical",
  slidesPerView: 1,
  // spaceBetween: 30,
  mousewheel: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

const slideItem = document.querySelectorAll('.list-comment-two .swiper-slide')
if (slideItem) {
  slideItem.forEach(item => {
    item.removeAttribute('style')
  })
}


// change switch btn pricing Home2
const switchBtn = document.querySelector('.switch')
const listPricingMonth = document.querySelector('.list-pricing')
const listPricingYear = document.querySelector('.list-pricing-year')

if (switchBtn) {
  switchBtn.addEventListener('click', () => {
    switchBtn.classList.toggle('enable')

    let text = switchBtn.parentElement.querySelectorAll('.body3')

    text.forEach(item => {
      if (item.classList.contains('text-secondary')) {
        item.classList.remove('text-secondary')
        item.classList.add('text-on-surface')
      }
      else {
        item.classList.add('text-secondary')
      }
    })

    if (switchBtn.classList.contains('enable')) {
      listPricingMonth.classList.remove('show')
      listPricingMonth.classList.add('hide')
      listPricingYear.classList.remove('hide')
      listPricingYear.classList.add('show')
    } else {
      if (listPricingYear.classList.contains('show')) {
        listPricingYear.classList.remove('show')
      }
      listPricingYear.classList.add('hide')

      if (listPricingMonth.classList.contains('hide')) {
        listPricingMonth.classList.remove('hide')
      }
      listPricingMonth.classList.add('show')
    }
  })
}

// Video modal Home2
const videoModal = document.querySelector('.js-video-modal')
const videoModalContainer = document.querySelector('.js-video-modal-container')
const closeVideo = document.querySelector('.js-modal-close')
const playBtn = document.querySelectorAll('.play-btn')

//Show modal video
function showVideo() {
  if (videoModal) {
    videoModal.classList.add('open')
  }
}

//Close modal video
function removeVideoModal() {
  if (videoModal) {
    videoModal.classList.remove('open')
  }
}

//Listen click
if (playBtn) {
  playBtn.forEach(btn => {
    btn.addEventListener('click', () => {
      videoModal.classList.add('open')
    })
  })
}

//Listen click and close modal video
if (closeVideo) {
  closeVideo.addEventListener('click', removeVideoModal)
}

//Listen click outside modal-container and close modal video
if (videoModal) {
  videoModal.addEventListener('click', removeVideoModal)
}

if (videoModalContainer) {
  videoModalContainer.addEventListener('click', function (event) {
    event.stopPropagation()
  })
}



// Change cursor on hover text slider Home3
const textHeadingHome3 = document.querySelector('.slider-block.style-three .text-heading')
const textHeadingClip = document.querySelector('.slider-block.style-three .text-heading .heading1:nth-child(2)')

if (textHeadingHome3) {
  textHeadingHome3.addEventListener('mousemove', (e) => {
    mouseCursor.style.setProperty('--x', e.pageX + 'px')
    mouseCursor.style.setProperty('--y', e.pageY + 'px')

    const spaceLeft = ((document.body.clientWidth - 1290) / 2)
    textHeadingClip.style.setProperty('--x', e.pageX + 'px')
    textHeadingClip.style.setProperty('--y', e.pageY + 'px')
    textHeadingClip.style.clipPath = 'circle(100px at calc(var(--x) - ' + spaceLeft + 'px) calc(var(--y) - 240px))'

    if (document.body.clientWidth < 1290) {
      textHeadingClip.style.clipPath = 'circle(100px at calc(var(--x) - 15px) calc(var(--y) - 240px))'
    }

    textHeadingClip.addEventListener('mouseout', (e) => {
      textHeadingClip.style.clipPath = 'circle(0)'
    })
  })
}


// List instagram Home2
$(".instagram-block .list-image").slick({
  dots: false,
  arrows: false,
  slidesToShow: 6,
  slidesToScroll: 6,
  touchThreshold: 1000,
  waitForAnimate: false,
  swipe: true,
  swipeToSlide: true,
  autoplay: true,
  autoplaySpeed: 2000,
  pauseOnFocus: true,
  pauseOnHover: true,
  pauseOnDotsHover: false,
  infinite: true,
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 5,
      }
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 340,
      settings: {
        slidesToShow: 1,
      }
    },
  ]
});


// Testimonial Home4
$(".testimonial-block.style-four .container .row .list-testimonial").slick({
  dots: false,
  arrows: true,
  prevArrow: '.prev-btn',
  nextArrow: '.next-btn',
  slidesToShow: 1,
  slidesToScroll: 2,
  touchThreshold: 1000,
  waitForAnimate: false,
  swipe: true,
  swipeToSlide: true,
  autoplay: false,
  pauseOnFocus: false,
  pauseOnHover: false,
  pauseOnDotsHover: false,
  infinite: true,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    },
  ]
});


// change type pricing
const chooseType = document.querySelector('.choose-type')
const listPricing = document.querySelectorAll('.list-pricing')

if (chooseType) {
  chooseType.onclick = function (selectedItem) {
    if (selectedItem.target.classList.contains("button")) {
      // add active class
      chooseType.querySelector('.active').classList.remove('active')
      selectedItem.target.classList.add('active')

      //get data-name value
      let filterName = selectedItem.target.getAttribute('data-name')

      listPricing.forEach((item) => {
        if (filterName === item.getAttribute('data-name')) {
          item.classList.add('show')
          item.classList.remove('hide')
        } else {
          item.classList.remove('show')
          item.classList.add('hide')
        }
      })
    }
  }
}


// open answer faqs
const questionItem = document.querySelectorAll('.question-item')

if (questionItem) {
  questionItem.forEach((item, index) => {
    let titleItem = item.querySelector('.question-item-main')
    let icon = item.querySelector('i')

    titleItem.addEventListener('click', () => {
      item.classList.toggle('open')

      if (item.classList.contains('open')) {
        setTimeout(() => {
          icon.classList.replace('ph-plus', 'ph-minus')
        }, 200)
      } else {
        setTimeout(() => {
          icon.classList.replace('ph-minus', 'ph-plus')
        }, 200)
      }

      removeOpen(index)
    })

    if (item.classList.contains('open')) {
      icon.classList.replace('ph-plus', 'ph-minus')
    } else {
      icon.classList.replace('ph-minus', 'ph-plus')
    }
  })
}

function removeOpen(index1) {
  questionItem.forEach((item2, index2) => {
    if (index1 != index2) {
      item2.classList.remove('open')
      item2.querySelector('i').classList.replace('ph-minus', 'ph-plus')
    }
  })
}



