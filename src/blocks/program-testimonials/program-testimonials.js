import Flickity from 'flickity';
import customModal from '~/js/common/Modal';
import FontFaceObserver from 'fontfaceobserver';

Flickity.prototype._createResizeClass = function () {
    this.element.classList.add('flickity-resize');
};

Flickity.createMethods.push('_createResizeClass');

var resize = Flickity.prototype.resize;
Flickity.prototype.resize = function () {
    this.element.classList.remove('flickity-resize');
    resize.call(this);
    this.element.classList.add('flickity-resize');
};

document.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof HTMLButtonElement)) return;

    if (target.dataset.modal && target.dataset.modal === 'programTestimonialsModal') {
        const targetModal = target.dataset.modal;

        const slider = programTestimonialsInit(document.querySelector(`#${targetModal}`));
        customModal.showModal(targetModal, {
            onShown(modal) {
                // programTestimonialsInit(modal);
                slider.resize()
            },
            onClosed(modal) {
            },
            removeOnClose: false //FIXME: remove on prod if loaded ajax
        });
    }
});

function programTestimonialsInit(modal) {
    if (modal.isInitialized) return;

    modal.isInitialized = true;

    const appealButton = modal.querySelector('.program-testimonials__appeal');

    appealButton.addEventListener('click', () => {
        customModal.closeModal(modal.id);
    })

    const sliderNode = modal.querySelector('.program-testimonials__slides');
    const slider = new Flickity(sliderNode, {
        wrapAround: true,
        prevNextButtons: false,
        pageDots: true,
        cellAlign: 'left',
        adaptiveHeight: true,
    });

    return slider;
}

(function () {
    const programTestimonials = document.querySelector('.program-testimonials');
    if (!programTestimonials) return;

    // const fontObserver = new FontFaceObserver('Montserrat');
    // fontObserver.load().then(() => {
    //     slider.resize();
    // });
})();
