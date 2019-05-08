// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class MenuScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this.menus = [];
    
    this.createMenu();
  }

  show() {
    this.containerElement.classList.remove('inactive');
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }
  
  createMenu() {
    for(const source of FLASHCARD_DECKS) {
      const menu = new Menu(this.containerElement, source.title);
      this.menus.push(menu);
    }
  }
}

class Menu {
  constructor(containerElement, menuTitle) {
    this.containerElement = containerElement.querySelector('#choices');
    this.title = menuTitle;
    this.index = -1;

    this.changeMain = this.changeMain.bind(this);

    this.divi = document.createElement('div');
    this.divi.textContent = this.title;
    this.divi.addEventListener('click', this.changeMain);
    this.containerElement.append(this.divi);
  }

  changeMain() {
    this.index = FLASHCARD_DECKS.map(function(item) {
      return item.title;
    }).indexOf(this.title);

    document.dispatchEvent(new CustomEvent('show-main', {
      detail: {
        titleIndex: this.index
      }}));
  }
}