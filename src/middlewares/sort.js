const sortingMiddleWare = store => next => action => {
    if (action.type === 'SORT_ARRAY' && localStorage.getItem('novawebPositions')) {
        let sortingArray = JSON.parse(localStorage.getItem('novawebPositions'));
        let projects = action.payload.serverlist;

        let arrSorted = sortingArray.reduce((res,el,i)=> res.concat(Array.from(projects).filter(elem=>elem.id==el)) ,[]);
        let concatArr = projects.filter(el => !arrSorted.includes(el));

        next({ ...action, payload: { serverlist: [...arrSorted, ...concatArr] } });
    } else if (action.type === 'DRAG_END') {
        let storage = store.getState().projects;
        let mas = storage.serverlist;
        let elemFrom = mas[storage.indexDrag];
        let elemTo = mas[storage.indexDragTo];
        mas[storage.indexDragTo] = elemFrom;
        mas[storage.indexDrag] = elemTo;
        localStorage.setItem('novawebPositions', JSON.stringify(mas.map((el, i) => el.id)));
        next({ ...action, payload: { serverlist: mas } });
    }
    else {
        next(action);
    }
}

export default sortingMiddleWare;
