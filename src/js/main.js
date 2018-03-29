
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

    function Search () {
        const textField = document.getElementById('search');
        const resetBtn = document.getElementById('form-reset');
        const list = document.querySelector('.trade-list');
        const count = document.querySelector('.count');
        let preloader = document.getElementById('preloader');
        let locker = false;

        function preloaderShow() {
            preloader.classList.add('preloader--active');
        }

        function preloaderHide() {
            preloader.classList.remove('preloader--active');
        }

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

       /*    if (data.length === 0){
                const span = document.createElement('span');
                span.textContent = 'Result not found';
                list.appendChild(span);
                span.classList.add('trade-list__not-found');
                return;
            }*/

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
    Search();
}