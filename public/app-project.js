const content = require('./content/content.json');

var app = new Vue({
  el: '#app',
  data: {

    isActiveImg: false,

    pages: content.pages,
    sidebars: content.sidebars,
    popups: content.popups,
    gallery: content.gallery,
    currentVideo: '',
    currentSidebar: '',
    sidebarInProcess: 0,
    toggleProcess: 0,

    modals: {
      popupLifeSupport: {
        active: false
      },
      lifeSidebar1: {
        active: false,
        sidebar: 1
      },
      lifeSidebar2: {
        active: false,
        sidebar: 1
      },
      lifeSidebar3: {
        active: false,
        sidebar: 1
      },
      lifeSidebar4: {
        active: false,
        sidebar: 1
      },
      lifeSidebar5: {
        active: false,
        sidebar: 1
      },
      experimentsSidebar1: {
        active: false,
        sidebar: 1
      },
      experimentsSidebar2: {
        active: false,
        sidebar: 1
      },
      experimentsSidebar3: {
        active: false,
        sidebar: 1
      },
      experimentsSidebar4: {
        active: false,
        sidebar: 1
      },
      experimentsSidebar5: {
        active: false,
        sidebar: 1
      },
      experimentsSidebar6: {
        active: false,
        sidebar: 1
      },
      experimentsSidebar7: {
        active: false,
        sidebar: 1
      },
      structureSidebar1: {
        active: false,
        sidebar: 1
      },
      structureSidebar2: {
        active: false,
        sidebar: 1
      },
      structureSidebar3: {
        active: false,
        sidebar: 1
      },
      structureSidebar4: {
        active: false,
        sidebar: 1
      },
      structureSidebar5: {
        active: false,
        sidebar: 1
      },
      structureSidebar6: {
        active: false,
        sidebar: 1
      },
      structureSidebar7: {
        active: false,
        sidebar: 1
      },
      structureSidebar8: {
        active: false,
        sidebar: 1
      },
      structureSidebar9: {
        active: false,
        sidebar: 1
      },
      structureSidebar10: {
        active: false,
        sidebar: 1
      },
      structureSidebar11: {
        active: false,
        sidebar: 1
      },
      popup2: {
        active: false
      },
      popup3: {
        active: false
      },
      popupVideo1: {
        id: 'video1',
        active: false,
        play: false
      },
      popupVideo2: {
        id: 'video2',
        active: false,
        play: false
      },
    }
  },

  computed: {
    waitUser: function() {
      idleTimer = null;
      idleState = false;
      idleWait = 300000;
      var me = this;

      $('body').bind('mousemove click keydown scroll', function() {
        clearTimeout(idleTimer);
        if (idleState == true) {
          $('.intro').addClass('intro_move');
        }
        idleState = false;
        idleTimer = setTimeout(function() {
          $('.intro').removeClass('intro_move');
          mySwiper.slideTo(0);
          myGallery.slideTo(0, 100);
          myGallery2.slideTo(0, 100);

          for(var name in me.modals){
            if(me.modals[name].active) {
              me.modals[name].active = false;
            }
          }

          $(".popup__block").remove();
          idleState = true;
        }, idleWait);
      });
    },
    swipeInit: function() {
      var me = this;
      // Swiper init (http://idangero.us/swiper/)
      $(function() {
        mySwiper = new Swiper('.swiper-container-main', {
          speed: 500,
          direction: 'horizontal',
          simulateTouch: true,
          parallax: true,
          longSwipes: true,
          longSwipesRatio: 0.1,
          // откл. на продакшн клавиатуру : начало
          keyboard: true,
          // откл. на продакшн клавиатуру : конец
          on: {
            transitionStart: function(){
              me.toggleProcess = 1;
            },
            transitionEnd: function(){
              for(let i in me.modals) {
                me.closeModal(i);
              }
              me.toggleProcess = 0;
            }
          },
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
            renderBullet: function(index, className) {
              let num = index >= 9 ? index + 1 : '0' + (index + 1);
              return '<span class="' + className + '">' + num + '</span>';
            }
          }
        });
      });
    },
    swipeIntroInit: function () {
      // http://stephen.band/jquery.event.move/
      $(function () {
        $('.intro')
          .on('move click touch', function (e) {
            $(this).addClass('intro_move')
          });
      });
    },
    galleryInit: function () {
      // Swiper init (http://idangero.us/swiper/)
      $(function () {
        myGallery = new Swiper('.gallery .gallery__swiper-container', {
          speed: 700,
          direction: 'vertical',
          simulateTouch: true,
          parallax: true,
          longSwipes: true,
          longSwipesRatio: 0.1,
          // откл. на продакшн клавиатуру : начало
          keyboard: true,
          // откл. на продакшн клавиатуру : конец
          on: {},
          pagination: {
            el: '.gallery .gallery__swiper-pagination',
            type: 'custom',
            renderCustom: function (myGallery, current, total) {
              if (current < 10) {
                $('.gallery .gallery__swiper-pagination-prev').text('0' + current);
              }
              else {
                $('.gallery .gallery__swiper-pagination-prev').text(current);
              }
              $('.gallery .gallery__swiper-pagination-total').text('0' + total);
              $('.gallery .navigation .navigation__link').removeClass('navigation__link-active');
              $('.gallery .navigation .n' + current).addClass('navigation__link-active');
            }
          }
        });
      });
    },
    /**
     * Страница с горизонтальной прокруткой
     */
    horizonPageSwiperInit: function(){
      $(function () {
        horizonSwiper = new Swiper('.horizon__swiper-container', {
          simulateTouch: true,
          parallax: true,
          //slidesPerView: 4,
          slidesPerView: 'auto',
          spaceBetween: 50,
          //freeMode: true,
          nested: true,
          on: {}
        });
      });
    }
  },

  methods: {
    goToSlide: function (n, v) {
      mySwiper.slideTo(n, v);
    },
    galleryTo: function (n, v) {
      myGallery.slideTo(n, v);
    },
    showModal: function (name) {
      let self = this
      // обработка очередного открытия сайдбаров, чтоб не тыкали
      if(this.modals[name].sidebar) {
        if(this.sidebarInProcess) return;

        this.sidebarInProcess = true;
        document.querySelectorAll('.sidebar-wrapper.'+name)[0].style = 'left: 0px';

        setTimeout(function(){
          for(let i in self.modals) {
            if(i == self.currentSidebar || !self.modals[i].sidebar || i.split('Sidebar')[0] != self.currentSidebar.split('Sidebar')[0]) continue;

            if(self.modals[i].active) {
              self.modals[i].active = false;
            }
          }
          self.currentSidebar = '';
          self.sidebarInProcess = false;
        }, 800);

        this.currentSidebar = name;
      }
      this.modals[name].active = true;
    },
    closeModal: function (name) {
      let self = this
      if(this.modals[name].active) {
        this.modals[name].active = false;
      }
      if(name == 'popupLifeSupport') {
        for(let i = 1; i <= 5; i++)
          self.closeModal('lifeSidebar'+i);
      }
    },
    playVideoFile: function (name) {

      let me = this;

      id = me.modals[name].id;
      me.currentVideo = video = document.getElementById(id);

      me.modals[name].play = true;

      video.play();
      video.onended = function() {
        me.modals[name].play = false;
        $('.popup-video__progress-inner').animate({ 'width': 0 }, 1000);
      };
      $(video).on(
        'timeupdate',
        function(event){
          var width = 1134 / this.duration;
          width = width * this.currentTime;
          $('.popup-video__progress-inner').animate({ 'width': width + 'px' }, 5);
        });
    },
    pauseVideoFile: function(name) {

      this.modals[name].play = false;
      video.pause();

      $('.popup-video__progress-inner').stop();
    },
    reloadVideoFile: function (name) {

      this.modals[name].play = false;
      video.load();
      $('.popup-video__progress-inner').animate({'width': 0}, 1000);
    },
    handlerCloseVideoPopup: function (name) {
      this.closeModal(name);
      if(this.currentVideo) {
        this.pauseVideoFile(name);
        this.reloadVideoFile(name);
      }

    },
    photoOpen: function(event) {

      this.isActiveImg = true;

      var imgwidth = event.target.clientWidth;
      var imgHeight = event.target.clientHeight;

      var desc = $(event.target).closest('.swiper-slide').find('.text__desc');

      var width = 'auto',
        height = '100%';

      var img = $(event.target);
      var src = img.attr('src');

      $(event.target).closest('#app').find('.popup-photo').append(
        '<img src="' + src + '" class="popup_img" width="' + width + '" height="' + height + '" />' + '</div>');
    },
    photoClose: function(event) {
      this.isActiveImg = false;

      $(event.target).closest('#app').find('.popup_img').remove();
      $(event.target).closest('#app').find('.popup-photo-description').empty();
    }
  }
});

