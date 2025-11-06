/**
 * Auto Scroll Utility
 * 자동 스크롤을 위한 간단하고 강력한 유틸리티
 */
class AutoScroll {
  constructor(container, options = {}) {
    this.container = typeof container === 'string' 
      ? document.querySelector(container) 
      : container;
    
    if (!this.container) {
      console.warn('AutoScroll: Container not found');
      return;
    }
    
    this.options = {
      behavior: options.behavior || 'auto',
      block: options.block || 'end',
      inline: options.inline || 'nearest',
      threshold: options.threshold || 0.1,
      debounce: options.debounce || 50,
      ...options
    };
    
    this.isScrolling = false;
    this.scrollTimeout = null;
    this.observer = null;
    this.intersectionObserver = null;
    
    this.init();
  }
  
  init() {
    // MutationObserver 설정
    this.setupMutationObserver();
    
    // IntersectionObserver 설정
    this.setupIntersectionObserver();
    
    // 초기 스크롤
    this.scrollToBottom();
  }
  
  setupMutationObserver() {
    this.observer = new MutationObserver(() => {
      this.handleChange();
    });
    
    this.observer.observe(this.container, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: false
    });
  }
  
  setupIntersectionObserver() {
    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting && entry.target === this.getLastElement()) {
          this.scrollToBottom();
        }
      });
    }, {
      root: this.container,
      threshold: this.options.threshold,
      rootMargin: '0px'
    });
    
    // 마지막 요소 관찰 시작
    this.observeLastElement();
  }
  
  getLastElement() {
    return this.container.lastElementChild;
  }
  
  observeLastElement() {
    const lastElement = this.getLastElement();
    if (lastElement && this.intersectionObserver) {
      this.intersectionObserver.observe(lastElement);
    }
  }
  
  handleChange() {
    // 마지막 요소 관찰 업데이트
    this.observeLastElement();
    
    // 디바운스 처리
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
    
    this.scrollTimeout = setTimeout(() => {
      this.scrollToBottom();
    }, this.options.debounce);
  }
  
  scrollToBottom() {
    if (!this.container) return;
    
    // 즉시 실행
    this.forceScroll();
    
    // 다음 프레임에서 실행
    requestAnimationFrame(() => {
      this.forceScroll();
    });
    
    // 추가 안전장치
    setTimeout(() => {
      this.forceScroll();
    }, 50);
    
    setTimeout(() => {
      this.forceScroll();
    }, 200);
  }
  
  forceScroll() {
    if (!this.container) return;
    
    // 강제 레이아웃 재계산
    void this.container.offsetHeight;
    void this.container.scrollHeight;
    
    const scrollHeight = this.container.scrollHeight;
    const clientHeight = this.container.clientHeight;
    
    // scrollHeight가 clientHeight보다 큰 경우에만 스크롤
    if (scrollHeight > clientHeight) {
      // 방법 1: scrollTop 직접 설정 (가장 확실한 방법)
      this.container.scrollTop = scrollHeight;
      
      // 방법 2: scrollIntoView 사용 (마지막 자식 요소)
      const lastElement = this.getLastElement();
      if (lastElement) {
        try {
          lastElement.scrollIntoView({
            behavior: 'auto',
            block: 'end',
            inline: 'nearest'
          });
        } catch (e) {
          // 실패 시 scrollTop만 사용
          this.container.scrollTop = scrollHeight;
        }
      }
      
      // 방법 3: scrollTo 사용
      try {
        this.container.scrollTo({
          top: scrollHeight,
          behavior: 'auto'
        });
      } catch (e) {
        // 실패 시 scrollTop만 사용
        this.container.scrollTop = scrollHeight;
      }
      
      // 디버깅
      console.log('스크롤 시도:', {
        scrollHeight,
        clientHeight,
        scrollTop: this.container.scrollTop,
        maxScroll: scrollHeight - clientHeight
      });
    }
  }
  
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
  }
}

// 전역으로 사용할 수 있도록 export
if (typeof window !== 'undefined') {
  window.AutoScroll = AutoScroll;
}

