// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class Flashcard
{
  constructor(element, frontText, backText)
  {
    this.element = element;
    this.body = document.querySelector('body');
    this.frontText = frontText;
    this.backText = backText;
    this.originX = null;
    this.originY = null;
    this.right = 0;
    this.wrong = 0;

    this.flip = this.flip.bind(this);
    this.start = this.start.bind(this);
    this.move = this.move.bind(this);
    this.final = this.final.bind(this);

    this.flashcardElement = this.DOM(this.frontText, this.backText);

    this.flashcardElement.addEventListener('pointerup', this.flip);

    this.flashcardElement.addEventListener('pointerdown', this.start);
    this.flashcardElement.addEventListener('pointermove', this.move);
    this.flashcardElement.addEventListener('pointerup', this.final);
    this.flashcardElement.addEventListener('pointercancel', this.final);
  }

  show() {
    this.element.append(this.flashcardElement);
  }

  hide() {
    this.element.removeChild(this.flashcardElement);
  }

  // Creates the DOM object representing a flashcard with the given
  // |frontText| and |backText| strings to display on the front and
  // back of the card. Returns a reference to root of this DOM
  // snippet. Does not attach this to the page.
  //
  // More specifically, this creates the following HTML snippet in JS
  // as a DOM object:
  // <div class="flashcard-box show-word">
  //   <div class="flashcard word">frontText</div>
  //   <div class="flashcard definition">backText</div>
  // </div>
  // and returns a reference to the root of that snippet, i.e. the
  // <div class="flashcard-box">

  DOM(frontText, backText)
  {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('flashcard-box');
    cardContainer.classList.add('show-word');

    const wordSide = document.createElement('div');
    wordSide.classList.add('flashcard');
    wordSide.classList.add('word');
    wordSide.textContent = frontText;

    const definitionSide = document.createElement('div');
    definitionSide.classList.add('flashcard');
    definitionSide.classList.add('definition');
    definitionSide.textContent= backText;

    cardContainer.appendChild(wordSide);
    cardContainer.appendChild(definitionSide);
    return cardContainer;
  }

  flip(event) {
    if(this.originX === event.clientX && this.originY === event.clientY)
      this.flashcardElement.classList.toggle('show-word');
  }

  start(event) {
    event.currentTarget.setPointerCapture(event.pointerId);

    this.originX = event.clientX;
    this.originY = event.clientY;
  }

  move(event)
  {
    if(this.originX || this.originY)
    {
      event.preventDefault();
      const deltaX = event.clientX - this.originX;
      const deltaY = event.clientY - this.originY;
      event.currentTarget.style.transition = '';
      event.currentTarget.style.transform = 'translate(' + deltaX + 'px, ' + deltaY + 'px) rotate(' + deltaX*0.2 + 'deg)';

      if(deltaX >= 150)
      {
        this.body.classList.add('answer');
        this.right = 1;
        this.wrong = 0;
      }
      else if(deltaX <=-150)
      {
        this.body.classList.add('answer');
        this.right = 0;
        this.wrong = 1;
      }
      else
      {
        this.body.classList.remove('answer');
        this.right = 0;
        this.wrong = 0;
      }
      document.dispatchEvent(new CustomEvent('slide-now',
      {
        detail:
        {
          right: this.right,
          wrong: this.wrong
        }
      }));
    }
  }

  final(event)
  {
    const currentX = event.clientX;
    const deltaX = currentX - this.originX;
    if(deltaX >= 150 || deltaX <=-150) {
      this.flashcardElement.classList.add('show-word');
      document.dispatchEvent(new CustomEvent('slide-out', {
        detail: {
          right: this.right,
          wrong: this.wrong,
        }
      }));
    }
    event.currentTarget.style.transition = '0.6s';
    event.currentTarget.style.transform = '';
    this.originX = null;
    this.originY = null;
    this.body.classList.remove('answer');
  }
}