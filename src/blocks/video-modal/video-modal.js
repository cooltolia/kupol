import customModal from '~/js/common/Modal';


/** @param {HTMLDivElement} modal */
function videoModalInit(videoId, modal) {
    setTimeout(() => {
        const iframe = modal.querySelector('iframe');
        const autoplay = '?autoplay=1';

        const related_no = '&rel=0';

        const src =
            'https://www.youtube.com/embed/' + videoId + autoplay + related_no;
        iframe.src = src;
    }, 200);
}

/** @param {HTMLDivElement} modal */
function videoModalDestroy(modal) {
    const iframe = modal.querySelector('iframe');
    iframe.src = '';
}

const videoModalTriggers = document.querySelectorAll('.js-video-trigger');
videoModalTriggers.forEach(trigger => {
    trigger.addEventListener('click', e => {
        e.preventDefault();

        const videoId = trigger.dataset.videoId;
        customModal.showModal('videoModal', {
            onShown: videoModalInit.bind(null, videoId),
            onClosed: videoModalDestroy,
        });
    });
});
