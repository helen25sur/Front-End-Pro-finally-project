import {CardMovie} from '../card-movie/CardMovie';
export class ListMovies {
  #listMovies;
  constructor(data) {
    this.data = data;
    this.#listMovies = document.createElement('ul');
    this.#listMovies.className = 'list-movies';
  }

  render() {
    this.data.forEach((item) => {
      const itemList = document.createElement('li');
      const movie = new CardMovie(item);
      itemList.appendChild(movie.render());
      this.#listMovies.appendChild(itemList);
    });

    return this.#listMovies;
  }
}
