'use strict'

const form = document.querySelector('form');

const message = {
    loading: 'Загрузка',
    success: 'Спасибо! Скоро мы с Вами свяжемся',
    failure: 'Что-то пошло не так...'
}

bindPostData(form);

const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();
}

const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
}

getResource('http://localhost:3000/menu')
    .then(data => {
        data.forEach(obj => console.log(obj));
    })

function bindPostData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const statusMessage = document.createElement('div'); // создание блока с оповещением пользователя результатом его действий
        statusMessage.classList.add('status');
        statusMessage.textContent = message.loading;
        form.append(statusMessage);

        const formData = new FormData(form);

        

        const json = JSON.stringify(Object.fromEntries(formData.entries()));


        postData('http://localhost:3000/requests', json)
        .then(data => {
            console.log(data);
            statusMessage.textContent = message.success;
            form.reset();
            setTimeout(() => {
                statusMessage.remove()
            }, 3000);
        }).catch(() => {
            statusMessage.textContent = message.failure
        }).finally(() => {
            form.reset();
        }) 
    })
}