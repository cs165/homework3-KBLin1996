// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Changing the code in the constructor
// - Adding methods
// - Adding additional fields

class App {
  constructor() {
    const menuElement = document.querySelector('#menu');
    this.menu = new MenuScreen(menuElement);

    const mainElement = document.querySelector('#main');
    this.flashcards = new FlashcardScreen(mainElement);

    const resultElement = document.querySelector('#results');
    this.results = new ResultsScreen(resultElement);

    // Uncomment this pair of lines to see the "flashcard" screen:
    // this.menu.hide();
    // this.flashcards.show();

    // Uncomment this pair of lines to see the "results" screen:
    // this.menu.hide();
    // this.results.show();

    this.showMenu = this.showMenu.bind(this);
    this.showMain = this.showMain.bind(this);
    this.showResult = this.showResult.bind(this);
    this.restartMain = this.restartMain.bind(this);

    document.addEventListener('show-menu', this.showMenu);
    document.addEventListener('show-main', this.showMain);
    document.addEventListener('show-result', this.showResult);
    document.addEventListener('restart-main', this.restartMain);
  }

  showMenu() {
    this.flashcards.hide();
    this.results.hide();
    this.flashcards.reset();
    this.menu.show();
  }

  showMain(event) {
    this.menu.hide();
    this.results.hide();
    this.flashcards.show(event.detail.titleIndex);
  }

  showResult(event) {
    this.menu.hide();
    this.flashcards.hide();
    this.results.show(event.detail.right, event.detail.wrong, event.detail.titleIndex);
  }

  restartMain(event) {
    this.menu.hide();
    this.results.hide();
    this.flashcards.reset();
    this.flashcards.show(event.detail.titleIndex);
  }
}