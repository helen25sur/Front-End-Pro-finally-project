import '@babel/polyfill';

import {BaseComponent} from '../baseComponents';
import {appHistory} from '../historyApp';

// import {ModalEditMovie} from '../modal-window/ModalEditMovie';
import {ModalWindow} from '../modal-window/ModalWindow';
import {arrMovies} from '../card-movie/infMovies';
import html from './cardMovie.html';

import htmlEdit from '../modal-window/ModalEditMovie.html';

import {removeItemLocalStorage} from '../local-Storage/removeItemLocalStorage';
export class CardMovie extends BaseComponent {
  constructor(data) {
    super(html, data);
    this.data = data;
    // this.data.srcImg = '';
    this._element.addEventListener('click', this.onClick.bind(this));
  }

  onClick(event) {
    if (event.target.closest('.btn-delete')) {
      const resp = confirm('Вы хотите удалить этот фильм?');
      if (resp) {
        const needIndex = arrMovies.findIndex((element, index, array) => {
          if (element.id === this.data.id) {
            return index;
          }
        });
        if (needIndex !== -1) {
          // (async () => {
          //   console.log('removeItemLocalStorage');
          //   await removeItemLocalStorage(this.data.id);
          // })();

          console.log(this.data.id);
          arrMovies.splice(needIndex, 1);
          console.log(arrMovies);
        }
        removeItemLocalStorage(this.data.id);
        this._element.remove();
      }
    }

    if (event.target.closest('.btn-edit')) {
      const modal = new ModalWindow(htmlEdit, this.data);
      document.body.appendChild(modal._element);
      $(modal._element).modal();
      $(modal._element).on('hidden.bs.modal', function (e) {
        modal._element.remove();
      });
    }

    if (event.target.closest('.more')) {
      event.preventDefault();
      appHistory.push({hash: `#list-${this.data.id}`});
    }
  }
}
