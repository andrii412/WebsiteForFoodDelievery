import {modalOpen} from "./modalW"
import { modalClose } from "./modalW";
import {postData} from "../services/services"

function form(formSelector, modalTimerId) {
    const forms = document.querySelectorAll(formSelector);
    const message = {
        loading: 'img/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });


    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto ;
            `;
            form.insertAdjacentElement('afterend', statusMessage)

            const formData = new FormData(form);

            const json = json.stringify(Object.fromEntries(formData.entries()))

            postData(' http://localhost:3000/requests', json)
            .then(data => {
                console.log(request.response);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            })
        });
    }

    function showThanksModal() {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');

        modalOpen('.modal', modalTimerId);

        const thanksModal = document.createElement('div')
        thanksModal.classList.add('modal__dialog')
        thanksModal.innerHTML =`
        <div class = "modal__content">
            <div data-close class = "modal__close">x</div>
            <div class = "modal__title">${message}</div>
        </div>`;

        document.querySelector('.modal').append(thanksModal)

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            modalClose('.modal')
        }, 7000)
    }

    fetch('db.json').then(data => data.json).then(res => console.log(res))
}

export default form;