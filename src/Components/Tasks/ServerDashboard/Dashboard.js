import React from 'react';
import { connect } from 'react-redux'


class ServerDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.timer = '';
        this.touchChckTime={};
    }

    componentDidMount() {
        this.props.dispatch({ type: 'GET_PROJECTS'});
        this.timer = setInterval(() => this.props.dispatch({ type: 'GET_PROJECTS' }), 20000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    componentDidCatch(){
        console.log(arguments);
    }

    editComment = (el) => this.props.dispatch({ type: 'EDIT_COMMENT', payload: { el } });
    dragStart = (index) => this.props.dispatch({ type: 'DRAG_START', payload: { index } });
    dragEnter = (index) => this.props.dispatch({type: 'DRAG_ENTER', payload: {index}});
    dragEnd = () => this.props.dispatch({ type: 'DRAG_END'});

    touchStart = (e,index) => {
            const w = parseInt(getComputedStyle(e.target).width.replace('px','')) / 2;
            const h = parseInt(getComputedStyle(e.target).height.replace('px','')) / 2;
            const x = e.touches[0].pageX;
            const y = e.touches[0].pageY;
            
            this.touchChckTime = setTimeout(()=>{
                this.props.dispatch({ type: 'TOUCH_START', payload: { index, coords: {x: x-w, y: y-h } } });
        }, 300);
    }
    touchMove = (e) => {
        const { projects: { coords: { x, y} } }  = this.props;
        if(x&&y) {
            this.props.dispatch({ type: 'TOUCH_MOVE', payload: { coords: {x: e.touches[0].pageX-50, y: e.touches[0].pageY-50 } } });
        }
    }
    touchEnd = (e) => {
        clearTimeout(this.touchChckTime);
        const { projects: { coords: { x, y} } }  = this.props;
        if(x&&y) {
            let indexDragTo = document.elementsFromPoint(x,y).filter(el=>{
                console.log(el.drag);
                return el.dataset.drag;
            });
            document.elementsFromPoint(x,y).filter(el=>{
                console.log(el.drag);
                return el.dataset.drag;
            });
            console.log(x);
            console.log(y);
            console.log(indexDragTo);
            if (indexDragTo) {
                indexDragTo = indexDragTo[0].dataset.drag;
                this.props.dispatch({ type: 'TOUCH_END', payload: { indexDragTo } });
            }
        }
    }

    render() {
        const { panelVisible, projects: { serverlist, error, indexDrag: iD, indexDragTo: iDt, coords: {x,y} } } = this.props;
        console.log(this.props);
        return (
            <div className={panelVisible ? "dashboard" : "dashboard dashboard--hidden"}>
                <div className="dashboard__projects">
                    <h4 className="dashboard__projects__title">{serverlist.length ? 'Проекты' : 'Загрузка...'}</h4>
                    {error ? error.map(err=><p className="dashboard__projects__error" key={err.message.slice(0,4)}><em>Ошибка - {err.message}</em><br />Просто нужно подождать</p>) : null}
                    <div className="dashboard__projects__items">
                        <div className="wrap_hidescroll" onScroll={e=>e.preventDefault()}>
                            {
                                serverlist && serverlist.map((el,i) => (
                                    <div
                                        draggable="true" 
                                        key={el.id} 
                                        className={i==iD ? "item item--dragged" : i==iDt ? "item item--dragto" : "item"}
                                        onClick={() => this.editComment(el)}
                                        onDragStart={() => this.dragStart(i)}
                                        onDragEnter={() => this.dragEnter(i)}
                                        onDragEnd={() => this.dragEnd(i)}
                                        onTouchStart={e=>this.touchStart(e,i)}
                                        onTouchMove={e=>this.touchMove(e)}
                                        onTouchEnd={e=>this.touchEnd(e)}
                                        data-drag={i}
                                        style={iD==i ? {
                                            position: 'fixed',
                                            top: y,
                                            left: x,
                                            width: '36vw'
                                        }: {}}
                                    >
                                        <h5 className="item__title">{el.title}</h5>
                                        <p className="item__type"><em>Тип</em>{el.type}</p>
                                        <p className="item__type"><em>Результат</em>{el.result.toString()}</p>
                                        <div className="item__comments">
                                            <div className="wraphidescroll">
                                                <p>{el.comment}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        { /*wrap_hidescroll */}
                    </div>
                    {/*dashboard__projects__items*/}
                </div>
                {/*dashboard__projects*/}
            </div>
        )}
}

export default connect(store => ({ projects: store.projects }))(ServerDashboard);
