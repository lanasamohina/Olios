export default class ToggleVisibility {
  constructor ({btn, layout, activeClass}) {
    this.btn = btn;
    this.layout = layout;
    this.activeClass = activeClass;
    this._events();
  }

  _events () {
    this.btn.addEventListener('click', () => {
      this.layout.classList.toggle(this.activeClass)
    });  
  }
  
}