////////////////////         Functions          ///////////////////

function paganIsClose(obj) {
  let modals = app.modals,
    o = obj;
  $(o.element).on('click', function () {
    for (let elem in modals) {
      if (modals[elem]['active']) {
        activElem = elem
      }
    }
  })
}

function swipeCloseSidebar(object) {
  let o = object,
    startX = 0,
    modals = app.modals,
    dist,
    activElem,
    curPos;

  $(o.element).on('touchstart', function(e) {
    let touchobj = e.changedTouches[0]; // первая точка прикосновения
    dist = 0;
    $(this).css('transition','1s ease 0s, left ease-out 0.1s');

    activElem = touchobj.target.closest('.sidebar-wrapper').dataset.sidebar;

    startX = parseInt(touchobj.clientX)
  });

  $(o.element).on('touchmove', function(e) {
    let touchobj = e.changedTouches[0]; // первая точка прикосновения для данного события
    dist = parseInt(touchobj.clientX) - startX;
    if (dist > 0) {
      $(this).css('left',dist+'px');
    }
  });

  $(o.element).on('touchend', function(e) {
    if (dist > o.distance) {
      app.closeModal(activElem);
    } else {
      $(this).css('transition','1s ease 0s, left ease 0.4s');
      $(this).css('left','0px');
    }
  });
}

