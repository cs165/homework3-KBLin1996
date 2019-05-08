// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Rewriting some of the existing methods, such as changing code in `show()`
// - Adding methods
// - Adding additional fields

class FlashcardScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this.flashcardContainer = containerElement.querySelector('#flashcard-container');
    this.rightContainer = containerElement.querySelector('.status .correct');
    this.wrongContainer = containerElement.querySelector('.status .incorrect');
    this.CARDS = null;
    this.WORDS = null;
    this.nowCard = null;
    this.cards = [];
    this.index = -1;
    this.totalCards = 0;
    this.totalRight = 0;
    this.totalWrong = 0;
    this.right = 0;
    this.wrong = 0;

    this.drawCard = this.drawCard.bind(this);
    this.slideNow = this.slideNow.bind(this);
    this.slideOut = this.slideOut.bind(this);

    document.addEventListener('slide-now', this.slideNow);
    document.addEventListener('slide-out', this.slideOut);
  }

  show(index) {
    this.containerElement.classList.remove('inactive');
    this.rightContainer.textContent = this.totalRight;
    this.wrongContainer.textContent = this.totalWrong;
    this.index = index;
    if(this.totalCards === 0) {
      this.CARDS = FLASHCARD_DECKS[index].words;
      this.WORDS = Object.keys(this.CARDS);
      this.createFlashcard();
    }

    this.drawCard();
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  reset() {
    for(let i=0; i<this.totalCards; i++) {
      this.cards.splice(0,1);
    }
    this.CARDS = null;
    this.WORDS = null;
    this.index = -1;
    this.totalCards = 0;
    this.totalRight = 0;
    this.totalWrong = 0;
    this.right = 0;
    this.wrong = 0;
  }

  createFlashcard() {
    this.totalCards = this.WORDS.length;
    for(let i=0; i<this.totalCards; i++) {
      const card = new Flashcard(this.flashcardContainer,  this.WORDS[i], this.CARDS[this.WORDS[i]]);
      this.cards.push(card);
    }
  }

  drawCard() {
    if(this.totalCards !== 0) {
      this.nowCard = this.cards.splice(0,1).pop();
      this.nowCard.show();
      this.totalCards--;
    }
  }
  
  slideNow(event) {
    this.right = event.detail.right; 
    this.wrong = event.detail.wrong;
    this.rightContainer.textContent =  this.totalRight + this.right;
    this.wrongContainer.textContent =  this.totalWrong + this.wrong;
  }

  slideOut(event) {
    this.totalRight = this.totalRight + this.right;
    this.totalWrong = this.totalWrong + this.wrong;
    this.nowCard.hide();
    if(this.wrong === 1) {
      this.cards.push(this.nowCard);
    }

    if(this.totalCards === 0) {
      document.dispatchEvent(new CustomEvent('show-result', {
        detail: {
          right: this.totalRight,
          wrong: this.totalWrong,
          titleIndex: this.index
        }}));
      this.totalCards = this.totalWrong;
      this.totalWrong = 0;
    }else {
      this.drawCard();
    }
  }
}