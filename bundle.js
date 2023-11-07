/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/Modules/calc.js":
/*!****************************!*\
  !*** ./js/Modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
    const result = document.querySelector('.calculating__result span');



    let sex = 'famele', height, weight, age, ratio = 1.375;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex')
    } else{
        sex = 'famele';
        localStorage.setItem('sex', 'famele');
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active')
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active')


    if (localStorage.getItem('ratio')) {
        sex = localStorage.getItem('ratio')
    } else{
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((elem) => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass)
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass)
            }
        })
    }

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '';
            return
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio)
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio)
        }
    }

    calcTotal();
   

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');

                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'))
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'))
                }
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass);
    
                calcTotal();
            });
        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        if (input.value.match(/\D/g)) {
            input.style.border = "1px solid red"
        } else {
            input.style.border = 'none'
        }

        input.addEventListener('input', () => {
            switch(input.getAttribute('id')) {
                case "height":
                    height = +input.value;
                    break;
                case "weight":
                    weight = +input.value;
                    break;
                case "age":
                    age = +input.value;
                    break;
            }

            calcTotal();
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');


}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/Modules/cards.js":
/*!*****************************!*\
  !*** ./js/Modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
    class MenuCard {
        constructor(src, alt, title, descr, price, parentElement, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentElement)
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element)
            } else {this.classes.forEach(className => element.classList.add(className));}
            element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
            `
            this.parent.append(element)
        }
    }

    // Если код будет подключен к серверу, то код ниже будет работоспособным, то есть код который создает карточки можно будет удалить

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResourse)('http://localhost:3000/requests')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render()
        })
    })

    // axios.get('http://localhost:3000/requests')
    // .then(data => {
    //     data.data.forEach(({img, altimg, title, descr, price}) => {
    //     new MenuCard(img, altimg, title, descr, price, '.menu .container').render()
    // })

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container'
    ).render()
    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        12,
        '.menu .container'

    ).render()
    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        15,
        '.menu .container'
    ).render()
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/Modules/form.js":
/*!****************************!*\
  !*** ./js/Modules/form.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modalW__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modalW */ "./js/Modules/modalW.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");




