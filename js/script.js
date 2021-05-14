function createModalElement() {
    const modalElement = document.createElement('div');
    modalElement.classList.add('modal');
    modalElement.id = "openModal";

    document.body.appendChild(modalElement);

    const modalDialog = document.createElement('div');
    modalDialog.classList.add('modal_dialog');

    modalElement.appendChild(modalDialog);

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal_content');

    modalDialog.appendChild(modalContent);

    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal_header');

    const modalTitle = document.createElement('div');
    modalTitle.classList.add('modal_title');

    modalTitle.appendChild(document.createTextNode('Results of GET request'));

    const href = document.createElement('a');
    href.classList.add('close');
    href.setAttribute('href', '#close');
    href.appendChild(document.createTextNode('×'));

    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(href);

    const modalBody = document.createElement('div');
    modalBody.classList.add('modal_body');

    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    document.body.style.overflow = 'hidden';

    const overlay = document.createElement('div')
    overlay.classList.add('overlay');
    document.body.append(overlay);

    const requestURL = 'https://rpi-lab2.herokuapp.com/api/message';
    sendRequest(requestURL);
}

function sendRequest(url) {

    setTimeout(() =>{

        let request = new XMLHttpRequest();
        request.open('GET', url, true);

        request.responseType = "json";
        request.setRequestHeader('Content-Type', 'application/json');

        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    outputRequest(request.response);
                }
            }
        }

        request.send(null);
    }, 500);
}

function outputRequest(request) {

    let obj = request;
    const modalBody = document.querySelector(".modal_body");

    Object.keys(obj).forEach(function (key) {

        let requestElement = document.createElement('p');
        requestElement.classList.add('modal_text');

        let usernameSpan = document.createElement('span');
        usernameSpan.classList.add('user_name');
        usernameSpan.appendChild(document.createTextNode(obj[key].userName));

        requestElement.appendChild(usernameSpan);
        requestElement.appendChild(document.createTextNode(': ' + obj[key].message));

        modalBody.append(requestElement);
    });
}

function removeModalElement() {
    const modalElement = document.querySelector('.modal');
    const overlay = document.querySelector('.overlay');

    const closeCross = document.querySelector('.close');
    closeCross.removeEventListener('click',removeModalElement);
    overlay.removeEventListener('click', removeModalElement);

    modalElement.remove();
    overlay.remove();

    document.body.style.overflow = 'auto';
}

function processModal() {

    createModalElement();

    const closeCross = document.querySelector('.close');
    closeCross.addEventListener('click',() => removeModalElement(event));

    const overlay = document.querySelector('.overlay');
    overlay.addEventListener('click',() => removeModalElement(event));
}

const openLink = document.querySelector('.show_modal_link');
openLink.addEventListener('click', (event) => processModal(event));
openLink.click();

