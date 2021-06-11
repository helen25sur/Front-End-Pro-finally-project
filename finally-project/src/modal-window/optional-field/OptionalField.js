import {BaseComponent} from '../../baseComponents';
import html from './optionalField.html';
// import {optionalInf} from '../../card-movie/optionalInf';

export class OptionalField extends BaseComponent {
  #fieldProfession;
  #fieldName;

  constructor(id) {
    super(html);

    this.id = id;

    this.#fieldProfession = this._element.querySelector('.optional-profession');
    this.#fieldName = this._element.querySelector('.optional-name');

    this.#fieldName.addEventListener('focusout', () => {
      localStorage.setItem(`${this.id}:${this.#fieldProfession.value}`, `optional-${this.#fieldName.value}`);
    });

    // optionalInf.forEach(item => {
    //   const keyObj = Object.keys(item);
    //   keyObj.forEach(key => this.saveField(key, keyObj[key]));
    // });
  }

  // static saveField(profession, name) {
  //   localStorage.setItem(`${this.id}:${profession}`, `optional-${name}`);
  // }
}
