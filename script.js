import { colors } from "./data/colors.js";
let pixelGrid = '';
let pixelNumber = 24;
let totalPixels = pixelNumber * pixelNumber;
const canvasElement = document.querySelector('.canvas');
let currentColor = '';
let selectColorsHTML = '';
let gridOpacity;

function resizePixelGrid() {
  for (let i = 1; i !== totalPixels + 1; i++) {
    pixelGrid += `
      <div data-pixel-id="${i}" class="pixel pixel${i}"></div>
    `
  };

  document.querySelector('.canvas').style.grid = `
    ${Math.floor(canvasElement.offsetHeight / pixelNumber)}px / ${' auto'.repeat(pixelNumber)};
    `;

    document.querySelector('.canvas').style.grid = `
    ${Math.floor(canvasElement.offsetHeight / pixelNumber)}px / ${' auto'.repeat(pixelNumber)}
    `;
};

resizePixelGrid();

document.querySelector('.canvas')
  .innerHTML = pixelGrid;

const toggleGridButton = document.querySelector('.toggle-grid-button');

const gridOpacityChangerElement = document.querySelector('.grid-opacity-changer');

gridOpacityChangerElement
  .addEventListener('click', () => {
    gridOpacityChangerElement.value = '';
  });

gridOpacityChangerElement
  .addEventListener('blur', () => {

    if (Number(gridOpacityChangerElement.value) > 100) {
      gridOpacityChangerElement.value = 100;
    };

    if (!Number(gridOpacityChangerElement.value)) {
      gridOpacityChangerElement.value = '';
    };

    if (gridOpacityChangerElement.value.charAt(gridOpacityChangerElement.value.length - 1) !== '%') {
      gridOpacityChangerElement.value += '%'
    };

    if (gridOpacityChangerElement.value === '' || gridOpacityChangerElement.value === '%') {
      gridOpacityChangerElement.value = '0%';
    };

    gridOpacity = gridOpacityChangerElement.value.replace('%', '');

    if (toggleGridButton.classList.contains('toggle-on')) {
      changeGridOpacity();
    };

    console.log(gridOpacity);

});

//handle grid opacity

gridOpacityChangerElement
  .addEventListener('keyup', () => {
    gridOpacity = gridOpacityChangerElement.value;

    if (toggleGridButton.classList.contains('toggle-on')) {
      changeGridOpacity();
    };
});

//handle grid button
toggleGridButton.addEventListener('click', () => {
    if (toggleGridButton.classList.contains('toggle-on')) {
      toggleGridButton.innerHTML = 'Grid: OFF';
      toggleGridButton.classList.remove('toggle-on');
      document.querySelectorAll('.pixel')
      .forEach((pixel) => {
        pixel.style.border = 'none';
      });
    } else {
      toggleGridButton.innerHTML = 'Grid: ON';
      toggleGridButton.classList.add('toggle-on');
      changeGridOpacity();
    };
  });

//generate HTML for color buttons
colors.forEach((color) => {
selectColorsHTML += `
      <div data-color-code="${color}" class="select-color" style="background-color: ${color}"></div>
    `
});

document.querySelector('.select-colors-container').innerHTML = selectColorsHTML;

//handle pixel coloring
document.querySelectorAll('.pixel')
  .forEach((pixel) => {
    pixel.addEventListener('click', () => {
      console.log(pixel.dataset.pixelId);
      const pixelId = pixel.dataset.pixelId;
      document.querySelector(`.pixel${pixelId}`).style.backgroundColor = currentColor;
    });
  });

//handle selecting color
document.querySelectorAll('.select-color')
  .forEach((color) => {
    color.addEventListener('click', () => {
      const colorCode = color.dataset.colorCode;
      currentColor = colorCode;
      document.querySelector('.current-color')
        .style.backgroundColor = colorCode;
      document.querySelector('.custom-color-input')
        .value = colorCode;
    });
});

const customColorInput = document.querySelector('.custom-color-input');

customColorInput
  .addEventListener('keyup', () => {
    let colorInputValue = customColorInput.value;

    //handle hex 
   if (customColorInput.value.charAt(0) === '#' && customColorInput.value.length === 7) {
    currentColor = colorInputValue;
    document.querySelector('.current-color')
    .style.backgroundColor = currentColor;
   };

   //handle RGB
   if  ((colorInputValue.charAt(0) === 'r' || colorInputValue.charAt(0) === 'R') && colorInputValue.charAt(colorInputValue.length - 1) === ')') {
    currentColor = colorInputValue;
    document.querySelector('.current-color')
    .style.backgroundColor = currentColor;
    console.log(currentColor);
   };
});



function changeGridOpacity() {
  document.querySelectorAll('.pixel')
  .forEach((pixel) => {
    pixel.style.border = `1px solid rgba(0, 0, 0, ${gridOpacity / 100})`
  });
}
