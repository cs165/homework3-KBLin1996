// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Rewriting some of the existing methods, such as changing code in `show()`
// - Adding methods
// - Adding additional fields

class FlashcardScreen
{
  constructor(element)
  {
    this.element = element;
    this.flashcardContainer = element.querySelector('#flashcard-container');
    this.count_right = element.querySelector('.status .correct');
    this.count_wrong = element.querySelector('.status .incorrect');
    this.display_card = null;
    this.key = null;
    this.current = null;
    this.cards = [];
    this.index = -1;
    this.total_card = 0;
    this.total_right = 0;
    this.total_wrong = 0;
    this.right = 0;
    this.wrong = 0;

    this.drawCard = this.drawCard.bind(this);
    this.slideNow = this.slideNow.bind(this);
    this.slideOut = this.slideOut.bind(this);

    document.addEventListener('slide-now', this.slideNow);
    document.addEventListener('slide-out', this.slideOut);
  }

  show(index)
  {
    this.element.classList.remove('inactive');
    this.count_right.textContent = this.total_right;
    this.count_wrong.textContent = this.total_wrong;
    this.index = index;

    if(this.total_card === 0)
    {
      this.display_card = FLASHCARD_DECKS[index].words;
      this.key = Object.keys(this.display_card);
      this.createFlashcard();
    }

    this.drawCard();
  }

  hide()
  {
    this.element.classList.add('inactive');
  }

  reset()
  {
    for(let i=0; i<this.total_card; i++)
    {
      this.cards.splice(0,1);
    }
    
    this.display_card = null;
    this.key = null;
    this.index = -1;
    this.total_card = 0;
    this.total_right = 0;
    this.total_wrong = 0;
    this.right = 0;
    this.wrong = 0;
  }

  createFlashcard()
  {
    this.total_card = this.key.length;
    for(let i=0; i<this.total_card; i++) {
      const card = new Flashcard(this.flashcardContainer,  this.key[i], this.display_card[this.key[i]]);
      this.cards.push(card);
    }
  }

  drawCard()
  {
    if(this.total_card !== 0) {
      this.current = this.cards.splice(0,1).pop();
      this.current.show();
      this.total_card = this.total_card - 1;
    }
  }
  
  slideNow(event)
  {
    this.right = event.detail.right; 
    this.wrong = event.detail.wrong;
    this.count_right.textContent = this.total_right + this.right;
    this.count_wrong.textContent = this.total_wrong + this.wrong;
  }

  slideOut(event) {
    this.total_right = this.total_right + this.right;
    this.total_wrong = this.total_wrong + this.wrong;
    this.current.hide();

    if(this.wrong === 1)
    {
      this.cards.push(this.current);
    }

    if(this.total_card === 0)
    {
      document.dispatchEvent(new CustomEvent('show-result',
      {
        detail:
        {
          right: this.total_right,
          wrong: this.total_wrong,
          titleIndex: this.index
        }
      }));

      this.total_card = this.total_wrong;
      this.total_wrong = 0;
    }

    else
    {
      this.drawCard();
    }
  }
}