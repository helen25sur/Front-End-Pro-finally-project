export function writeToLocalStorage(arrData) {
  for (let i = 0; i < arrData.length; i++) {
    const keyMovie = Object.keys(arrData[i]);
    keyMovie.forEach((key) => {
      localStorage.setItem(`${arrData[i].id}:${key}`, arrData[i][key]);
    });
  }
}
