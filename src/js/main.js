
window.addEventListener('DOMContentLoaded', init);

// import $ from 'jquery';

import ToggleVisibility from './toggle'

function init () {

  const menu = {
    btn: document.getElementById('menu-btn'),
    layout: document.getElementById('main-aside'),
    activeClass: 'main-aside--active',
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

}