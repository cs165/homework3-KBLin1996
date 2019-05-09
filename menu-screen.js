// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class MenuScreen
{
  constructor(element) {
    this.element = element;
    this.object = [];
    
    this.createMenu();
  }

  show()
  {
    this.element.classList.remove('inactive');
  }

  hide()
  {
    this.element.classList.add('inactive');
  }
  
  createMenu()
  {
    for(const source of FLASHCARD_DECKS)
    {
      const menu = new Menu(this.element, source.title);
      this.object.push(menu);
    }
  }
}

class Menu
{
  constructor(element, menuTitle)
  {
    this.element = element.querySelector('#choices');
    this.title = menuTitle;
    this.index = -1;

    this.changeMain = this.changeMain.bind(this);

    this.divi = document.createElement('div');
    this.divi.textContent = this.title;
    this.divi.addEventListener('click', this.changeMain);
    this.element.append(this.divi);
  }

  changeMain()
  {
    this.index = FLASHCARD_DECKS.map(function(item)
    {
      return item.title;
    }).indexOf(this.title);

    document.dispatchEvent(new CustomEvent('show-main',
    {
      detail:
      {
        titleIndex: this.index
      }
    }));
  }
}