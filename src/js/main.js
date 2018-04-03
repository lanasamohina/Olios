
window.addEventListener('DOMContentLoaded', init);

// import $ from 'jquery';

import ToggleVisibility from './toggle'

function init () {

  const menu = {
    btn: document.getElementById('menu-btn'),
    layout: document.getElementById('main-menu'),
    activeClassLayout: 'main-menu--active',
    activeClassButton: 'menu-btn--active',
  };
  new ToggleVisibility(menu);

  //slik slider
  $('.slick-wrapper').slick({
      arrows: false,
      dots: true,
      infinite: true,
      speed: 500,
      fade: true,
      cssEase: 'linear'
  });

  //search

    const db = [
        { title: 'Red Seat', url: 'google.com', imgPath: 'img/redSeat.png'},
        { title: 'Dark Seat', url: 'amazon.com', imgPath: 'img/darkSeat.png'},
        { title: 'Green Seat', url: 'yahoo.com', imgPath: '#'},
        { title: 'Hi there', url: 'linkedin.com', imgPath: '#'},
    ];

    function nano(template, data) {
        return template.replace(/\{([\w\.]*)\}/g, function(str, key) {
            var keys = key.split("."), v = data[keys.shift()];
            for (var i = 0, l = keys.length; i < l; i++) v = v[keys[i]];
            return (typeof v !== "undefined" && v !== null) ? v : "";
        });
    }
    function preloaderShow() {
        preloader.classList.add('preloader--active');
    }

    function preloaderHide() {
        preloader.classList.remove('preloader--active');
    }


    function Search () {
        const textField = document.getElementById('search');
        const resetBtn = document.getElementById('form-reset');
        const list = document.querySelector('.trade-list');
        const count = document.querySelector('.count');
        let preloader = document.getElementById('preloader');
        let locker = false;


        const getData = function(request, callback){
            if (request === ''){
                callback([]);
                return;
            }
            //preloader show
            preloaderShow();
            //settimeout 800ms
            setTimeout(()=>{
                preloaderHide();
                let result = db.filter(item => {
                    return item.title.toLowerCase().indexOf(request.toLowerCase()) > -1
                });
                callback(result);
            },1500);

        };

        const initLayout = data =>{
            while (list.firstChild){
                list.removeChild(list.firstChild);
            }

            let ln = data.length;
            count.textContent = ln;

            document.querySelector('.result-count').classList.add('result-count--active');
            if(ln < 1 &&  textField.value === ''){
                document.querySelector('.result-count').classList.remove('result-count--active');
            }

            document.querySelector('.search-form__reset').classList.add('search-form__reset--active');
            if (ln < 1 &&  textField.value === '' ){
                document.querySelector('.search-form__reset').classList.remove('search-form__reset--active');
            }

            data.forEach(item => {
                let li = document.createElement('li');
                li.classList.add('trade__item');
                const linkTemplate =" <a href=\"{url}\" class=\"trade__link\">\n" +
                    "<img src=\"{imgPath}\" alt=\"\" class=\"trade__img\">\n" +
                    "<span class=\"trade__deskr\">{title}</span>\n" +
                    "</a>";
                let resultItem = nano(linkTemplate, item);
                list.appendChild(li);
                li.innerHTML=resultItem;
            });
        };

        resetBtn.addEventListener('click', ev => {
            textField.value = '';
            initLayout([]);
        });

        textField.addEventListener("keyup", ev => {
            let val = ev.target.value.trim();
            getData(val, initLayout);
            //initLayout(response);
        });
    }
    if (document.getElementById('search') !== null) Search();


    const container = document.querySelector('.products__grid-wrap');
    const loadMore = document.querySelector('.products__load-more');

    const PRODUCTS_DB = [
        { cardTitle: 'White Seat', cardUrl: 'google.com', cardImgPath: 'img/whiteSeat.png', cardDescr: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit', cardPrice: '$42', cardType:'small'},
        { cardTitle: 'Modern Bed', cardUrl: 'google.com', cardImgPath: 'img/bed2.jpg', cardDescr: 'Lorem ipsum dolor sit amet, consectetur', cardPrice: '$120', cardType:'medium'},
        { cardTitle: 'Red Seat 2', cardUrl: 'google.com', cardImgPath: 'img/red.jpg', cardDescr: 'Lorem ipsum dolor sit amet', cardPrice: '$40', cardType:'small'},
        { cardTitle: 'Dark Bed', cardUrl: 'google.com', cardImgPath: 'img/bed.jpg', cardDescr: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit', cardPrice: '$140', cardType:'large'},
        { cardTitle: 'blue Seat', cardUrl: 'google.com', cardImgPath: 'img/blue.jpg', cardDescr: 'Lorem ipsum dolor sit amet', cardPrice: '$35', cardType:'small'},
        { cardTitle: 'rebecca Seat', cardUrl: 'google.com', cardImgPath: 'img/rebecca.jpg', cardDescr: 'Lorem ipsum dolor sit amet, consectetur', cardPrice: '$35', cardType:'small'},
        { cardTitle: 'Seat', cardUrl: 'google.com', cardImgPath: 'img/seat.jpg', cardDescr: 'Lorem ipsum dolor sit amet', cardPrice: '$35', cardType:'large'},
    ];
    const dbLength = PRODUCTS_DB.length;
    let download = 0;

    function loadCards() {
        let currentProductNumber = 0;
        const maxDownloadPerClick = 2;

        for (let i = download; i < PRODUCTS_DB.length; i++) {
            let content = '';
            if (currentProductNumber < maxDownloadPerClick && download < dbLength) {
                let card = PRODUCTS_DB[i];
                content = nunjucks.render('../templates/'+card['cardType']+'-card.njk', card);
                currentProductNumber++;
                download++;

                if(dbLength === download){
                    loadMore.classList.add('products__load-more--hide');
                }
            }
            container.innerHTML += content;
        }
    }

    loadMore.addEventListener('click', ev => {
        preloaderShow();
        setTimeout(()=>{
            preloaderHide();
            loadCards();
        },1200);
    });
}