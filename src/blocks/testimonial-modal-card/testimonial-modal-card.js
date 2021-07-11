import { getData } from '~/js/common/ajax';
import customModal from '~/js/common/Modal';

const testimonialModalTriggers = document.querySelectorAll('.js-testimonial-full');
testimonialModalTriggers.forEach(trigger => {
    trigger.addEventListener('click', e => {
        e.preventDefault();
        trigger.disabled = true

        const id = trigger.dataset.id;
        customModal.showModal('testimonialModalCard', {
            removeOnClose: true,
        });
        // getData(`/ajax/testimonial.php?id=${id}`).then((data) => {
        //     document.body.insertAdjacentHTML('beforeend', data.html)
        //     customModal.showModal('testimonialModalCard', {
        //         removeOnClose: true,
        //     });
        //     trigger.disabled = false;
        //     refreshFsLightbox();
        // });


    });
});
