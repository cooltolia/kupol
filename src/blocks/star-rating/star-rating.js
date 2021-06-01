import { postData } from '~/js/common/ajax';
import { debounce } from '~/js/common/helpers';

export default function starRatingInit(wrapper) {
    if (!wrapper) return;

    const submit = debounce(sendData, 500);

    wrapper.addEventListener('click', e => {
        let action = 'remove';

        console.log(e.target);

        for (const star of wrapper.children) {
            debugger;
            if (star === e.target) {
                action = 'add';
                const radioBtn = star.querySelector('[type="radio"]');
                radioBtn.checked = true;
            }
            star.classList[action]('filled');
        }

        // submit(wrapper);
    });
}

function sendData(wrapper) {
    const selectedStar = wrapper.querySelector('[type="radio"]:checked');
    const data = { [selectedStar.name]: selectedStar.value };
    postData('/app/ajax', {
        body: new URLSearchParams(data)
    })
}