function form(formSelector, modalTimerId) {
    const forms = document.querySelectorAll(formSelector);
    const message = {
        loading: 'img/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });


    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto ;
            `;
            form.insertAdjacentElement('afterend', statusMessage)

            const formData = new FormData(form);

            const json = json.stringify(Object.fromEntries(formData.entries()))

            ;(0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)(' http://localhost:3000/requests', json)
            .then(data => {
                console.log(request.response);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            })
        });
    }

    function showThanksModal() {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');

        (0,_modalW__WEBPACK_IMPORTED_MODULE_0__.modalOpen)('.modal', modalTimerId);

        const thanksModal = document.createElement('div')
        thanksModal.classList.add('modal__dialog')
        thanksModal.innerHTML =`
        <div class = "modal__content">
            <div data-close class = "modal__close">x</div>
            <div class = "modal__title">${message}</div>
        </div>`;

        document.querySelector('.modal').append(thanksModal)

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            (0,_modalW__WEBPACK_IMPORTED_MODULE_0__.modalClose)('.modal')
        }, 7000)
    }

    fetch('db.json').then(data => data.json).then(res => console.log(res))
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);

/***/ }),

/***/ "./js/Modules/modalW.js":
/*!******************************!*\
  !*** ./js/Modules/modalW.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "modalClose": () => (/* binding */ modalClose),
/* harmony export */   "modalOpen": () => (/* binding */ modalOpen)
/* harmony export */ });
function modalOpen(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector)
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = "hidden";

    console.log(modalTimerId)
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function modalClose(modalSelector) {
    const modal = document.querySelector(modalSelector)
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = "";
}

function modalWindow(triggerSelector, modalSelector, modalTimerId) {
    const modalTrigger = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector);

  modalTrigger.forEach(btn => {
      btn.addEventListener('click', () => {
          modalOpen(modalSelector, modalTimerId);
      })
  })

  modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.getAttribute('data-close') == '') {
          modalClose(modalSelector);
      }
  })

  document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && modal.classList.contains('show')) {
          modalClose(modalSelector);
      }
  })

  function showModalByScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
          modalOpen(modalSelector, modalTimerId);
          window.removeEventListener('scroll', showModalByScroll);
      }
  }

  window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modalWindow);



/***/ }),

/***/ "./js/Modules/slider.js":
/*!******************************!*\
  !*** ./js/Modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


function slider({countainer, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, flied}) {

    const slides = document.querySelectorAll(slide),
          prev = document.querySelector(prevArrow),
          next = document.querySelector(nextArrow),
          total = document.querySelector(totalCounter),
          current = document.querySelector(currentCounter),
          slidesWrapper = document.querySelector(wrapper),
          slidesFeild = document.querySelector(flied),
          width = window.getComputedStyle(slidesWrapper).width,
          slider = document.querySelector(countainer)
          
    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`
        current.textContent = `0${slideIndex}`
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesFeild.style.width = 100 * slides.length + '%';
    slidesFeild.style.display = 'flex';
    slidesFeild.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    })

    slider.style.position = 'relative';
    const indicator = document.createElement('ol');

    const dots = [];

    indicator.classList.add('carousel-indicators');
    indicator.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;

    slider.append(indicator);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1
        };
        indicator.append(dot);
        dots.push(dot);
    }

    function deleteNotDigints(str) {
        return +str.replace(/\D/g, '')
    }

    next.addEventListener('click', () => {
        if (offset == deleteNotDigints(width) * (slides.length - 1)) {
            offset = 0
        } else {
            offset += deleteNotDigints(width)
        }

        slidesFeild.style.transform = `translateX(-${offset}px)`

        if (slideIndex === slides.length) {
            slideIndex = 1
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`
        } else {
            current.textContent = `${slideIndex}`
        }

        dots.forEach(dot => dot.style.opacity = .5);
        dots[slideIndex - 1].style.opacity = 1;
    })

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset == deleteNotDigints(width) * (slides.length - 1)
        } else {
            offset -= deleteNotDigints(width);
        }

        slidesFeild.style.transform = `translateX(-${offset}px)`

        
        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent =  `0${slideIndex}`;
        } else {
            current.textContent =  slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = .5);
        dots[slideIndex - 1].style.opacity = 1;
    })

    dots.forEach(dot => {
        dot.addEventListener('click', e => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigints(width) * (slideTo - 1)

            slidesFeild.style.transform = `translateX(-${offset}px)`

            dots.forEach(dot => dot.style.opacity = .5);
            dots[slideIndex - 1].style.opacity = 1;

            if (slides.length < 10) {
                current.textContent =  `0${slideIndex}`;
            } else {
                current.textContent =  slideIndex;
            }
        })
    })

    // Упрощенная разновидность слайдера

    // showSlides(slideIndex);

    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`
    // } else {
    //     total.textContent = slides.length
    // }

    // function showSlides(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }

    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach(item => {
    //         item.style.display = 'none';
    //         slides[slideIndex - 1].style.display = 'block';
    //     })

    //     if (slides.length < 10) {
    //         current.textContent = `0${slideIndex}`
    //     } else {
    //         current.textContent = slideIndex
    //     }
    // }

    // function plusSlides(n) {
    //     showSlides(slideIndex += n)
    // }

    // prev.addEventListener('click', () => {
    //     plusSlides(-1)
    // })

    // next.addEventListener('click', () => {
    //     plusSlides(1)
    // })

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/Modules/tabs.js":
/*!****************************!*\
  !*** ./js/Modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentsSelector, activeClass) {
    const tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector),
    tabsParent = document.querySelector(tabsParentsSelector);

    function hideTabContent() {
    tabsContent.forEach(item => {
        item.classList.add('hide');
        item.classList.remove('show');
        item.classList.remove('fade')

        tabs.forEach(item => {
            item.classList.remove(activeClass)
        })
    });
    };

    function showTabContent(i = 0) {
    tabsContent[i].classList.add('show');
    tabsContent[i].classList.add('fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
    const target = event.target;
    if (target && target.classList.contains(tabsSelector.slice(1))) {
        tabs.forEach((item, i) => {
            if (target == item) {
                hideTabContent();
                showTabContent(i);
            }
        });
    }
    })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/Modules/timer.js":
/*!*****************************!*\
  !*** ./js/Modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {

        function getTimeRemaining(endtime) {
            const t = Date.parse(endtime) - Date.parse(new Date());
    
            if (t > 0) {
                 const days = Math.floor( (t/(1000*60*60*24)) ),
                       seconds = Math.floor( (t/1000) % 60 ),
                       minutes = Math.floor( (t/1000/60) % 60 ),
                       hours = Math.floor( (t/(1000*60*60) % 24) );
    
            return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            }} else {
                return {
                    'total': 0,
                    'days': 0,
                    'hours': 0,
                    'minutes': 0,
                    'seconds': 0
                }
            }
        }
    
        function getZero(num){
            if (num >= 0 && num < 10) { 
                return '0' + num;
            } else {
                return num;
            }
        }
    
        function setClock(selector, endtime) {
    
            const timer = document.querySelector(selector),
                days = timer.querySelector("#days"),
                hours = timer.querySelector('#hours'),
                minutes = timer.querySelector('#minutes'),
                seconds = timer.querySelector('#seconds'),
                timeInterval = setInterval(updateClock, 1000);
    
            updateClock();
    
            function updateClock() {
                const t = getTimeRemaining(endtime);
    
                days.innerHTML = getZero(t.days);
                hours.innerHTML = getZero(t.hours);
                minutes.innerHTML = getZero(t.minutes);
                seconds.innerHTML = getZero(t.seconds);
    
                if (t.total <= 0) {
                    clearInterval(timeInterval);
                }
            }
        }
    
        setClock('.timer', deadline);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResourse": () => (/* binding */ getResourse),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    })

    return await res.json()
}

const getResourse = async (url) => {
    const res = await fetch(url)

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`)
    }

    return await res.json()
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Modules/tabs */ "./js/Modules/tabs.js");
/* harmony import */ var _Modules_modalW__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Modules/modalW */ "./js/Modules/modalW.js");
/* harmony import */ var _Modules_calc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Modules/calc */ "./js/Modules/calc.js");
/* harmony import */ var _Modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Modules/cards */ "./js/Modules/cards.js");
/* harmony import */ var _Modules_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Modules/form */ "./js/Modules/form.js");
/* harmony import */ var _Modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Modules/slider */ "./js/Modules/slider.js");
/* harmony import */ var _Modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Modules/timer */ "./js/Modules/timer.js");
// Дизайн для лохов
// const { object } = require("prop-types");    => Если будет работать сервер, то раскомментировать










document.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => (0,_Modules_modalW__WEBPACK_IMPORTED_MODULE_1__.modalOpen)('.modal', modalTimerId), 30000);

    (0,_Modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_Modules_modalW__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimerId);
    (0,_Modules_calc__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_Modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_Modules_form__WEBPACK_IMPORTED_MODULE_4__["default"])('form', modalTimerId);
    (0,_Modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
        countainer: '.offer__slider',
        nextArrow: '.offer__slider-next',
        slide: '.offer__slide',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        flied: '.offer__slider-inner'
    });
    (0,_Modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer', '2023-05-16');
});


})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map