function swipeClosePopup(object) {
  let o = object,
    startY = 0,
    modals = app.modals,
    dist, activElem, curPos;

  $(o.element).on('touchstart', function (e) {
    let touchobj = e.changedTouches[0]; // первая точка прикосновения

    activElem = touchobj.target.closest('.popup').dataset.popup;
    dist = 0;

    startY = parseInt(touchobj.clientY)
  });

  $(o.element).on('touchmove', function(e) {
    let touchobj = e.changedTouches[0]; // первая точка прикосновения для данного события
    dist = parseInt(touchobj.clientY) - startY;
  });

  $(o.element).on('touchend', function(e) {
    if (dist > o.distance) {
      app.closeModal(activElem);
    }
  });
}

// Perfect scrollbar (https://github.com/utatti/perfect-scrollbar)


window.addEventListener('load', function() {
  $('.sidebar__block-with-scroll').each(function() {
    var ps = new PerfectScrollbar(this);
  });

  paganIsClose({
    element: '.swiper-pagination-bullet',
    targetElem: 'isActive'
  });




  mySwiper.on('slideChange', function () {
    if (mySwiper.activeIndex === 4) {
      myGallery.slideTo(0, 100);
    }
    if (mySwiper.activeIndex === 5) {
      myGallery2.slideTo(0, 100);
    }
  });


  swipeCloseSidebar({
    element: '.sidebar-wrapper',
    distance: 300,
    /// если у нас isActiveSidebarBuran1, то пишем isActiveSidebar
  });

  swipeClosePopup({
    element: '.popup',
    distance: 300,
    /// если у нас isActivePopupBuran1, то пишем isActivePopup
  })
});
