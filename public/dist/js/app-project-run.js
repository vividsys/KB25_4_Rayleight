(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
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

},{"./content/content.json":2}],2:[function(require,module,exports){
module.exports={
  "pages": {
    "intro": {
      "block1": "Рэлеевское рассеяние",
      "block2": "Коснитесь экрана"
    },
    "main": {
      "block1": {
        "title": "Рэлеевское рассеяние",
        "text": "Рэлеевское рассеяние — рассеяние света  на частицах (неоднородностях), размер которых меньше длины волны излучения. Для видимого света это меньше 0.5 микрометра."
      },
      "block2": {
        "link": "Почему небо голубое, а рассвет и закат – красные?",
        "text1": "Рассеяние прямого солнечного света, %",
        "text2": "Длина волны, нм"
      },
      "block3": {
        "link": "Межзвездное покраснение излучения звезд"
      }
    },
    "page1": {
      "block1": {
        "title": "Почему небо голубое, а закат красный?",
        "text": "Небо не содержит ничего голубого: оно голубое, потому что молекулы азота, кислорода и других газов в воздухе имеют подходящий размер для того, чтобы рассеивать свет с короткой длиной волны (синий и фиолетовый) сильнее длинноволнового излучения света."
      },
      "block2": {
        "text1": "На высоте более 35 км, Солнце кажется белым, а дневное небо - черным",
        "text2": "Солнечный свет содержит в себе все цвета",
        "text3": "Молекулы рассеивают фиолетовый и синий свет во всех направлениях"
      },
      "block3": {
        "text1": "На высоте около 30 км молекул воздуха уже достаточно,  чтобы начать рассеивать синий свет",
        "text2": "Если Солнце находится высоко в небе, все другие цвета, кроме голубого практически беспряственно достигают поверхности Земли",
        "text3": "По мере того, как свет проходит через воздух, сначала голубые, а за ним и зеленые лучи полностью рассеиваются, оставляя желтый, оранжевый и красный",
        "text4": "Дальнейшее рассеяние удаляет желтый и оранжевый цвета, оставляя красный.",
        "text5": "Красный свет первым появляется на рассвете и последним исчезает на закате"
      }
    },
    "page2": {
      "block1": {
        "title": "Межзвездное покраснение",
        "text": "Пыль в космическом пространстве рассеивает короткие волны (голубые) сильнее, чем длинные волны. По этой причине, звезды и другие объекты, которые мы наблюдаем через пылевые облака, кажутся покрасневшими."
      },
      "block2": {
        "text1": "Объект на дистанции",
        "text2": "Синий",
        "text3": "Зерна пыли",
        "text4": "Красное",
        "text5": "Наблюдатель"
      },
      "block3": {
        "text1": "Барнард 68 - большое, плотное облако холодного газа и пыли в созвездии Змееносца. Пыль поглощает свет звезд, находящихся за облаком, создавая видимый “провал” на небесах.",
        "text2": "Однако инфракрасный свет способен пройти сквозь облако (справа), показывая астрономам, что лежит за ним.",
        "text3": "Источник: FORS Team/VLT Antu/ESO; ESO"
      }
    }
  },
  "sidebars": {},
  "popups": {}
}
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL0tCMi9WRE5IX0tCMjNfMjBfSHJ1bmljaGV2L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvYXBwLXByb2plY3QuanMiLCJwdWJsaWMvY29udGVudC9jb250ZW50Lmpzb24iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0ZUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc31yZXR1cm4gZX0pKCkiLCJjb25zdCBjb250ZW50ID0gcmVxdWlyZSgnLi9jb250ZW50L2NvbnRlbnQuanNvbicpO1xyXG5cclxudmFyIGFwcCA9IG5ldyBWdWUoe1xyXG4gIGVsOiAnI2FwcCcsXHJcbiAgZGF0YToge1xyXG5cclxuICAgIGlzQWN0aXZlSW1nOiBmYWxzZSxcclxuXHJcbiAgICBwYWdlczogY29udGVudC5wYWdlcyxcclxuICAgIHNpZGViYXJzOiBjb250ZW50LnNpZGViYXJzLFxyXG4gICAgcG9wdXBzOiBjb250ZW50LnBvcHVwcyxcclxuICAgIGdhbGxlcnk6IGNvbnRlbnQuZ2FsbGVyeSxcclxuICAgIGN1cnJlbnRWaWRlbzogJycsXHJcbiAgICBjdXJyZW50U2lkZWJhcjogJycsXHJcbiAgICBzaWRlYmFySW5Qcm9jZXNzOiAwLFxyXG4gICAgdG9nZ2xlUHJvY2VzczogMCxcclxuXHJcbiAgICBtb2RhbHM6IHtcclxuICAgICAgcG9wdXBMaWZlU3VwcG9ydDoge1xyXG4gICAgICAgIGFjdGl2ZTogZmFsc2VcclxuICAgICAgfSxcclxuICAgICAgbGlmZVNpZGViYXIxOiB7XHJcbiAgICAgICAgYWN0aXZlOiBmYWxzZSxcclxuICAgICAgICBzaWRlYmFyOiAxXHJcbiAgICAgIH0sXHJcbiAgICAgIGxpZmVTaWRlYmFyMjoge1xyXG4gICAgICAgIGFjdGl2ZTogZmFsc2UsXHJcbiAgICAgICAgc2lkZWJhcjogMVxyXG4gICAgICB9LFxyXG4gICAgICBsaWZlU2lkZWJhcjM6IHtcclxuICAgICAgICBhY3RpdmU6IGZhbHNlLFxyXG4gICAgICAgIHNpZGViYXI6IDFcclxuICAgICAgfSxcclxuICAgICAgbGlmZVNpZGViYXI0OiB7XHJcbiAgICAgICAgYWN0aXZlOiBmYWxzZSxcclxuICAgICAgICBzaWRlYmFyOiAxXHJcbiAgICAgIH0sXHJcbiAgICAgIGxpZmVTaWRlYmFyNToge1xyXG4gICAgICAgIGFjdGl2ZTogZmFsc2UsXHJcbiAgICAgICAgc2lkZWJhcjogMVxyXG4gICAgICB9LFxyXG4gICAgICBleHBlcmltZW50c1NpZGViYXIxOiB7XHJcbiAgICAgICAgYWN0aXZlOiBmYWxzZSxcclxuICAgICAgICBzaWRlYmFyOiAxXHJcbiAgICAgIH0sXHJcbiAgICAgIGV4cGVyaW1lbnRzU2lkZWJhcjI6IHtcclxuICAgICAgICBhY3RpdmU6IGZhbHNlLFxyXG4gICAgICAgIHNpZGViYXI6IDFcclxuICAgICAgfSxcclxuICAgICAgZXhwZXJpbWVudHNTaWRlYmFyMzoge1xyXG4gICAgICAgIGFjdGl2ZTogZmFsc2UsXHJcbiAgICAgICAgc2lkZWJhcjogMVxyXG4gICAgICB9LFxyXG4gICAgICBleHBlcmltZW50c1NpZGViYXI0OiB7XHJcbiAgICAgICAgYWN0aXZlOiBmYWxzZSxcclxuICAgICAgICBzaWRlYmFyOiAxXHJcbiAgICAgIH0sXHJcbiAgICAgIGV4cGVyaW1lbnRzU2lkZWJhcjU6IHtcclxuICAgICAgICBhY3RpdmU6IGZhbHNlLFxyXG4gICAgICAgIHNpZGViYXI6IDFcclxuICAgICAgfSxcclxuICAgICAgZXhwZXJpbWVudHNTaWRlYmFyNjoge1xyXG4gICAgICAgIGFjdGl2ZTogZmFsc2UsXHJcbiAgICAgICAgc2lkZWJhcjogMVxyXG4gICAgICB9LFxyXG4gICAgICBleHBlcmltZW50c1NpZGViYXI3OiB7XHJcbiAgICAgICAgYWN0aXZlOiBmYWxzZSxcclxuICAgICAgICBzaWRlYmFyOiAxXHJcbiAgICAgIH0sXHJcbiAgICAgIHN0cnVjdHVyZVNpZGViYXIxOiB7XHJcbiAgICAgICAgYWN0aXZlOiBmYWxzZSxcclxuICAgICAgICBzaWRlYmFyOiAxXHJcbiAgICAgIH0sXHJcbiAgICAgIHN0cnVjdHVyZVNpZGViYXIyOiB7XHJcbiAgICAgICAgYWN0aXZlOiBmYWxzZSxcclxuICAgICAgICBzaWRlYmFyOiAxXHJcbiAgICAgIH0sXHJcbiAgICAgIHN0cnVjdHVyZVNpZGViYXIzOiB7XHJcbiAgICAgICAgYWN0aXZlOiBmYWxzZSxcclxuICAgICAgICBzaWRlYmFyOiAxXHJcbiAgICAgIH0sXHJcbiAgICAgIHN0cnVjdHVyZVNpZGViYXI0OiB7XHJcbiAgICAgICAgYWN0aXZlOiBmYWxzZSxcclxuICAgICAgICBzaWRlYmFyOiAxXHJcbiAgICAgIH0sXHJcbiAgICAgIHN0cnVjdHVyZVNpZGViYXI1OiB7XHJcbiAgICAgICAgYWN0aXZlOiBmYWxzZSxcclxuICAgICAgICBzaWRlYmFyOiAxXHJcbiAgICAgIH0sXHJcbiAgICAgIHN0cnVjdHVyZVNpZGViYXI2OiB7XHJcbiAgICAgICAgYWN0aXZlOiBmYWxzZSxcclxuICAgICAgICBzaWRlYmFyOiAxXHJcbiAgICAgIH0sXHJcbiAgICAgIHN0cnVjdHVyZVNpZGViYXI3OiB7XHJcbiAgICAgICAgYWN0aXZlOiBmYWxzZSxcclxuICAgICAgICBzaWRlYmFyOiAxXHJcbiAgICAgIH0sXHJcbiAgICAgIHN0cnVjdHVyZVNpZGViYXI4OiB7XHJcbiAgICAgICAgYWN0aXZlOiBmYWxzZSxcclxuICAgICAgICBzaWRlYmFyOiAxXHJcbiAgICAgIH0sXHJcbiAgICAgIHN0cnVjdHVyZVNpZGViYXI5OiB7XHJcbiAgICAgICAgYWN0aXZlOiBmYWxzZSxcclxuICAgICAgICBzaWRlYmFyOiAxXHJcbiAgICAgIH0sXHJcbiAgICAgIHN0cnVjdHVyZVNpZGViYXIxMDoge1xyXG4gICAgICAgIGFjdGl2ZTogZmFsc2UsXHJcbiAgICAgICAgc2lkZWJhcjogMVxyXG4gICAgICB9LFxyXG4gICAgICBzdHJ1Y3R1cmVTaWRlYmFyMTE6IHtcclxuICAgICAgICBhY3RpdmU6IGZhbHNlLFxyXG4gICAgICAgIHNpZGViYXI6IDFcclxuICAgICAgfSxcclxuICAgICAgcG9wdXAyOiB7XHJcbiAgICAgICAgYWN0aXZlOiBmYWxzZVxyXG4gICAgICB9LFxyXG4gICAgICBwb3B1cDM6IHtcclxuICAgICAgICBhY3RpdmU6IGZhbHNlXHJcbiAgICAgIH0sXHJcbiAgICAgIHBvcHVwVmlkZW8xOiB7XHJcbiAgICAgICAgaWQ6ICd2aWRlbzEnLFxyXG4gICAgICAgIGFjdGl2ZTogZmFsc2UsXHJcbiAgICAgICAgcGxheTogZmFsc2VcclxuICAgICAgfSxcclxuICAgICAgcG9wdXBWaWRlbzI6IHtcclxuICAgICAgICBpZDogJ3ZpZGVvMicsXHJcbiAgICAgICAgYWN0aXZlOiBmYWxzZSxcclxuICAgICAgICBwbGF5OiBmYWxzZVxyXG4gICAgICB9LFxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGNvbXB1dGVkOiB7XHJcbiAgICB3YWl0VXNlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlkbGVUaW1lciA9IG51bGw7XHJcbiAgICAgIGlkbGVTdGF0ZSA9IGZhbHNlO1xyXG4gICAgICBpZGxlV2FpdCA9IDMwMDAwMDtcclxuICAgICAgdmFyIG1lID0gdGhpcztcclxuXHJcbiAgICAgICQoJ2JvZHknKS5iaW5kKCdtb3VzZW1vdmUgY2xpY2sga2V5ZG93biBzY3JvbGwnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBjbGVhclRpbWVvdXQoaWRsZVRpbWVyKTtcclxuICAgICAgICBpZiAoaWRsZVN0YXRlID09IHRydWUpIHtcclxuICAgICAgICAgICQoJy5pbnRybycpLmFkZENsYXNzKCdpbnRyb19tb3ZlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlkbGVTdGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgIGlkbGVUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAkKCcuaW50cm8nKS5yZW1vdmVDbGFzcygnaW50cm9fbW92ZScpO1xyXG4gICAgICAgICAgbXlTd2lwZXIuc2xpZGVUbygwKTtcclxuICAgICAgICAgIG15R2FsbGVyeS5zbGlkZVRvKDAsIDEwMCk7XHJcbiAgICAgICAgICBteUdhbGxlcnkyLnNsaWRlVG8oMCwgMTAwKTtcclxuXHJcbiAgICAgICAgICBmb3IodmFyIG5hbWUgaW4gbWUubW9kYWxzKXtcclxuICAgICAgICAgICAgaWYobWUubW9kYWxzW25hbWVdLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgIG1lLm1vZGFsc1tuYW1lXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICQoXCIucG9wdXBfX2Jsb2NrXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgaWRsZVN0YXRlID0gdHJ1ZTtcclxuICAgICAgICB9LCBpZGxlV2FpdCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIHN3aXBlSW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBtZSA9IHRoaXM7XHJcbiAgICAgIC8vIFN3aXBlciBpbml0IChodHRwOi8vaWRhbmdlcm8udXMvc3dpcGVyLylcclxuICAgICAgJChmdW5jdGlvbigpIHtcclxuICAgICAgICBteVN3aXBlciA9IG5ldyBTd2lwZXIoJy5zd2lwZXItY29udGFpbmVyLW1haW4nLCB7XHJcbiAgICAgICAgICBzcGVlZDogNTAwLFxyXG4gICAgICAgICAgZGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcsXHJcbiAgICAgICAgICBzaW11bGF0ZVRvdWNoOiB0cnVlLFxyXG4gICAgICAgICAgcGFyYWxsYXg6IHRydWUsXHJcbiAgICAgICAgICBsb25nU3dpcGVzOiB0cnVlLFxyXG4gICAgICAgICAgbG9uZ1N3aXBlc1JhdGlvOiAwLjEsXHJcbiAgICAgICAgICAvLyDQvtGC0LrQuy4g0L3QsCDQv9GA0L7QtNCw0LrRiNC9INC60LvQsNCy0LjQsNGC0YPRgNGDIDog0L3QsNGH0LDQu9C+XHJcbiAgICAgICAgICBrZXlib2FyZDogdHJ1ZSxcclxuICAgICAgICAgIC8vINC+0YLQutC7LiDQvdCwINC/0YDQvtC00LDQutGI0L0g0LrQu9Cw0LLQuNCw0YLRg9GA0YMgOiDQutC+0L3QtdGGXHJcbiAgICAgICAgICBvbjoge1xyXG4gICAgICAgICAgICB0cmFuc2l0aW9uU3RhcnQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgbWUudG9nZ2xlUHJvY2VzcyA9IDE7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb25FbmQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgZm9yKGxldCBpIGluIG1lLm1vZGFscykge1xyXG4gICAgICAgICAgICAgICAgbWUuY2xvc2VNb2RhbChpKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgbWUudG9nZ2xlUHJvY2VzcyA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgIGVsOiAnLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICAgICAgdHlwZTogJ2J1bGxldHMnLFxyXG4gICAgICAgICAgICBjbGlja2FibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHJlbmRlckJ1bGxldDogZnVuY3Rpb24oaW5kZXgsIGNsYXNzTmFtZSkge1xyXG4gICAgICAgICAgICAgIGxldCBudW0gPSBpbmRleCA+PSA5ID8gaW5kZXggKyAxIDogJzAnICsgKGluZGV4ICsgMSk7XHJcbiAgICAgICAgICAgICAgcmV0dXJuICc8c3BhbiBjbGFzcz1cIicgKyBjbGFzc05hbWUgKyAnXCI+JyArIG51bSArICc8L3NwYW4+JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBzd2lwZUludHJvSW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAvLyBodHRwOi8vc3RlcGhlbi5iYW5kL2pxdWVyeS5ldmVudC5tb3ZlL1xyXG4gICAgICAkKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKCcuaW50cm8nKVxyXG4gICAgICAgICAgLm9uKCdtb3ZlIGNsaWNrIHRvdWNoJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaW50cm9fbW92ZScpXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgZ2FsbGVyeUluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgLy8gU3dpcGVyIGluaXQgKGh0dHA6Ly9pZGFuZ2Vyby51cy9zd2lwZXIvKVxyXG4gICAgICAkKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBteUdhbGxlcnkgPSBuZXcgU3dpcGVyKCcuZ2FsbGVyeSAuZ2FsbGVyeV9fc3dpcGVyLWNvbnRhaW5lcicsIHtcclxuICAgICAgICAgIHNwZWVkOiA3MDAsXHJcbiAgICAgICAgICBkaXJlY3Rpb246ICd2ZXJ0aWNhbCcsXHJcbiAgICAgICAgICBzaW11bGF0ZVRvdWNoOiB0cnVlLFxyXG4gICAgICAgICAgcGFyYWxsYXg6IHRydWUsXHJcbiAgICAgICAgICBsb25nU3dpcGVzOiB0cnVlLFxyXG4gICAgICAgICAgbG9uZ1N3aXBlc1JhdGlvOiAwLjEsXHJcbiAgICAgICAgICAvLyDQvtGC0LrQuy4g0L3QsCDQv9GA0L7QtNCw0LrRiNC9INC60LvQsNCy0LjQsNGC0YPRgNGDIDog0L3QsNGH0LDQu9C+XHJcbiAgICAgICAgICBrZXlib2FyZDogdHJ1ZSxcclxuICAgICAgICAgIC8vINC+0YLQutC7LiDQvdCwINC/0YDQvtC00LDQutGI0L0g0LrQu9Cw0LLQuNCw0YLRg9GA0YMgOiDQutC+0L3QtdGGXHJcbiAgICAgICAgICBvbjoge30sXHJcbiAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgIGVsOiAnLmdhbGxlcnkgLmdhbGxlcnlfX3N3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICAgICAgdHlwZTogJ2N1c3RvbScsXHJcbiAgICAgICAgICAgIHJlbmRlckN1c3RvbTogZnVuY3Rpb24gKG15R2FsbGVyeSwgY3VycmVudCwgdG90YWwpIHtcclxuICAgICAgICAgICAgICBpZiAoY3VycmVudCA8IDEwKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuZ2FsbGVyeSAuZ2FsbGVyeV9fc3dpcGVyLXBhZ2luYXRpb24tcHJldicpLnRleHQoJzAnICsgY3VycmVudCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJCgnLmdhbGxlcnkgLmdhbGxlcnlfX3N3aXBlci1wYWdpbmF0aW9uLXByZXYnKS50ZXh0KGN1cnJlbnQpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAkKCcuZ2FsbGVyeSAuZ2FsbGVyeV9fc3dpcGVyLXBhZ2luYXRpb24tdG90YWwnKS50ZXh0KCcwJyArIHRvdGFsKTtcclxuICAgICAgICAgICAgICAkKCcuZ2FsbGVyeSAubmF2aWdhdGlvbiAubmF2aWdhdGlvbl9fbGluaycpLnJlbW92ZUNsYXNzKCduYXZpZ2F0aW9uX19saW5rLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICQoJy5nYWxsZXJ5IC5uYXZpZ2F0aW9uIC5uJyArIGN1cnJlbnQpLmFkZENsYXNzKCduYXZpZ2F0aW9uX19saW5rLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICog0KHRgtGA0LDQvdC40YbQsCDRgSDQs9C+0YDQuNC30L7QvdGC0LDQu9GM0L3QvtC5INC/0YDQvtC60YDRg9GC0LrQvtC5XHJcbiAgICAgKi9cclxuICAgIGhvcml6b25QYWdlU3dpcGVySW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgJChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaG9yaXpvblN3aXBlciA9IG5ldyBTd2lwZXIoJy5ob3Jpem9uX19zd2lwZXItY29udGFpbmVyJywge1xyXG4gICAgICAgICAgc2ltdWxhdGVUb3VjaDogdHJ1ZSxcclxuICAgICAgICAgIHBhcmFsbGF4OiB0cnVlLFxyXG4gICAgICAgICAgLy9zbGlkZXNQZXJWaWV3OiA0LFxyXG4gICAgICAgICAgc2xpZGVzUGVyVmlldzogJ2F1dG8nLFxyXG4gICAgICAgICAgc3BhY2VCZXR3ZWVuOiA1MCxcclxuICAgICAgICAgIC8vZnJlZU1vZGU6IHRydWUsXHJcbiAgICAgICAgICBuZXN0ZWQ6IHRydWUsXHJcbiAgICAgICAgICBvbjoge31cclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgbWV0aG9kczoge1xyXG4gICAgZ29Ub1NsaWRlOiBmdW5jdGlvbiAobiwgdikge1xyXG4gICAgICBteVN3aXBlci5zbGlkZVRvKG4sIHYpO1xyXG4gICAgfSxcclxuICAgIGdhbGxlcnlUbzogZnVuY3Rpb24gKG4sIHYpIHtcclxuICAgICAgbXlHYWxsZXJ5LnNsaWRlVG8obiwgdik7XHJcbiAgICB9LFxyXG4gICAgc2hvd01vZGFsOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgLy8g0L7QsdGA0LDQsdC+0YLQutCwINC+0YfQtdGA0LXQtNC90L7Qs9C+INC+0YLQutGA0YvRgtC40Y8g0YHQsNC50LTQsdCw0YDQvtCyLCDRh9GC0L7QsSDQvdC1INGC0YvQutCw0LvQuFxyXG4gICAgICBpZih0aGlzLm1vZGFsc1tuYW1lXS5zaWRlYmFyKSB7XHJcbiAgICAgICAgaWYodGhpcy5zaWRlYmFySW5Qcm9jZXNzKSByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMuc2lkZWJhckluUHJvY2VzcyA9IHRydWU7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNpZGViYXItd3JhcHBlci4nK25hbWUpWzBdLnN0eWxlID0gJ2xlZnQ6IDBweCc7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgIGZvcihsZXQgaSBpbiBzZWxmLm1vZGFscykge1xyXG4gICAgICAgICAgICBpZihpID09IHNlbGYuY3VycmVudFNpZGViYXIgfHwgIXNlbGYubW9kYWxzW2ldLnNpZGViYXIgfHwgaS5zcGxpdCgnU2lkZWJhcicpWzBdICE9IHNlbGYuY3VycmVudFNpZGViYXIuc3BsaXQoJ1NpZGViYXInKVswXSkgY29udGludWU7XHJcblxyXG4gICAgICAgICAgICBpZihzZWxmLm1vZGFsc1tpXS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgICBzZWxmLm1vZGFsc1tpXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgc2VsZi5jdXJyZW50U2lkZWJhciA9ICcnO1xyXG4gICAgICAgICAgc2VsZi5zaWRlYmFySW5Qcm9jZXNzID0gZmFsc2U7XHJcbiAgICAgICAgfSwgODAwKTtcclxuXHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2lkZWJhciA9IG5hbWU7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5tb2RhbHNbbmFtZV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICBjbG9zZU1vZGFsOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgaWYodGhpcy5tb2RhbHNbbmFtZV0uYWN0aXZlKSB7XHJcbiAgICAgICAgdGhpcy5tb2RhbHNbbmFtZV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgaWYobmFtZSA9PSAncG9wdXBMaWZlU3VwcG9ydCcpIHtcclxuICAgICAgICBmb3IobGV0IGkgPSAxOyBpIDw9IDU7IGkrKylcclxuICAgICAgICAgIHNlbGYuY2xvc2VNb2RhbCgnbGlmZVNpZGViYXInK2kpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgcGxheVZpZGVvRmlsZTogZnVuY3Rpb24gKG5hbWUpIHtcclxuXHJcbiAgICAgIGxldCBtZSA9IHRoaXM7XHJcblxyXG4gICAgICBpZCA9IG1lLm1vZGFsc1tuYW1lXS5pZDtcclxuICAgICAgbWUuY3VycmVudFZpZGVvID0gdmlkZW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XHJcblxyXG4gICAgICBtZS5tb2RhbHNbbmFtZV0ucGxheSA9IHRydWU7XHJcblxyXG4gICAgICB2aWRlby5wbGF5KCk7XHJcbiAgICAgIHZpZGVvLm9uZW5kZWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBtZS5tb2RhbHNbbmFtZV0ucGxheSA9IGZhbHNlO1xyXG4gICAgICAgICQoJy5wb3B1cC12aWRlb19fcHJvZ3Jlc3MtaW5uZXInKS5hbmltYXRlKHsgJ3dpZHRoJzogMCB9LCAxMDAwKTtcclxuICAgICAgfTtcclxuICAgICAgJCh2aWRlbykub24oXHJcbiAgICAgICAgJ3RpbWV1cGRhdGUnLFxyXG4gICAgICAgIGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICAgIHZhciB3aWR0aCA9IDExMzQgLyB0aGlzLmR1cmF0aW9uO1xyXG4gICAgICAgICAgd2lkdGggPSB3aWR0aCAqIHRoaXMuY3VycmVudFRpbWU7XHJcbiAgICAgICAgICAkKCcucG9wdXAtdmlkZW9fX3Byb2dyZXNzLWlubmVyJykuYW5pbWF0ZSh7ICd3aWR0aCc6IHdpZHRoICsgJ3B4JyB9LCA1KTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBwYXVzZVZpZGVvRmlsZTogZnVuY3Rpb24obmFtZSkge1xyXG5cclxuICAgICAgdGhpcy5tb2RhbHNbbmFtZV0ucGxheSA9IGZhbHNlO1xyXG4gICAgICB2aWRlby5wYXVzZSgpO1xyXG5cclxuICAgICAgJCgnLnBvcHVwLXZpZGVvX19wcm9ncmVzcy1pbm5lcicpLnN0b3AoKTtcclxuICAgIH0sXHJcbiAgICByZWxvYWRWaWRlb0ZpbGU6IGZ1bmN0aW9uIChuYW1lKSB7XHJcblxyXG4gICAgICB0aGlzLm1vZGFsc1tuYW1lXS5wbGF5ID0gZmFsc2U7XHJcbiAgICAgIHZpZGVvLmxvYWQoKTtcclxuICAgICAgJCgnLnBvcHVwLXZpZGVvX19wcm9ncmVzcy1pbm5lcicpLmFuaW1hdGUoeyd3aWR0aCc6IDB9LCAxMDAwKTtcclxuICAgIH0sXHJcbiAgICBoYW5kbGVyQ2xvc2VWaWRlb1BvcHVwOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICB0aGlzLmNsb3NlTW9kYWwobmFtZSk7XHJcbiAgICAgIGlmKHRoaXMuY3VycmVudFZpZGVvKSB7XHJcbiAgICAgICAgdGhpcy5wYXVzZVZpZGVvRmlsZShuYW1lKTtcclxuICAgICAgICB0aGlzLnJlbG9hZFZpZGVvRmlsZShuYW1lKTtcclxuICAgICAgfVxyXG5cclxuICAgIH0sXHJcbiAgICBwaG90b09wZW46IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblxyXG4gICAgICB0aGlzLmlzQWN0aXZlSW1nID0gdHJ1ZTtcclxuXHJcbiAgICAgIHZhciBpbWd3aWR0aCA9IGV2ZW50LnRhcmdldC5jbGllbnRXaWR0aDtcclxuICAgICAgdmFyIGltZ0hlaWdodCA9IGV2ZW50LnRhcmdldC5jbGllbnRIZWlnaHQ7XHJcblxyXG4gICAgICB2YXIgZGVzYyA9ICQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCcuc3dpcGVyLXNsaWRlJykuZmluZCgnLnRleHRfX2Rlc2MnKTtcclxuXHJcbiAgICAgIHZhciB3aWR0aCA9ICdhdXRvJyxcclxuICAgICAgICBoZWlnaHQgPSAnMTAwJSc7XHJcblxyXG4gICAgICB2YXIgaW1nID0gJChldmVudC50YXJnZXQpO1xyXG4gICAgICB2YXIgc3JjID0gaW1nLmF0dHIoJ3NyYycpO1xyXG5cclxuICAgICAgJChldmVudC50YXJnZXQpLmNsb3Nlc3QoJyNhcHAnKS5maW5kKCcucG9wdXAtcGhvdG8nKS5hcHBlbmQoXHJcbiAgICAgICAgJzxpbWcgc3JjPVwiJyArIHNyYyArICdcIiBjbGFzcz1cInBvcHVwX2ltZ1wiIHdpZHRoPVwiJyArIHdpZHRoICsgJ1wiIGhlaWdodD1cIicgKyBoZWlnaHQgKyAnXCIgLz4nICsgJzwvZGl2PicpO1xyXG4gICAgfSxcclxuICAgIHBob3RvQ2xvc2U6IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgIHRoaXMuaXNBY3RpdmVJbWcgPSBmYWxzZTtcclxuXHJcbiAgICAgICQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCcjYXBwJykuZmluZCgnLnBvcHVwX2ltZycpLnJlbW92ZSgpO1xyXG4gICAgICAkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnI2FwcCcpLmZpbmQoJy5wb3B1cC1waG90by1kZXNjcmlwdGlvbicpLmVtcHR5KCk7XHJcbiAgICB9XHJcbiAgfVxyXG59KTtcclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vICAgICAgICAgRnVuY3Rpb25zICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbmZ1bmN0aW9uIHBhZ2FuSXNDbG9zZShvYmopIHtcclxuICBsZXQgbW9kYWxzID0gYXBwLm1vZGFscyxcclxuICAgIG8gPSBvYmo7XHJcbiAgJChvLmVsZW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIGZvciAobGV0IGVsZW0gaW4gbW9kYWxzKSB7XHJcbiAgICAgIGlmIChtb2RhbHNbZWxlbV1bJ2FjdGl2ZSddKSB7XHJcbiAgICAgICAgYWN0aXZFbGVtID0gZWxlbVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gc3dpcGVDbG9zZVNpZGViYXIob2JqZWN0KSB7XHJcbiAgbGV0IG8gPSBvYmplY3QsXHJcbiAgICBzdGFydFggPSAwLFxyXG4gICAgbW9kYWxzID0gYXBwLm1vZGFscyxcclxuICAgIGRpc3QsXHJcbiAgICBhY3RpdkVsZW0sXHJcbiAgICBjdXJQb3M7XHJcblxyXG4gICQoby5lbGVtZW50KS5vbigndG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgIGxldCB0b3VjaG9iaiA9IGUuY2hhbmdlZFRvdWNoZXNbMF07IC8vINC/0LXRgNCy0LDRjyDRgtC+0YfQutCwINC/0YDQuNC60L7RgdC90L7QstC10L3QuNGPXHJcbiAgICBkaXN0ID0gMDtcclxuICAgICQodGhpcykuY3NzKCd0cmFuc2l0aW9uJywnMXMgZWFzZSAwcywgbGVmdCBlYXNlLW91dCAwLjFzJyk7XHJcblxyXG4gICAgYWN0aXZFbGVtID0gdG91Y2hvYmoudGFyZ2V0LmNsb3Nlc3QoJy5zaWRlYmFyLXdyYXBwZXInKS5kYXRhc2V0LnNpZGViYXI7XHJcblxyXG4gICAgc3RhcnRYID0gcGFyc2VJbnQodG91Y2hvYmouY2xpZW50WClcclxuICB9KTtcclxuXHJcbiAgJChvLmVsZW1lbnQpLm9uKCd0b3VjaG1vdmUnLCBmdW5jdGlvbihlKSB7XHJcbiAgICBsZXQgdG91Y2hvYmogPSBlLmNoYW5nZWRUb3VjaGVzWzBdOyAvLyDQv9C10YDQstCw0Y8g0YLQvtGH0LrQsCDQv9GA0LjQutC+0YHQvdC+0LLQtdC90LjRjyDQtNC70Y8g0LTQsNC90L3QvtCz0L4g0YHQvtCx0YvRgtC40Y9cclxuICAgIGRpc3QgPSBwYXJzZUludCh0b3VjaG9iai5jbGllbnRYKSAtIHN0YXJ0WDtcclxuICAgIGlmIChkaXN0ID4gMCkge1xyXG4gICAgICAkKHRoaXMpLmNzcygnbGVmdCcsZGlzdCsncHgnKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgJChvLmVsZW1lbnQpLm9uKCd0b3VjaGVuZCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgIGlmIChkaXN0ID4gby5kaXN0YW5jZSkge1xyXG4gICAgICBhcHAuY2xvc2VNb2RhbChhY3RpdkVsZW0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJCh0aGlzKS5jc3MoJ3RyYW5zaXRpb24nLCcxcyBlYXNlIDBzLCBsZWZ0IGVhc2UgMC40cycpO1xyXG4gICAgICAkKHRoaXMpLmNzcygnbGVmdCcsJzBweCcpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzd2lwZUNsb3NlUG9wdXAob2JqZWN0KSB7XHJcbiAgbGV0IG8gPSBvYmplY3QsXHJcbiAgICBzdGFydFkgPSAwLFxyXG4gICAgbW9kYWxzID0gYXBwLm1vZGFscyxcclxuICAgIGRpc3QsIGFjdGl2RWxlbSwgY3VyUG9zO1xyXG5cclxuICAkKG8uZWxlbWVudCkub24oJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgbGV0IHRvdWNob2JqID0gZS5jaGFuZ2VkVG91Y2hlc1swXTsgLy8g0L/QtdGA0LLQsNGPINGC0L7Rh9C60LAg0L/RgNC40LrQvtGB0L3QvtCy0LXQvdC40Y9cclxuXHJcbiAgICBhY3RpdkVsZW0gPSB0b3VjaG9iai50YXJnZXQuY2xvc2VzdCgnLnBvcHVwJykuZGF0YXNldC5wb3B1cDtcclxuICAgIGRpc3QgPSAwO1xyXG5cclxuICAgIHN0YXJ0WSA9IHBhcnNlSW50KHRvdWNob2JqLmNsaWVudFkpXHJcbiAgfSk7XHJcblxyXG4gICQoby5lbGVtZW50KS5vbigndG91Y2htb3ZlJywgZnVuY3Rpb24oZSkge1xyXG4gICAgbGV0IHRvdWNob2JqID0gZS5jaGFuZ2VkVG91Y2hlc1swXTsgLy8g0L/QtdGA0LLQsNGPINGC0L7Rh9C60LAg0L/RgNC40LrQvtGB0L3QvtCy0LXQvdC40Y8g0LTQu9GPINC00LDQvdC90L7Qs9C+INGB0L7QsdGL0YLQuNGPXHJcbiAgICBkaXN0ID0gcGFyc2VJbnQodG91Y2hvYmouY2xpZW50WSkgLSBzdGFydFk7XHJcbiAgfSk7XHJcblxyXG4gICQoby5lbGVtZW50KS5vbigndG91Y2hlbmQnLCBmdW5jdGlvbihlKSB7XHJcbiAgICBpZiAoZGlzdCA+IG8uZGlzdGFuY2UpIHtcclxuICAgICAgYXBwLmNsb3NlTW9kYWwoYWN0aXZFbGVtKTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuLy8gUGVyZmVjdCBzY3JvbGxiYXIgKGh0dHBzOi8vZ2l0aHViLmNvbS91dGF0dGkvcGVyZmVjdC1zY3JvbGxiYXIpXHJcblxyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbigpIHtcclxuICAkKCcuc2lkZWJhcl9fYmxvY2std2l0aC1zY3JvbGwnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHBzID0gbmV3IFBlcmZlY3RTY3JvbGxiYXIodGhpcyk7XHJcbiAgfSk7XHJcblxyXG4gIHBhZ2FuSXNDbG9zZSh7XHJcbiAgICBlbGVtZW50OiAnLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldCcsXHJcbiAgICB0YXJnZXRFbGVtOiAnaXNBY3RpdmUnXHJcbiAgfSk7XHJcblxyXG5cclxuXHJcblxyXG4gIG15U3dpcGVyLm9uKCdzbGlkZUNoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgIGlmIChteVN3aXBlci5hY3RpdmVJbmRleCA9PT0gNCkge1xyXG4gICAgICBteUdhbGxlcnkuc2xpZGVUbygwLCAxMDApO1xyXG4gICAgfVxyXG4gICAgaWYgKG15U3dpcGVyLmFjdGl2ZUluZGV4ID09PSA1KSB7XHJcbiAgICAgIG15R2FsbGVyeTIuc2xpZGVUbygwLCAxMDApO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuXHJcbiAgc3dpcGVDbG9zZVNpZGViYXIoe1xyXG4gICAgZWxlbWVudDogJy5zaWRlYmFyLXdyYXBwZXInLFxyXG4gICAgZGlzdGFuY2U6IDMwMCxcclxuICAgIC8vLyDQtdGB0LvQuCDRgyDQvdCw0YEgaXNBY3RpdmVTaWRlYmFyQnVyYW4xLCDRgtC+INC/0LjRiNC10LwgaXNBY3RpdmVTaWRlYmFyXHJcbiAgfSk7XHJcblxyXG4gIHN3aXBlQ2xvc2VQb3B1cCh7XHJcbiAgICBlbGVtZW50OiAnLnBvcHVwJyxcclxuICAgIGRpc3RhbmNlOiAzMDAsXHJcbiAgICAvLy8g0LXRgdC70Lgg0YMg0L3QsNGBIGlzQWN0aXZlUG9wdXBCdXJhbjEsINGC0L4g0L/QuNGI0LXQvCBpc0FjdGl2ZVBvcHVwXHJcbiAgfSlcclxufSk7XHJcbiIsIm1vZHVsZS5leHBvcnRzPXtcclxuICBcInBhZ2VzXCI6IHtcclxuICAgIFwiaW50cm9cIjoge1xyXG4gICAgICBcImJsb2NrMVwiOiBcItCg0Y3Qu9C10LXQstGB0LrQvtC1INGA0LDRgdGB0LXRj9C90LjQtVwiLFxyXG4gICAgICBcImJsb2NrMlwiOiBcItCa0L7RgdC90LjRgtC10YHRjCDRjdC60YDQsNC90LBcIlxyXG4gICAgfSxcclxuICAgIFwibWFpblwiOiB7XHJcbiAgICAgIFwiYmxvY2sxXCI6IHtcclxuICAgICAgICBcInRpdGxlXCI6IFwi0KDRjdC70LXQtdCy0YHQutC+0LUg0YDQsNGB0YHQtdGP0L3QuNC1XCIsXHJcbiAgICAgICAgXCJ0ZXh0XCI6IFwi0KDRjdC70LXQtdCy0YHQutC+0LUg0YDQsNGB0YHQtdGP0L3QuNC1IOKAlCDRgNCw0YHRgdC10Y/QvdC40LUg0YHQstC10YLQsCAg0L3QsCDRh9Cw0YHRgtC40YbQsNGFICjQvdC10L7QtNC90L7RgNC+0LTQvdC+0YHRgtGP0YUpLCDRgNCw0LfQvNC10YAg0LrQvtGC0L7RgNGL0YUg0LzQtdC90YzRiNC1INC00LvQuNC90Ysg0LLQvtC70L3RiyDQuNC30LvRg9GH0LXQvdC40Y8uINCU0LvRjyDQstC40LTQuNC80L7Qs9C+INGB0LLQtdGC0LAg0Y3RgtC+INC80LXQvdGM0YjQtSAwLjUg0LzQuNC60YDQvtC80LXRgtGA0LAuXCJcclxuICAgICAgfSxcclxuICAgICAgXCJibG9jazJcIjoge1xyXG4gICAgICAgIFwibGlua1wiOiBcItCf0L7Rh9C10LzRgyDQvdC10LHQviDQs9C+0LvRg9Cx0L7QtSwg0LAg0YDQsNGB0YHQstC10YIg0Lgg0LfQsNC60LDRgiDigJMg0LrRgNCw0YHQvdGL0LU/XCIsXHJcbiAgICAgICAgXCJ0ZXh0MVwiOiBcItCg0LDRgdGB0LXRj9C90LjQtSDQv9GA0Y/QvNC+0LPQviDRgdC+0LvQvdC10YfQvdC+0LPQviDRgdCy0LXRgtCwLCAlXCIsXHJcbiAgICAgICAgXCJ0ZXh0MlwiOiBcItCU0LvQuNC90LAg0LLQvtC70L3Riywg0L3QvFwiXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiYmxvY2szXCI6IHtcclxuICAgICAgICBcImxpbmtcIjogXCLQnNC10LbQt9Cy0LXQt9C00L3QvtC1INC/0L7QutGA0LDRgdC90LXQvdC40LUg0LjQt9C70YPRh9C10L3QuNGPINC30LLQtdC30LRcIlxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJwYWdlMVwiOiB7XHJcbiAgICAgIFwiYmxvY2sxXCI6IHtcclxuICAgICAgICBcInRpdGxlXCI6IFwi0J/QvtGH0LXQvNGDINC90LXQsdC+INCz0L7Qu9GD0LHQvtC1LCDQsCDQt9Cw0LrQsNGCINC60YDQsNGB0L3Ri9C5P1wiLFxyXG4gICAgICAgIFwidGV4dFwiOiBcItCd0LXQsdC+INC90LUg0YHQvtC00LXRgNC20LjRgiDQvdC40YfQtdCz0L4g0LPQvtC70YPQsdC+0LPQvjog0L7QvdC+INCz0L7Qu9GD0LHQvtC1LCDQv9C+0YLQvtC80YMg0YfRgtC+INC80L7Qu9C10LrRg9C70Ysg0LDQt9C+0YLQsCwg0LrQuNGB0LvQvtGA0L7QtNCwINC4INC00YDRg9Cz0LjRhSDQs9Cw0LfQvtCyINCyINCy0L7Qt9C00YPRhdC1INC40LzQtdGO0YIg0L/QvtC00YXQvtC00Y/RidC40Lkg0YDQsNC30LzQtdGAINC00LvRjyDRgtC+0LPQviwg0YfRgtC+0LHRiyDRgNCw0YHRgdC10LjQstCw0YLRjCDRgdCy0LXRgiDRgSDQutC+0YDQvtGC0LrQvtC5INC00LvQuNC90L7QuSDQstC+0LvQvdGLICjRgdC40L3QuNC5INC4INGE0LjQvtC70LXRgtC+0LLRi9C5KSDRgdC40LvRjNC90LXQtSDQtNC70LjQvdC90L7QstC+0LvQvdC+0LLQvtCz0L4g0LjQt9C70YPRh9C10L3QuNGPINGB0LLQtdGC0LAuXCJcclxuICAgICAgfSxcclxuICAgICAgXCJibG9jazJcIjoge1xyXG4gICAgICAgIFwidGV4dDFcIjogXCLQndCwINCy0YvRgdC+0YLQtSDQsdC+0LvQtdC1IDM1INC60LwsINCh0L7Qu9C90YbQtSDQutCw0LbQtdGC0YHRjyDQsdC10LvRi9C8LCDQsCDQtNC90LXQstC90L7QtSDQvdC10LHQviAtINGH0LXRgNC90YvQvFwiLFxyXG4gICAgICAgIFwidGV4dDJcIjogXCLQodC+0LvQvdC10YfQvdGL0Lkg0YHQstC10YIg0YHQvtC00LXRgNC20LjRgiDQsiDRgdC10LHQtSDQstGB0LUg0YbQstC10YLQsFwiLFxyXG4gICAgICAgIFwidGV4dDNcIjogXCLQnNC+0LvQtdC60YPQu9GLINGA0LDRgdGB0LXQuNCy0LDRjtGCINGE0LjQvtC70LXRgtC+0LLRi9C5INC4INGB0LjQvdC40Lkg0YHQstC10YIg0LLQviDQstGB0LXRhSDQvdCw0L/RgNCw0LLQu9C10L3QuNGP0YVcIlxyXG4gICAgICB9LFxyXG4gICAgICBcImJsb2NrM1wiOiB7XHJcbiAgICAgICAgXCJ0ZXh0MVwiOiBcItCd0LAg0LLRi9GB0L7RgtC1INC+0LrQvtC70L4gMzAg0LrQvCDQvNC+0LvQtdC60YPQuyDQstC+0LfQtNGD0YXQsCDRg9C20LUg0LTQvtGB0YLQsNGC0L7Rh9C90L4sICDRh9GC0L7QsdGLINC90LDRh9Cw0YLRjCDRgNCw0YHRgdC10LjQstCw0YLRjCDRgdC40L3QuNC5INGB0LLQtdGCXCIsXHJcbiAgICAgICAgXCJ0ZXh0MlwiOiBcItCV0YHQu9C4INCh0L7Qu9C90YbQtSDQvdCw0YXQvtC00LjRgtGB0Y8g0LLRi9GB0L7QutC+INCyINC90LXQsdC1LCDQstGB0LUg0LTRgNGD0LPQuNC1INGG0LLQtdGC0LAsINC60YDQvtC80LUg0LPQvtC70YPQsdC+0LPQviDQv9GA0LDQutGC0LjRh9C10YHQutC4INCx0LXRgdC/0YDRj9GB0YLQstC10L3QvdC+INC00L7RgdGC0LjQs9Cw0Y7RgiDQv9C+0LLQtdGA0YXQvdC+0YHRgtC4INCX0LXQvNC70LhcIixcclxuICAgICAgICBcInRleHQzXCI6IFwi0J/QviDQvNC10YDQtSDRgtC+0LPQviwg0LrQsNC6INGB0LLQtdGCINC/0YDQvtGF0L7QtNC40YIg0YfQtdGA0LXQtyDQstC+0LfQtNGD0YUsINGB0L3QsNGH0LDQu9CwINCz0L7Qu9GD0LHRi9C1LCDQsCDQt9CwINC90LjQvCDQuCDQt9C10LvQtdC90YvQtSDQu9GD0YfQuCDQv9C+0LvQvdC+0YHRgtGM0Y4g0YDQsNGB0YHQtdC40LLQsNGO0YLRgdGPLCDQvtGB0YLQsNCy0LvRj9GPINC20LXQu9GC0YvQuSwg0L7RgNCw0L3QttC10LLRi9C5INC4INC60YDQsNGB0L3Ri9C5XCIsXHJcbiAgICAgICAgXCJ0ZXh0NFwiOiBcItCU0LDQu9GM0L3QtdC50YjQtdC1INGA0LDRgdGB0LXRj9C90LjQtSDRg9C00LDQu9GP0LXRgiDQttC10LvRgtGL0Lkg0Lgg0L7RgNCw0L3QttC10LLRi9C5INGG0LLQtdGC0LAsINC+0YHRgtCw0LLQu9GP0Y8g0LrRgNCw0YHQvdGL0LkuXCIsXHJcbiAgICAgICAgXCJ0ZXh0NVwiOiBcItCa0YDQsNGB0L3Ri9C5INGB0LLQtdGCINC/0LXRgNCy0YvQvCDQv9C+0Y/QstC70Y/QtdGC0YHRjyDQvdCwINGA0LDRgdGB0LLQtdGC0LUg0Lgg0L/QvtGB0LvQtdC00L3QuNC8INC40YHRh9C10LfQsNC10YIg0L3QsCDQt9Cw0LrQsNGC0LVcIlxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJwYWdlMlwiOiB7XHJcbiAgICAgIFwiYmxvY2sxXCI6IHtcclxuICAgICAgICBcInRpdGxlXCI6IFwi0JzQtdC20LfQstC10LfQtNC90L7QtSDQv9C+0LrRgNCw0YHQvdC10L3QuNC1XCIsXHJcbiAgICAgICAgXCJ0ZXh0XCI6IFwi0J/Ri9C70Ywg0LIg0LrQvtGB0LzQuNGH0LXRgdC60L7QvCDQv9GA0L7RgdGC0YDQsNC90YHRgtCy0LUg0YDQsNGB0YHQtdC40LLQsNC10YIg0LrQvtGA0L7RgtC60LjQtSDQstC+0LvQvdGLICjQs9C+0LvRg9Cx0YvQtSkg0YHQuNC70YzQvdC10LUsINGH0LXQvCDQtNC70LjQvdC90YvQtSDQstC+0LvQvdGLLiDQn9C+INGN0YLQvtC5INC/0YDQuNGH0LjQvdC1LCDQt9Cy0LXQt9C00Ysg0Lgg0LTRgNGD0LPQuNC1INC+0LHRitC10LrRgtGLLCDQutC+0YLQvtGA0YvQtSDQvNGLINC90LDQsdC70Y7QtNCw0LXQvCDRh9C10YDQtdC3INC/0YvQu9C10LLRi9C1INC+0LHQu9Cw0LrQsCwg0LrQsNC20YPRgtGB0Y8g0L/QvtC60YDQsNGB0L3QtdCy0YjQuNC80LguXCJcclxuICAgICAgfSxcclxuICAgICAgXCJibG9jazJcIjoge1xyXG4gICAgICAgIFwidGV4dDFcIjogXCLQntCx0YrQtdC60YIg0L3QsCDQtNC40YHRgtCw0L3RhtC40LhcIixcclxuICAgICAgICBcInRleHQyXCI6IFwi0KHQuNC90LjQuVwiLFxyXG4gICAgICAgIFwidGV4dDNcIjogXCLQl9C10YDQvdCwINC/0YvQu9C4XCIsXHJcbiAgICAgICAgXCJ0ZXh0NFwiOiBcItCa0YDQsNGB0L3QvtC1XCIsXHJcbiAgICAgICAgXCJ0ZXh0NVwiOiBcItCd0LDQsdC70Y7QtNCw0YLQtdC70YxcIlxyXG4gICAgICB9LFxyXG4gICAgICBcImJsb2NrM1wiOiB7XHJcbiAgICAgICAgXCJ0ZXh0MVwiOiBcItCR0LDRgNC90LDRgNC0IDY4IC0g0LHQvtC70YzRiNC+0LUsINC/0LvQvtGC0L3QvtC1INC+0LHQu9Cw0LrQviDRhdC+0LvQvtC00L3QvtCz0L4g0LPQsNC30LAg0Lgg0L/Ri9C70Lgg0LIg0YHQvtC30LLQtdC30LTQuNC4INCX0LzQtdC10L3QvtGB0YbQsC4g0J/Ri9C70Ywg0L/QvtCz0LvQvtGJ0LDQtdGCINGB0LLQtdGCINC30LLQtdC30LQsINC90LDRhdC+0LTRj9GJ0LjRhdGB0Y8g0LfQsCDQvtCx0LvQsNC60L7QvCwg0YHQvtC30LTQsNCy0LDRjyDQstC40LTQuNC80YvQuSDigJzQv9GA0L7QstCw0LvigJ0g0L3QsCDQvdC10LHQtdGB0LDRhS5cIixcclxuICAgICAgICBcInRleHQyXCI6IFwi0J7QtNC90LDQutC+INC40L3RhNGA0LDQutGA0LDRgdC90YvQuSDRgdCy0LXRgiDRgdC/0L7RgdC+0LHQtdC9INC/0YDQvtC50YLQuCDRgdC60LLQvtC30Ywg0L7QsdC70LDQutC+ICjRgdC/0YDQsNCy0LApLCDQv9C+0LrQsNC30YvQstCw0Y8g0LDRgdGC0YDQvtC90L7QvNCw0LwsINGH0YLQviDQu9C10LbQuNGCINC30LAg0L3QuNC8LlwiLFxyXG4gICAgICAgIFwidGV4dDNcIjogXCLQmNGB0YLQvtGH0L3QuNC6OiBGT1JTIFRlYW0vVkxUIEFudHUvRVNPOyBFU09cIlxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBcInNpZGViYXJzXCI6IHt9LFxyXG4gIFwicG9wdXBzXCI6IHt9XHJcbn0iXX0=
