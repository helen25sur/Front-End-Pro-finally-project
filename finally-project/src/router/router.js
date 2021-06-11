import {PageMovie} from '../page-movie/PageMovie';
import {ListMovies} from './../list-movies/ListMovies';

import {arrMovies} from '../card-movie/infMovies';
import {readLocalStorage} from '../local-Storage/readLocalStorage';
import {writeToLocalStorage} from '../local-Storage/writeToLocalStorage';

import {appHistory} from '../historyApp';

const mainContent = document.querySelector('#content');

export function renderRoute(pathname) {
  function findOnId(pathname) {
    mainContent.innerHTML = '';
    const regexp = /^#list-[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (regexp.test(pathname)) {
      const id = pathname.slice(6);

      if (localStorage.length > 0) {
        const value = {};
        for (let i = 0; i < localStorage.length; i++) {
          const keyStorage = localStorage.key(i);
          const idStorage = keyStorage.match(
            /[a-f0-9]{8}-?[a-f0-9]{4}-?[1-5][a-f0-9]{3}-?[89ab][a-f0-9]{3}-?[a-f0-9]{12}/i
          )[0];

          if (id === idStorage) {
            value.id = id;
            const fieldName = keyStorage.split(':')[1];
            if (fieldName === 'cast') {
              value.cast = localStorage.getItem(`${id}:cast`).split(',');
            } else {
              value[fieldName] = localStorage.getItem(keyStorage);
            }
          }
        }

        const pageMovie = new PageMovie(value);
        mainContent.appendChild(pageMovie.render());
      } else if (localStorage.length === 0) {
        const value = arrMovies.filter((item) => {
          if (item.id === id) {
            return item;
          }
        })[0];
        const pageMovie = new PageMovie(value);
        mainContent.appendChild(pageMovie.render());
      }
    }
  }

  switch (pathname) {
    case '': {
      mainContent.innerHTML =
        '<h1 class="mt-5 text-center text-uppercase">Добро пожаловать<br> на портал Мир Кино!</h1>';
      break;
    }
    case '#list': {
      mainContent.innerHTML = '';

      if (localStorage.length === 0) {
        let list = new ListMovies(arrMovies);
        mainContent.appendChild(list.render());
        writeToLocalStorage(arrMovies);
      } else if (localStorage.length > 0) {
        let list = new ListMovies(readLocalStorage(arrMovies));
        mainContent.appendChild(list.render());
      }

      break;
    }

    default: {
      // mainContent.innerHTML = '404';
      findOnId(pathname);
      break;
    }
  }
}

appHistory.listen((listener) => {
  // console.log('history listener', `${listener.location.hash}`);
  renderRoute(listener.location.hash);
});

renderRoute(appHistory.location.hash);
