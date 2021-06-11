export function validationForm () {
  const form = document.querySelector('#modal-window');
  const allFields = form.querySelectorAll('input, textarea');
  const btn = form.querySelector('.save-data');

  allFields.forEach(field => {
    field.addEventListener('focusout', (event) => {
      if (field.required && field.value === '') {
        event.target.classList.add('is-invalid');
      } else {
        event.target.classList.remove('is-invalid');
        event.target.classList.add('is-valid');
      }
    });
    field.addEventListener('focusin', (event) => {
      event.target.classList.remove('is-invalid');
      event.target.classList.remove('is-valid');
    });
  });

  Array.from(allFields).every((field) => {
    if (field.matches('.is-invalid')) {
      btn.disabled = true;
    } else {
      btn.disabled = false;
    }
  });
}
