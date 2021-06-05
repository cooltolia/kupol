import Flickity from 'flickity';
import 'flickity/dist/flickity.min.css';
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

(function () {
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    if (!testimonialsSlider) return;

    const sliderNode = testimonialsSlider.querySelector('.testimonials-slider__slides');
    const slider = new Flickity(sliderNode, {
        wrapAround: true,
        prevNextButtons: false,
        pageDots: false,
        cellAlign: 'left',
    });

    const controls = testimonialsSlider.querySelector('.testimonials-slider__controls');
    const prevButton = controls.querySelector('.prev');
    const nextButton = controls.querySelector('.next');

    prevButton.addEventListener('click', () => {
        slider.previous();
    });

    nextButton.addEventListener('click', () => {
        slider.next();
    });

    // const fontObserver = new FontFaceObserver('Montserrat');
    // fontObserver.load().then(() => {
    //     slider.resize();
    // });
})();
