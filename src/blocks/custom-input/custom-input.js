import { fadeIn } from '/js/common/plugins';

const phoneMask = '+7 (f99) 999-99-99';

Inputmask.extendDefinitions({
    f: {
        //masksymbol
        validator: '[0-7|9]',
    },
});

const masksStorage = {
    phoneInputMask: new Inputmask({
        mask: phoneMask,
        showMaskOnHover: false,
    }),
    birthdayInputMask: new Inputmask({
        alias: 'datetime',
        inputFormat: 'dd.mm.yyyy',
        placeholder: 'дд.мм.гггг',
    }),
};

/** -------
 *  input validation functions
 * --------
 */

/**
 *
 *
 * @param {HTMLInputElement} input
 * @returns {Boolean}
 */
function validateBirthdayInput(input) {
    const isValid = Inputmask.isValid(input.value, {
        alias: 'datetime',
        inputFormat: 'dd.mm.yyyy',
    });

    if (isValid) {
        input.parentElement.classList.add('valid');
    } else {
        showInputError(input, 'Неверная дата рождения');
    }

    return isValid;
}

/**
 *
 *
 * @param {HTMLInputElement} input
 * @returns {Boolean}
 */
function validatePhoneInput(input) {
    const isValid = isPhoneValid(input.value);

    if (isValid) {
        input.parentElement.classList.add('valid');
    } else {
        showInputError(input, 'Не верно введен номер телефона');
    }

    return isValid;
}

/**
 *
 *
 * @param {HTMLInputElement} input
 * @returns {Boolean}
 */
function validateEmailInput(input) {
    if (input.value.length === 0) {
        showInputError(input, 'Вы не указали email');
    } else if (!isEmailValid(input.value)) {
        showInputError(input, 'Вы указали неверный email');
    } else {
        hideSingleInputError(input);
        input.parentElement.classList.add('valid');
    }
}

function validateTextInput(input) {
    if (input.value.trim().length === 0) {
        showInputError(input, 'Поле обязательно для заполнения');
    } else {
        hideSingleInputError(input);
        input.parentElement.classList.add('valid');
    }
}

/**
 * @param {NodeList} inputs
 */
function hideInputErrors(inputs) {
    inputs.forEach((input) => {
        hideSingleInputError(input);
    });
}

/**
 * @param {HTMLInputElement} input
 * @param {string} [errorText] set custom error text
 */
function showInputError(input, errorText) {
    const wrapper = input.parentElement;

    if (wrapper.classList.contains('error')) return;

    wrapper.classList.add('error');
    wrapper.classList.remove('valid');

    if (errorText) {
        const errorNode = document.createElement('span');
        errorNode.classList.add('custom-input__error');
        errorNode.textContent = errorText;

        wrapper.append(errorNode);
        fadeIn(errorNode);
    }
}

/**
 * @param {HTMLInputElement} input
 */
function hideSingleInputError(input) {
    const wrapper = input.parentElement;
    wrapper.classList.remove('error');

    const errorNode = wrapper.querySelector('.custom-input__error');
    if (errorNode) errorNode.remove();
}

/** -------
 *  input UX/UI functions
 * --------
 */

/**
 *
 * @param {NodeListOf<HTMLInputElement>} inputs
 */
function floatLabelsInit(inputs) {
    if (!inputs.length) {
        console.error('no inputs provided to floatLabelsInit function');
        return;
    }

    inputs.forEach((input) => {
        toggleLabel(input);

        input.addEventListener('blur', () => {
            toggleLabel(input);
        });
    });
}

/**
 *
 * @param {NodeListOf<HTMLInputElement>} inputs
 */
function setInputValidationHandlers(inputs) {
    if (!inputs.length) {
        console.warn('no inputs provided to setInputHandlers function');
        return;
    }

    inputs.forEach((input) => {
        const validationType = input.dataset.validate;
        switch (validationType) {
            case 'text':
                handleTextInput(input);
                break;
            case 'phone':
                handlePhoneInput(input);
                break;
            case 'email':
                handleEmailInput(input);
                break;
            case 'birhday':
                handleBirthdayInput(input);
                break;
            default:
                break;
        }
    });
}

/**
 *
 * @param {NodeListOf<HTMLInputElement>} inputs
 */
function fireInputsValidation(inputs) {
    if (!inputs.length) {
        console.error('no inputs provided to fireInputsValidation function');
        return;
    }

    inputs.forEach((input) => {
        const validationType = input.dataset.validate;
        switch (validationType) {
            case 'text':
                validateTextInput(input);
                break;
            case 'phone':
                validatePhoneInput(input);
                break;
            case 'email':
                validateEmailInput(input);
                break;
            case 'birhday':
                validateBirthdayInput(input);
                break;
            default:
                break;
        }
    });
}

/**
 *
 * @param {HTMLInputElement} input
 */
function handleTextInput(input) {
    input.addEventListener('focus', () => {
        hideSingleInputError(input);
    });

    input.addEventListener('blur', () => {
        validateTextInput(input);
    });
}

/**
 *
 * @param {HTMLInputElement} input
 */
function handlePhoneInput(input) {
    input.addEventListener('focus', (e) => {
        /**
         * TODO try to use another plugin
         * temp shit to override inputmask strange behavior */
        input.focus();
        input.placeholder = '';

        hideSingleInputError(input);
    });

    input.addEventListener('blur', () => {
        validatePhoneInput(input);
    });
}

/**
 *
 * @param {HTMLInputElement} input
 */
function handleEmailInput(input) {
    input.addEventListener('focus', () => {
        hideSingleInputError(input);
    });

    input.addEventListener('blur', () => {
        validateEmailInput(input);
    });
}

/**
 *
 * @param {HTMLInputElement} input
 */
function handleBirthdayInput(input) {
    input.addEventListener('focus', () => {
        hideSingleInputError(input);
    });

    input.addEventListener('blur', () => {
        validateBirthdayInput(input);
    });
}

/**
 *
 * @param {HTMLInputElement} input
 */
function setPhoneMask(input) {
    masksStorage.phoneInputMask.mask(input);
}

/**
 *
 * @param {HTMLInputElement} input
 */
function setBirthdayMask(input) {
    masksStorage.birthdayInputMask.mask(input);
}

/**
 *
 *
 * @param {HTMLInputElement} input
 * @description changes label position by adding js-has-value class
 */
function toggleLabel(input) {
    const isTextarea = input.tagName.toLowerCase() === 'textarea';
    const parentNode = isTextarea ? input.closest('.custom-textarea') : input.closest('.custom-input');

    if (input.value.trim() !== '') {
        parentNode.classList.add('js-has-value');
    } else {
        parentNode.classList.remove('js-has-value');
    }
}

/**
 * @param {string} value email input value
 * @returns {boolean}
 */
function isEmailValid(value) {
    const emailRegex =
        /(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.))+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]/i;
    const result = value.match(emailRegex);
    if (result && result[0]) return true;
    return false;
}

/**
 * @param {string} value phone input value
 * @returns {boolean}
 */
function isPhoneValid(phone) {
    return Inputmask.isValid(phone, {
        mask: phoneMask,
    });
}

/**
 * @typedef InputMethods
 * @property {} floatLabelsInit
 */
export {
    floatLabelsInit,
    setInputValidationHandlers,
    fireInputsValidation,
    showInputError,
    hideInputErrors,
    hideSingleInputError,
    validateBirthdayInput,
    validateEmailInput,
    validatePhoneInput,
    validateTextInput,
    handleTextInput,
    handlePhoneInput,
    handleEmailInput,
    handleBirthdayInput,
    setPhoneMask,
    setBirthdayMask,
};
