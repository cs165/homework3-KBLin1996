// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class ResultsScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this.percentContainer = containerElement.querySelector('.percent');
    this.correctContainer = containerElement.querySelector('.correct');
    this.incorrectContainer = containerElement.querySelector('.incorrect');
    this.continueContainer = containerElement.querySelector('.menu-buttons .continue');
    this.backMenuContainer = containerElement.querySelector('.menu-buttons .to-menu');
    this.index = -1;

    this.backtoMain = this.backtoMain.bind(this);
    this.restartMain = this.restartMain.bind(this);

    this.backMenuContainer.addEventListener('click', this.backtoMenu);
  }

  show(numberCorrect, numberWrong, index) {
    this.containerElement.classList.remove('inactive');
    this.index = index;
    const percent = Math.round(numberCorrect/(numberCorrect + numberWrong)*100);
    this.percentContainer.textContent = percent;
    this.correctContainer.textContent = numberCorrect;
    this.incorrectContainer.textContent = numberWrong;
    if(numberWrong != 0) {
      this.continueContainer.textContent = 'Continue';
      this.continueContainer.removeEventListener('click', this.restartMain);
      this.continueContainer.addEventListener('click', this.backtoMain);
    }else {
      this.continueContainer.textContent = 'Start over?';
      this.continueContainer.removeEventListener('click', this.backtoMain);
      this.continueContainer.addEventListener('click', this.restartMain);
    }
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  backtoMenu() {
    document.dispatchEvent(new CustomEvent('show-menu'));
  }

  backtoMain() {
    document.dispatchEvent(new CustomEvent('show-main', {
      detail: {
        titleIndex: this.index
      }}));
  }

  restartMain() {
    document.dispatchEvent(new CustomEvent('restart-main', {
      detail: {
        titleIndex: this.index
      }}));
  }
}