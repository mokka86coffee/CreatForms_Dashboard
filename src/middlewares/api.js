const apiMiddleWare = store => next => action => {
        if (action.type === 'SUBMIT_COMMENT') {
                fetch(`https://novaweb.studio/dashboard/_api/projects/${action.payload.id}`,
                        {
                                method: "PATCH",
                                mode: "cors",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ comment: action.payload.comment })
                        })
                        .then(res => next(action))
                        .catch(err => console.log('PATCH returned err: ', err));
        } else if (action.type === 'GET_PROJECTS') {
                fetch('https://novaweb.studio/dashboard/_api/projects/?format=json', {
                        method: 'GET',
                        mode: 'cors',
                        headers: {
                                "Content-Type": "application/json"
                        }
                })
                        .then(r => r.json())
                        .then(r => store.dispatch({ type: 'SORT_ARRAY', payload: { serverlist: r } }))
                        .catch(e => console.log('API NovaWeb JSON responded with ', e));
        }
        
        else {
                next(action);
        }
}

export default apiMiddleWare;
