import { lazyLoadImages, lazyLoadPictures } from '/js/common/helpers';

const lazyImageNodes = document.querySelectorAll('.lazy-img');
lazyLoadImages(lazyImageNodes);

const lazyLoadPictureNodes = document.querySelectorAll('.lazy-picture');
lazyLoadPictures(lazyLoadPictureNodes)
