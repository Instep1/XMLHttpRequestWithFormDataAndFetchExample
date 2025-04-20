'use strict'

const form = document.querySelector('form');

const message = {
    loading: 'Загрузка',
    success: 'Спасибо! Скоро мы с Вами свяжемся',
    failure: 'Что-то пошло не так...'
}

postData(form);

function postData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const statusMessage = document.createElement('div'); // создание блока с оповещением пользователя результатом его действий
        statusMessage.classList.add('status');
        statusMessage.textContent = message.loading;
        form.append(statusMessage);

        const request = new XMLHttpRequest();
        request.open('POST', 'server.php');

        request.setRequestHeader('Content-type', 'application/json');
        const formData = new FormData(form);

        const object = {};   // перебор массива formData и формирование, на его основе объекта, который в дальнейшем преобразуется в json, для отправки на сервер
        formData.forEach(function(value, key){
            object[key] = value;
        });

        const json = JSON.stringify(object);

        request.send(json);

        request.addEventListener('load', () => {
            if (request.status === 200) {
                console.log(request.response);
                statusMessage.textContent = message.success;
                form.reset();
                setTimeout(() => {
                    statusMessage.remove()
                }, 3000);
            } else {
                statusMessage.textContent = message.failure;
            }
        })
    })
}