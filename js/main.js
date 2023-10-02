console.log('Start');

// Cette fonction permet de convertir une valeur rgb de forme "rgb(x, y, z)" en hexadécimal "#1a2b3c"
const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`;

// Cette fonction permet de mettre à jour un bouton (classe et texte)
const updateButton = (buttonRef, action = 'toggle', className = 'on') => {
    const emElement = buttonRef.querySelector('em');

    if (action === 'toggle') {
        buttonRef.classList.toggle(className);
        emElement.textContent = buttonRef.classList.contains(className) ? 'off' : 'on';
    } else if (action === 'add') {
        buttonRef.classList.add(className);
        emElement.textContent = 'off';
    } else if (action === 'remove') {
        buttonRef.classList.remove(className);
        emElement.textContent = 'off';
    }
};

// Cette fonction permet de mettre à jour une classe de plusieurs éléments de la voiture
const updateCarElementsClass = (elementsRef, action = 'toggle', className = 'on') => {
    elementsRef.forEach(element => {
        if (action === 'toggle') {
            element.classList.toggle(className);
        } else if (action === 'add') {
            element.classList.add(className);
        } else if (action === 'remove') {
            element.classList.remove(className);
        }
    });
};

// Constantes contenant les références des différents boutons de contrôle
const btnColorSelector = document.querySelector('.controls__color-selector');
const btnEngine = document.querySelector('.controls__engine');
const btnDriving = document.querySelector('.controls__driving');
const btnLights = document.querySelector('.controls__lights');
const btnLeftIndicators = document.querySelector('.controls__left-indicators');
const btnRightIndicators = document.querySelector('.controls__right-indicators');
const btnHazradLights = document.querySelector('.controls__hazard-lights');
const btnWindshieldWiper = document.querySelector('.controls__windshield-wiper');
const btnBackWindowWiper = document.querySelector('.controls__back-window-wiper');

// Constante contenant la référence sur le SVG représentant la voiture
const carSVG = document.querySelector('.car__image');

// Constante contenant la référence sur le conteneur du SVG
const carBackground = document.querySelector('.car');

// Constantes contenant les références des différents éléments de la voiture
const smokes = document.querySelectorAll('.car ellipse[id*="smoke"]');
const headlights = document.querySelectorAll('.car path[id*="headlight"]');
const taillights = document.querySelectorAll('.car path[id*="taillight"]');
const leftIndicators = document.querySelectorAll('.car path[id*="left"][id*="indicator"]');
const rightIndicators = document.querySelectorAll('.car path[id*="right"][id*="indicator"]');
const windshieldWiper = document.querySelector('.car path[id="windshield_wiper"]');
const backWindowWiper = document.querySelector('.car path[id="back_window_wiper"]');

// Variables correspondant à l'état des différentes actions
let isEngineOn = false;
let isDrivingOn = false;
let isLightsOn = false;
let isLeftIndicatorsOn = false;
let isRightIndicatorsOn = false;
let isHazardLightsOn = false;
let isWindshieldWiperOn = false;
let isBackWindowWiperOn = false;

/**************************/
/* Gestion de la peinture */
/**************************/
let selectedColor = btnColorSelector.value;
btnColorSelector.addEventListener('change', () => {
    selectedColor = btnColorSelector.value;
});

const carParts = document.querySelectorAll('.car__image :is(path, rect, circle, ellipse)');
carParts.forEach(carPart => {
    carPart.addEventListener('click', event => {
        event.target.style.fill = selectedColor;
    }); 

    carPart.addEventListener('contextmenu', event => {
        event.preventDefault();
        btnColorSelector.value = rgb2hex(getComputedStyle(event.target)['fill']);
        selectedColor = btnColorSelector.value;
    });
});

/*********************/
/* Gestion du moteur */
/*********************/
btnEngine.addEventListener('click', event => {

    if(isDrivingOn) {
        console.log("The driving must be off !");
        return;
    }

    isEngineOn = !isEngineOn;

    if(!isEngineOn) {

        if(isLeftIndicatorsOn) {
            isLeftIndicatorsOn = false;
            updateButton(btnLeftIndicators);

            if(!isHazardLightsOn) {
                updateCarElementsClass(leftIndicators);
            }
        }

        if(isRightIndicatorsOn) {
            isRightIndicatorsOn = false;
            updateButton(btnRightIndicators);

            if(!isHazardLightsOn) {
                updateCarElementsClass(rightIndicators);
            }
        }

        if(isWindshieldWiperOn) {
            isWindshieldWiperOn = false;
            updateButton(btnWindshieldWiper);
            updateCarElementsClass([windshieldWiper]);
        }

        if(isBackWindowWiperOn) {
            isBackWindowWiperOn = false;
            updateButton(btnBackWindowWiper);
            updateCarElementsClass([backWindowWiper]);
        }

    }

    updateButton(event.target);
    updateCarElementsClass(smokes);
});

/**************************/
/* Gestion de la conduite */
/**************************/
btnDriving.addEventListener('click', event => {

    if(!isEngineOn) {
        console.log("The engine must be on !");
        return;
    }

    isDrivingOn = !isDrivingOn;
    updateButton(event.target);
    updateCarElementsClass([carSVG]);
    updateCarElementsClass([carBackground]);
});


/********************/
/* Gestion des feux */
/********************/
btnLights.addEventListener('click', event => {

    isLightsOn = !isLightsOn;
    updateButton(event.target);
    updateCarElementsClass(headlights);
    updateCarElementsClass(taillights);

});

/***********************************/
/* Gestion des clignotants gauches */
/***********************************/
btnLeftIndicators.addEventListener('click', event => {

    if(!isEngineOn) {
        console.log("The engine must be on !");
        return;
    }

    isLeftIndicatorsOn = !isLeftIndicatorsOn;

    if(isRightIndicatorsOn) {
        isRightIndicatorsOn = false;
        updateButton(btnRightIndicators);

        if(!isHazardLightsOn) {
            updateCarElementsClass(rightIndicators)
        }
    }

    updateButton(event.target);

    if(!isHazardLightsOn) {
        updateCarElementsClass(leftIndicators)
    }
});

/**********************************/
/* Gestion des clignotants droits */
/**********************************/
btnRightIndicators.addEventListener('click', event => {

    if(!isEngineOn) {
        console.log("The engine must be on !");
        return;
    }

    isRightIndicatorsOn = !isRightIndicatorsOn;

    if(isLeftIndicatorsOn) {
        isLeftIndicatorsOn = false;
        updateButton(btnLeftIndicators);

        if(!isHazardLightsOn) {
            updateCarElementsClass(leftIndicators)
        }
    }

    updateButton(event.target);

    if(!isHazardLightsOn) {
        updateCarElementsClass(rightIndicators)
    }
});

/************************/
/* Gestion des warnings */
/************************/
btnHazradLights.addEventListener('click', event => {

    isHazardLightsOn = !isHazardLightsOn;

    if(isLeftIndicatorsOn) {
        updateCarElementsClass(leftIndicators, 'remove');
    }

    if(isRightIndicatorsOn) {
        updateCarElementsClass(rightIndicators, 'remove');
    }

    updateButton(event.target);

    setTimeout( () => {
        updateCarElementsClass(leftIndicators);
        updateCarElementsClass(rightIndicators);
    }, 20);
    
});

/***************************************/
/* Gestion de l'essuie glace parebrise */
/***************************************/
btnWindshieldWiper.addEventListener('click', event => {

    if(!isEngineOn) {
        console.log("The engine must be on !");
        return;
    }

    isWindshieldWiperOn = !isWindshieldWiperOn;
    updateButton(event.target);
    updateCarElementsClass([windshieldWiper]);

});

/*************************************/
/* Gestion de l'essuie glace arrière */
/*************************************/
btnBackWindowWiper.addEventListener('click', event => {

    if(!isEngineOn) {
        console.log("The engine must be on !");
        return;
    }

    isBackWindowWiperOn = !isBackWindowWiperOn;
    updateButton(event.target);
    updateCarElementsClass([backWindowWiper]);

});