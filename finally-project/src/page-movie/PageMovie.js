import {BaseComponent} from '../baseComponents';
import html from './pageMovie.html';

export class PageMovie extends BaseComponent {
  constructor(data) {
    super(html, data);
    this.data = data;
    this.countLikes();
    this.addOptionalInformation();
  }

  countLikes() {
    const btnLike = this._element.querySelector('.like');
    const btnDislike = this._element.querySelector('.dislike');

    let counterLike = btnLike.dataset.count;
    let counterDislike = btnDislike.dataset.count;

    if (localStorage.getItem(`${this.id}:like`) !== null) {
      counterLike = Number(localStorage.getItem(`${this.id}:like`));
      btnLike.dataset.count = counterLike;
    } else {
      counterLike = Number(btnLike.dataset.count);
    }

    if (localStorage.getItem(`${this.id}:dislike`) !== null) {
      counterDislike = Number(localStorage.getItem(`${this.id}:dislike`));
      btnDislike.dataset.count = counterDislike;
    } else {
      counterDislike = Number(btnDislike.dataset.count);
    }

    btnLike.addEventListener('click', () => {
      counterLike++;
      btnLike.dataset.count = counterLike;
      localStorage.setItem(`${this.id}:like`, counterLike);
    });
    btnDislike.addEventListener('click', () => {
      counterDislike++;
      btnDislike.dataset.count = counterDislike;
      localStorage.setItem(`${this.id}:dislike`, counterDislike);
    });
  }

  addOptionalInformation() {
    const movieInf = this._element.querySelector('ul.movie-info');
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i).includes(this.id) && localStorage.getItem(localStorage.key(i)).includes('optional')) {
        const li = document.createElement('li');
        const professionText = document.createElement('p');
        const nameText = document.createElement('p');

        li.classList.add('d-flex');
        professionText.classList.add('col-3');
        nameText.classList.add('col-9');

        professionText.innerText = localStorage.key(i).slice(37).toLowerCase();
        nameText.innerText = localStorage.getItem(localStorage.key(i)).slice(9);

        li.appendChild(professionText);
        li.appendChild(nameText);

        movieInf.appendChild(li);
      }
    }
  }

  get id() {
    return this.data.id;
  }
}
