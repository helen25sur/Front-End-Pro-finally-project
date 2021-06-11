// import {BaseComponent} from '../baseComponents';
import {appHistory} from '../historyApp';

import {ListMovies} from '../list-movies/ListMovies';

import {ModalWindow} from '../modal-window/ModalWindow';
import {filterLocalStorage} from '../local-Storage/filterLocalStorage';
import htmlNew from '../modal-window/ModalNewMovie.html';

export class Header {
  #btnAllMovies;
  #btnCreateNew;
  #searchField;
  #searchForm;

  constructor() {
    this.#btnAllMovies = document.querySelector('a.all-movies');
    this.#btnAllMovies.addEventListener('mousedown', this.onClick.bind(this));

    this.#btnCreateNew = document.querySelector('#add-new');
    this.#btnCreateNew.addEventListener('click', this.createNewMovie);

    this.#searchField = document.querySelector('#search-field');
    this.#searchField.addEventListener('input', this.searchMovie.bind(this));

    this.#searchForm = document.querySelector('#search');
    this.#searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
    });
  }

  onClick(event) {
    event.preventDefault();
    const {hash} = event.target.href;
    appHistory.push({hash: hash});
  }

  createNewMovie() {
    const newModal = new ModalWindow(htmlNew);
    document.body.appendChild(newModal._element);
    $(newModal._element).modal();
  }

  searchMovie(e) {
    const searchQuery = e.target.value.trim();
    document.querySelector('#content').innerHTML = '';
    const newList = new ListMovies(filterLocalStorage(searchQuery));
    document.querySelector('#content').append(newList.render());
  }
}
