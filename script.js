import { colors, saveColors } from "./data/colors.js";
let pixelGrid = '';
let pixelNumber = 190;
let totalPixels = pixelNumber * pixelNumber;
const canvasElement = document.querySelector('.canvas');
let currentColor = '';
let selectColorsHTML = '';
let gridOpacity;

function resizePixelGrid() {
  pixelGrid = '';
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

//handle clear canvas button

document.querySelector('.clear-canvas-button')
  .addEventListener('click', () => {
    document.querySelectorAll('.pixel')
    .forEach((pixel) => {
      pixel.style.backgroundColor = `white`;
    });
});

//generate HTML for color buttons

generateColorsHTML();

function generateColorsHTML() {
  selectColorsHTML = '';
  colors.forEach((color) => {
    selectColorsHTML += `
          <div data-color-code="${color}" class="select-color select-color-${color}" style="background-color: ${color}"></div>
        `
    document.querySelector('.select-colors-container')
      .innerHTML = selectColorsHTML;
    });
};

//handle pixel coloring
document.querySelectorAll('.pixel')
  .forEach((pixel) => {
    pixel.addEventListener('click', () => {
      const pixelId = pixel.dataset.pixelId;
      document.querySelector(`.pixel${pixelId}`).style.backgroundColor = currentColor;
    });
  });

//handle selecting color

addClickEventToColors();

function addClickEventToColors() {
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
}

const customColorInput = document.querySelector('.custom-color-input');

let colorInputValue;

customColorInput
  .addEventListener('keyup', () => {
     colorInputValue = customColorInput.value;

    //handle hex and rgb
   if ((customColorInput.value.charAt(0) === '#' && customColorInput.value.length === 7) || (colorInputValue.charAt(0) === 'r' || colorInputValue.charAt(0) === 'R') && colorInputValue.charAt(colorInputValue.length - 1) === ')') {
    currentColor = colorInputValue;
    document.querySelector('.current-color')
    .style.backgroundColor = currentColor;
   };

});

document.querySelector('.save-color-button')
  .addEventListener('click', () => {
    if ((customColorInput.value.charAt(0) === '#' && customColorInput.value.length === 7) || (colorInputValue.charAt(0) === 'r' || colorInputValue.charAt(0) === 'R') && colorInputValue.charAt(colorInputValue.length - 1) === ')') { 
      colors.push(currentColor);
      saveColors();
      generateColorsHTML();
      addClickEventToColors();
    };
});

document.querySelector('.remove-color-button')
  .addEventListener('click', () => {
    colors.forEach((color, index) => {
      if (color === currentColor) {
        colors.splice(index, 1);
        saveColors();
        currentColor = '';
        customColorInput.value = '';
        document.querySelector('.current-color')
          .style.backgroundColor = 'white';
        generateColorsHTML();
        addClickEventToColors();
      }
    });
});

function changeGridOpacity() {
  document.querySelectorAll('.pixel')
  .forEach((pixel) => {
    pixel.style.border = `1px solid rgba(0, 0, 0, ${gridOpacity / 100})`
  });
}
