import { postData } from '/js/common/ajax';

const headerBusket = document.querySelector('.header_busket');
const basketCount = document.querySelector('#basket_count');
const basketModalCount = document.querySelector('#header-basket-modal-counter');
const basktetTotalPrice = document.querySelector('#header-basket-modal-price');

export function updateHeaderBusket(count, totalPrice) {
    basketCount.textContent = count;
    basketCount.dataset.num = count;
    basketModalCount.textContent = count;

    basktetTotalPrice.textContent = totalPrice;
}

export function addProductToCart(id, count) {
    return new Promise((resolve) => {
        postData('/ajax/basket_add.php', {
            body: `id=${id}&quantity=${count}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then(data => {
            updateHeaderBusket(data.count, data.totalPrice);
            resolve(data);
        });
    });
}
