import {arrMovies} from '../card-movie/infMovies';
import {writeToLocalStorage} from './writeToLocalStorage';

export function removeItemLocalStorage(idMovie) {
  localStorage.clear();
  const newArr = arrMovies.filter((item) => item.id !== idMovie);
  console.log(newArr);
  writeToLocalStorage(newArr);
}
