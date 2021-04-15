$modal = function (options) {

    // свойства обьекта
    let _elemModal,                     // базовый элемент модального окна
        _eventShowModal,                // событие показа модального окна
        _eventHideModal,                // событие показа модального окна
        _hiding = false,                // состояние показа
        _destroyed = false,             // состояние удаления обьекта из DOM
        _animationSpeed = 200;          // скорость скрытия модального окна


    function _createModal(options) {

        // создание нового элемента с тегом div
        let elemModal = document.createElement('div'),

        // шаблон модального окна
            modalTemplate =
                '<div class="modal__backdrop" data-dismiss="modal">' +
                    '<div class="modal__content">' +
                        '<div class="modal__header">' +
                            '<div class="modal__title" data-modal="title">{{title}}</div>' +
                            '<span class="modal__btn-close" data-dismiss="modal" title="Close">×</span>' +
                        '</div>' +
                        '<div class="modal__body" data-modal="content">{{content}}}</div>'+
                    '</div>' +
                '</div>',
             modalHTML;

        // добавлние нового класса к элементу
        elemModal.classList.add('modal');

        //замена заголовка и надписи в шаблоне на переданные парамеры
       modalHTML = modalTemplate.replace('{{title}}', options.title || 'New window');
       modalHTML = modalHTML.replace('{{content}}', options.content || '');

        // замена содержимого элемента созданным шаблоном
        elemModal.innerHTML = modalHTML;

        // добавление дочернего узла в тело документа
        document.body.appendChild(elemModal);

        return elemModal;
    }

    function _showModal() {
        if (!_destroyed && !_hiding) {

            // добавление класса
            _elemModal.classList.add('modal__show');

            // вызов события
            document.dispatchEvent(_eventShowModal);
        }
    }

    function _hideModal() {
        _hiding = true;
        _elemModal.classList.remove('modal__show');
       // _elemModal.classList.add('modal__hiding');

        setTimeout(function () {
           // _elemModal.classList.remove('modal__hiding');
            _hiding = false;
        }, _animationSpeed);

        // вызов события
        document.dispatchEvent(_eventHideModal);
    }


    function _handlerCloseModal(e) {
        if (e.target.dataset.dismiss === 'modal') {
            _hideModal();
        }
    }

    _elemModal = _createModal(options || {});

    _elemModal.addEventListener('click', _handlerCloseModal);

    _eventShowModal = new CustomEvent('show.modal', { detail: _elemModal });
    _eventHideModal = new CustomEvent('hide.modal', { detail: _elemModal });

    return {
        show: _showModal,
        hide: _hideModal,
        destroy: function () {
            _elemModal.parentElement.removeChild(_elemModal),
                _elemModal.removeEventListener('click', _handlerCloseModal),
                _destroyed = true;
        },
        setContent: function (html) {
            _elemModal.querySelector('[data-modal="content"]').innerHTML = html;
        },
        setTitle: function (text) {
            _elemModal.querySelector('[data-modal="title"]').innerHTML = text;
        }
    }
};




function loadRequest(url) {

    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.responseType = "json";
    request.send();

    request.onload = function () {
        outputRequset(request.response);
    }
}

function outputRequset(request) {

    var obj = request;

    Object.keys(obj).forEach(function(key) {
        console.log(key, obj[key].userName, obj[key].message);
    });

}