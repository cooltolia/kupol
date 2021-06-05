import customModal from '~/js/common/Modal';

import * as InputMethods from '~/blocks/custom-input/custom-input';
import starRatingInit from '~/blocks/star-rating/star-rating';
import { postData } from '~/js/common/ajax';

(function () {
    document.addEventListener('click', (e) => {
        const target = e.target;
        if (!(target instanceof HTMLButtonElement)) return;

        if (target.dataset.modal && target.dataset.modal === 'feedbackModal') {
            const targetModal = target.dataset.modal;

            customModal.showModal(targetModal, {
                onShown(modal) {
                    if (modal.modalInited) return;

                    feedbackModalInit(modal);
                },
                onClosed(modal) {
                    /** @type {HTMLFormElement} */
                    const formNode = modal.querySelector('.common-form');
                    formNode.reset();

                    const errorInputs = formNode.querySelectorAll('.custom-input.error input');
                    InputMethods.hideInputErrors(errorInputs);

                    // formNode.CommonFormInstance.clearErrors();
                },
            });
        }
    });
})();

function feedbackModalInit(modal) {
    modal.modalInited = true;
    const form = modal.querySelector('form');
    const validateInputs = form.querySelectorAll('[data-validate]');

    InputMethods.setInputValidationHandlers(validateInputs);

    const phoneInput = modal.querySelector('[data-mask="phone"]');
    if (phoneInput) {
        InputMethods.setPhoneMask(phoneInput);
    }

    const starRating = modal.querySelector('.star-rating__stars');
    if (starRating) {
        starRatingInit(starRating);
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        InputMethods.fireInputsValidation(validateInputs);
        const allValid = [...validateInputs].every((input) => input.parentElement.classList.contains('valid'));

        if (!allValid) {
            console.log('ни-ни');
            return;
        }

        customModal.closeModal(modal.id)

        // postData()
    });
}
