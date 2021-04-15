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

    Object.keys(obj).forEach(function(key) {
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