import { colors, saveColors } from "./data/colors.js";
let pixelGrid = '';
let pixelNumber = 24;
let totalPixels = pixelNumber * pixelNumber;
const canvasElement = document.querySelector('.canvas');
let currentColor = '';
let selectColorsHTML = '';
let gridOpacity;

//THERE MIGHT BE JQUERY

function renderPixelGrid() {
  pixelGrid = '';
  totalPixels = pixelNumber * pixelNumber;
  for (let i = 1; i !== totalPixels + 1; i++) {
    pixelGrid += `
      <div data-pixel-id="${i}" class="pixel pixel${i}" style="background-color: white"></div>
    `
  };

  document.querySelector('.canvas').style.grid = `
    ${Math.floor(canvasElement.offsetHeight / pixelNumber)}px / ${' auto'.repeat(pixelNumber)};
    `;

  document.querySelector('.canvas').style.grid = `
    ${Math.floor(canvasElement.offsetHeight / pixelNumber)}px / ${' auto'.repeat(pixelNumber)}
    `;

  document.querySelector('.canvas')
    .innerHTML = pixelGrid;

  addClickEventToPixels();

  changeGridOpacity();

};

renderPixelGrid();

const toggleGridButton = document.querySelector('.toggle-grid-button');

const gridOpacityChangerElement = document.querySelector('.grid-opacity-changer');

gridOpacityChangerElement
  .addEventListener('click', () => {
    gridOpacityChangerElement.value = '';
});

function handleGridOpacityInput() {
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
    gridOpacityChangerElement.value = '';
  };

  gridOpacity = gridOpacityChangerElement.value.replace('%', '');

  if (toggleGridButton.classList.contains('toggle-on')) {
    changeGridOpacity();
  };

}

gridOpacityChangerElement
  .addEventListener('keyup', (e) => {
    if (e.code === 'Enter') {
      gridOpacityChangerElement.blur();
    }
})

gridOpacityChangerElement
  .addEventListener('blur', () => {
    handleGridOpacityInput();
});

//handle grid opacity

gridOpacityChangerElement
  .addEventListener('keyup', () => {

    if (document.querySelector('.toggle-grid-button').classList.contains('toggle-on')) {
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
  if (colors.length > 0) {
    colors.forEach((color) => {
      selectColorsHTML += `
            <div data-color-code="${color}" class="select-color select-color-${color}" style="background-color: ${color}"></div>
          `
      document.querySelector('.select-colors-container')
        .innerHTML = selectColorsHTML;
      });
  } else {
    document.querySelector('.select-colors-container')
    .innerHTML = '';
  }
};

//handle pixel coloring

function addClickEventToPixels() {
  document.querySelectorAll('.pixel')
    .forEach((pixel) => {
      pixel.addEventListener('click', () => {
        const pixelId = pixel.dataset.pixelId;
        document.querySelector(`.pixel${pixelId}`).style.backgroundColor = currentColor;
      });
  });
}

//handle selecting color

const colorSelectorElement = document.getElementById('color-selector');
const currentColorElement = document.querySelector('.current-color');
const customColorInput = document.querySelector('.custom-color-input');
let colorInputValue;


addClickEventToColors();

function addClickEventToColors() {
  document.querySelectorAll('.select-color')
    .forEach((color) => {
      color.addEventListener('click', () => {
        const colorCode = color.dataset.colorCode;
        currentColor = colorCode;
        currentColorElement.style.backgroundColor = colorCode;
        document.querySelector('.custom-color-input')
          .value = colorCode;
      });
    });
};

customColorInput
  .addEventListener('keyup', () => {
     colorInputValue = customColorInput.value;

  //handle hex and rgb

   if ((customColorInput.value.charAt(0) === '#' && customColorInput.value.length === 7) || (colorInputValue.charAt(0) === 'r' || colorInputValue.charAt(0) === 'R') && colorInputValue.charAt(colorInputValue.length - 1) === ')') {
    currentColor = colorInputValue;
    currentColorElement
    .style.backgroundColor = currentColor;
   };

});

// handle color selector input element

colorSelectorElement.addEventListener('input', (e) => { 

  const selectorValue = e.target.value;

  customColorInput.value = selectorValue;

  currentColor = selectorValue;

  currentColorElement.style.backgroundColor = selectorValue;

});

currentColorElement.style.backgroundColor = document.getElementById('color-selector').value;

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
        currentColorElement
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

const gridSizeInput = document.querySelector('.grid-size-input');

document.querySelector('.ok-warning-button')
  .addEventListener('click', () => {
        resizePixelGrid();
    closeResizeWarning();
});

document.querySelector('.cancel-warning-button')
  .addEventListener('click', () => {
    closeResizeWarning();
});

document.querySelector('.grid-size-confirm-button')
  .addEventListener('click', () => {
    checkIfPixelColored();
});

document.querySelector('.grid-size-input')
  .addEventListener('keyup', (e) => {
   
    if (e.code === 'Enter') {
      resizePixelGridChecks();
    }   
});

document.querySelector('.grid-size-confirm-button')
  .addEventListener('click', () => {
      resizePixelGridChecks();
});

function checkIfPixelColored() {
  let hasColor = false;

  document.querySelectorAll('.pixel')
    .forEach((pixel) => {

      if (pixel.style.backgroundColor !== 'white') {
        hasColor = true;
      }

    });

  if (hasColor === true) {
    return true;
  } else {
    return false;
  }
}

function showResizeWarning() {
  document.querySelector('.resize-warning')
    .style.display = 'flex';

  document.querySelector('.blur-site')
    .style.display = 'initial';
}

function closeResizeWarning() {
  document.querySelector('.resize-warning')
    .style.display = 'none';

  document.querySelector('.blur-site')
    .style.display = 'none';
}

function gridSizeInputInvalidWarning(warning) {

  console.log(warning);

  if (!Number(gridSizeInput.value)) {
    let timeout;

    clearTimeout(timeout);
  
    gridSizeInput.value = '';
  
    gridSizeInput.placeholder = warning;
  
    timeout = setTimeout(() => {
      gridSizeInput.placeholder = 'Ex: 16 -> 16x16';
    }, 1000);
  }

}

function resizePixelGrid() {


  if (!Number(gridSizeInput.value)) {
    closeResizeWarning();
  } else {
    pixelNumber = Number(gridSizeInput.value);
    renderPixelGrid();
  }

}

function resizePixelGridChecks() {

  if (Number(gridSizeInput.value) > 100) {
    gridSizeInput.value = '';
    gridSizeInputInvalidWarning('Limit is 100.');
    return;
  }

  checkIfPixelColored() === true 
  ? showResizeWarning()
  : resizePixelGrid();

  if (!Number(gridSizeInput.value)) {
    gridSizeInputInvalidWarning('Invalid number.');
    closeResizeWarning();
  } 

}

document.querySelector('.restore-default-colors-button')
  .addEventListener('click', () => {
    colors.forEach((color, index) => {
      colors.splice(0, colors.length);
    });
     
    ['#ed1c24', '#ff7f27', '#fff200', '#22b14c', '#00a2e8', '#3f48cc', '#a349a4', '#000000', '#7f7f7f', '#c3c3c3', '#FFFFFF'].forEach((color, i) => {
      colors.push(color);
    });
 
    saveColors();
    generateColorsHTML();
    addClickEventToColors();
});

// utils

function numToHex(num) {
  const hex = num.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}

function rgbToHex(r, g, b) {
  const hexCode = '#' + numToHex(r) + numToHex(g) + numToHex(b);
  return hexCode;
}