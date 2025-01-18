export let colors = JSON.parse(localStorage.getItem('colors'));

if (!colors || colors.length === 0) {
  colors = ['#ed1c24', '#ff7f27', '#fff200', '#22b14c', '#00a2e8', '#3f48cc', '#a349a4', '#000000', '#7f7f7f', '#c3c3c3', '#FFFFFF'];
}

export function saveColors() {
  localStorage.setItem('colors', JSON.stringify(colors));
}