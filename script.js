// Дизайн для лохов
// const { object } = require("prop-types");    => Если будет работать сервер, то раскомментировать

import tabs from  './Modules/tabs';
import modalW from './Modules/modalW';
import calc  from  './Modules/calc';
import cards  from  './Modules/cards';
import form from  './Modules/form';
import slider from './Modules/slider';
import timer from  './Modules/timer';
import {modalOpen} from './Modules/modalW'

document.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => modalOpen('.modal', modalTimerId), 30000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modalW('[data-modal]', '.modal', modalTimerId);
    calc();
    cards();
    form('form', modalTimerId);
    slider({
        countainer: '.offer__slider',
        nextArrow: '.offer__slider-next',
        slide: '.offer__slide',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        flied: '.offer__slider-inner'
    });
    timer('.timer', '2023-05-16');
});

