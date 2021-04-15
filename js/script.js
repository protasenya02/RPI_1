window.onload = () => {
    createModal();
};

function createModal() {

    const modalTemplate = getModalTemplate();
    document.body.innerHTML += modalTemplate;

    const requestURL = 'https://rpi-lab2.herokuapp.com/api/message';
    loadRequest(requestURL);
}

function loadRequest(url) {

    let request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.responseType = "json";
    request.send();

    request.onload = function () {
        outputRequest(request.response);
    }

}

function outputRequest(request) {

    let obj = request;
    let modalBody = document.querySelector(".modal_body");
    let bodyText = "";

    Object.keys(obj).forEach(function (key) {
        const messageTemplate = getMessageTemplate({
            name: obj[key].userName,
            message: obj[key].message,
            });
        bodyText += messageTemplate;
    });

    modalBody.innerHTML += bodyText;
}

function getMessageTemplate(userData) {
    return `
       <p class="modal_text">
        <span class="user_name">${userData.name}</span>: ${userData.message}
       </p>
  `;
}

function getModalTemplate() {
    return `
        <div id="openModal" class="modal">
            <div class="modal_dialog">
                <div class="modal_content">
                    <div class="modal_header">
                        <h3 class="modal_title">Results of GET request</h3>
                        <a href="#close" title="Close" class="close">×</a>
                    </div>
                    <div class="modal_body">
                    </div>
                </div>
            </div>
       </div>
  `;
}
