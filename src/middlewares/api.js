const apiMiddleWare = store => next => action => {
        if (action.type === 'SUBMIT_COMMENT') {
                try {
                        if (!!navigator.userAgent.match(/Trident.*rv\:11\./)) { //if IE
        
                                        let xhr = new XMLHttpRequest();
                                        var body = JSON.stringify({ comment: action.payload.comment });
                                      
                                        xhr.open('PATCH', `https://novaweb.studio/dashboard/_api/projects/${action.payload.id}`, true);
                                        xhr.setRequestHeader('Content-Type', 'application/json');
                                        
                                        xhr.onload = function() {
                                        }
                                        xhr.onreadystatechange = function() {
                                        }

                                        xhr.onerror = function() {
                                        }
                                        xhr.send(body);
                                        next(action);
                        }
                         else {
        
                                fetch(`https://novaweb.studio/dashboard/_api/projects/${action.payload.id}`,
                                        {
                                                method: "PATCH",
                                                mode: "cors",
                                                headers: { "Content-Type": "application/json" },
                                                body: JSON.stringify({ comment: action.payload.comment })
                                        })
                                        .then(res => next(action))
                                        .catch(e => store.dispatch({ type: 'FETCH_ERROR', payload: { error: Array.of(e) } }));
                        }
                }
                catch (err) {
                        store.dispatch({ type: 'FETCH_ERROR', payload: { error: Array.of(err) } })
                }

        } else if (action.type === 'GET_PROJECTS') {
                (async function (){
                        try {
                         if (!!navigator.userAgent.match(/Trident.*rv\:11\./)) { //if IE

                                // 1. Создаём новый объект XMLHttpRequest
                                let xhr = new XMLHttpRequest();

                                // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
                                xhr.open('GET', 'https://novaweb.studio/dashboard/_api/projects/?format=json', false);

                                // 3. Отсылаем запрос
                                xhr.send();

                                // 4. Если код ответа сервера не 200, то это ошибка
                                if (xhr.status != 200) {
                                // обработать ошибку
                                store.dispatch({ type: 'FETCH_ERROR', payload: { error: Array.of(`${xhr.status} :  ${xhr.statusText}`) } })
                                // пример вывода: 404: Not Found
                                
                                } else {
                                // вывести результат
                                store.dispatch({ type: 'SORT_ARRAY', payload: { serverlist: JSON.parse(xhr.responseText) } }); // responseText -- текст ответа.
                                }
                          } 
                          else {
                                let apiFetch = await fetch('https://novaweb.studio/dashboard/_api/projects/?format=json', {
                                method: 'GET',
                                mode: 'cors',
                                headers: {
                                                "Content-Type": "application/json"
                                        }
                                })
                                .then(r => r.json())
                                .then(r => store.dispatch({ type: 'SORT_ARRAY', payload: { serverlist: r } }))
                                .catch(e => store.dispatch({ type: 'FETCH_ERROR', payload: { error: Array.of(e) } }));
                         }
                        } catch (err) {
                                store.dispatch({ type: 'FETCH_ERROR', payload: { error: Array.of(err) } })
                        }
                         
                }()); //sync try/catch
        }
        
        else {
                next(action);
        }
}

export default apiMiddleWare;
