import { readLocalStorage } from "./readLocalStorage";

export function filterLocalStorage(query) {
  const allLocalStorage = readLocalStorage();

  return allLocalStorage.filter(item => {
    const value = item.titleMovie.toLowerCase();
    return value.includes(query.toLowerCase());
  });
}
