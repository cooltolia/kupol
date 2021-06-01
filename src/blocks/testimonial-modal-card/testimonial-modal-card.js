import { getData } from '~/js/common/ajax';
import customModal from '~/js/common/Modal';



const testimonialModalTriggers = document.querySelectorAll('.js-testimonial-full');
testimonialModalTriggers.forEach(trigger => {
    trigger.addEventListener('click', e => {
        e.preventDefault();

        const id = trigger.dataset.id;
        // getData(`/get-my-modal.php?id=${id}`).then(data => {
            // addModal; showModal;
        // })

        customModal.showModal('testimonialModalCard', {
            removeOnClose: true
        });
    });
});
