export function readLocalStorage() {
  const arr = [];
  const uniqSet = new Set();
  for (let i = 0; i < localStorage.length; i++) {
    const id = localStorage
      .key(i)
      .match(/[a-f0-9]{8}-?[a-f0-9]{4}-?[1-5][a-f0-9]{3}-?[89ab][a-f0-9]{3}-?[a-f0-9]{12}/i)[0];
    uniqSet.add(id);
  }

  for (const value of uniqSet) {
    arr.push({id: value});
  }

  for (let i = 0; i < localStorage.length; i++) {
    const keyStorage = localStorage.key(i);
    const id = keyStorage.match(/[a-f0-9]{8}-?[a-f0-9]{4}-?[1-5][a-f0-9]{3}-?[89ab][a-f0-9]{3}-?[a-f0-9]{12}/i)[0];
    const fieldName = keyStorage.split(':')[1];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === id) {
        if (fieldName === 'cast') {
          arr[i].cast = localStorage.getItem(`${id}:cast`).split(',');
        } else {
          arr[i][fieldName] = localStorage.getItem(keyStorage);
        }
        continue;
      }
    }
  }

  return arr;
}
