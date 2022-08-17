const inputEl = document.querySelector('.input input');
const div2 = document.querySelector('.div2');
const circleEl = document.querySelector('.circle');

div2.style.width = inputEl.value + '%';


inputEl.addEventListener('change', (e) => {
  div2.style.width = e.target.value + '%';
});

circleEl.addEventListener('mousedown', (e) => {
  console.log('####: mousedown', e);
});