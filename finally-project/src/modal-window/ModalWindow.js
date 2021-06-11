import {v4 as uuidv4} from 'uuid';
import {BaseComponent} from '../baseComponents';
import {OptionalField} from './optional-field/OptionalField';
import {CardMovie} from '../card-movie/CardMovie';

import {appHistory} from '../historyApp';
import {validationForm} from '../validation/validation';
import { readLocalStorage } from '../local-Storage/readLocalStorage';


export class ModalWindow extends BaseComponent {
  #form;
  #allFieldsForm;
  #loadPosterInput;
  #btnAddNewField;

  constructor(html, data = {}) {
    super(html, data);
    this.data = data;
    this.newMovie = {};
    this._id = uuidv4();

    this.#form = this._element.querySelector('#modal-window');
    this.#allFieldsForm = this._element.querySelectorAll('.form-control');
    this.#btnAddNewField = this._element.querySelector('.btn-add-field');

    // Event Listeners

    this.#form.addEventListener('submit', this.saveRenderData.bind(this));
    this.#allFieldsForm.forEach((field) => field.addEventListener('input', this.onInput.bind(this)));
    this.#allFieldsForm.forEach((field) => field.addEventListener('blur', validationForm));

    this.#btnAddNewField.addEventListener('click', this.addNewField.bind(this));

    // так как добавление постера есть только в модалке для редактирования
    if (this._element.querySelector('h5.modal-title').innerText === 'Редактировать') {
      this.#loadPosterInput = this._element.querySelector('.custom-file-input');
      this.#loadPosterInput.addEventListener('change', this.loadPicture.bind(this));
    }
  }

  saveRenderData(event) {
    event.preventDefault();
    appHistory.push({hash: '#list'});
    $(this._element).modal('hide');

    if (this._element.querySelector('h5.modal-title').innerText === 'Редактировать') {
        readLocalStorage().forEach(item => {
          const card = new CardMovie(item);
          const container = this._element.querySelector('h5.modal-title').closest('li');
          // container.append(card.render());
        });

    } else if (this._element.querySelector('h5.modal-title').innerText === 'Добавить новый фильм') {
      this.newMovie.id = this._id;
    }
  }

  onInput(event) {
    const value = event.target.value;
    const key = event.target.dataset.key;

    if (this._element.querySelector('h5.modal-title').innerText === 'Редактировать') {
      localStorage.setItem(`${this.data.id}:${key}`, value);
    } else if (this._element.querySelector('h5.modal-title').innerText === 'Добавить новый фильм') {
      localStorage.setItem(`${this._id}:${key}`, value);
    }
  }

  loadPicture() {
    const file = this.#loadPosterInput.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this._element.querySelector('.custom-file-label').innerText = file.name;
      this.data.srcImg = reader.result;
      localStorage.setItem(`${this.data.id}:srcImg`, reader.result);
    };
    reader.readAsDataURL(file);

  }

  addNewField() {
    const fieldset = this._element.querySelector('fieldset.form-group');

    if (this._element.querySelector('h5.modal-title').innerText === 'Редактировать') {
      const newField = new OptionalField(this.data.id);
      fieldset.appendChild(newField.render());

    } else if (this._element.querySelector('h5.modal-title').innerText === 'Добавить новый фильм') {
      const newField = new OptionalField(this._id);
      fieldset.appendChild(newField.render());
    }
  }
}
