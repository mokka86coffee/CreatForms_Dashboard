import React from 'react';
import { connect } from 'react-redux'


class ServerDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.timer = '';
    }

    componentDidMount() {
        this.props.dispatch({ type: 'GET_PROJECTS'});
        this.timer = setInterval(() => this.props.dispatch({ type: 'GET_PROJECTS' }), 20000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    editComment = (el) => this.props.dispatch({ type: 'EDIT_COMMENT', payload: { el } });
    dragStart = (index) => this.props.dispatch({ type: 'DRAG_START', payload: { index, serverlist: this.props.projects.serverlist } });
    dragEnter = (index) => this.props.dispatch({type: 'DRAG_ENTER', payload: {index}});
    dragEnd = () => this.props.dispatch({ type: 'DRAG_END'});

    render() {
        const { panelVisible, projects: { serverlist }} = this.props;
        return (
            <div className={panelVisible ? "dashboard" : "dashboard dashboard--hidden"}>
                <div className="dashboard__projects">
                    <h4 className="dashboard__projects__title">{serverlist.length ? 'Проекты' : 'Загрузка...'}</h4>
                    <div className="dashboard__projects__items">
                        <div className="wrap_hidescroll">
                            {
                                serverlist && serverlist.map((el,i) => (
                                    <div
                                        draggable="true" 
                                        key={el.id} 
                                        className="item"
                                        onClick={() => this.editComment(el)}
                                        onDragStart={() => this.dragStart(i)}
                                        onDragEnter={() => this.dragEnter(i)}
                                        onDragEnd={() => this.dragEnd(i)}
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
