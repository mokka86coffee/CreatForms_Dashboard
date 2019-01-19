import React from 'react';
import { connect } from 'react-redux';

import listform from './formlist';

function PanelForm({ formlist, newelem, elemToFormClick}) {
    return formlist.map((el) =>
        (
            <div
                onClick={() => elemToFormClick(el)}
                key={el.id}
                className={newelem.title == el.title ? "adminmenu__item adminmenu__item--editing" : "adminmenu__item"}>
                <div className="adminmenu__icon"></div>
                <div className="adminmenu__info">
                    <h4>{el.title}</h4>
                    <p>{el.description}</p>
                </div>
            </div>)
    )
};

function PanelServer(props) {
    const { elem, commentSubmit } = props;
    return (
            <div className="adminmenu__item adminmenu__item--editing">
                <div className="adminmenu__icon"></div>
                <div className="adminmenu__info">
                    <h4>{elem ? elem.title : 'Проект'}</h4>
                    <p><b>Комментарии</b></p>
                    <p>{elem ? elem.comment : 'Комментарии'}</p>
                <form
                    onSubmit={e => {e.preventDefault(); commentSubmit(e);}}
                >
                    <textarea name="apicomments" id="apicomments"></textarea>
                    <input type="hidden" value={elem.id}/>
                    <button type="submit">Отправить</button>
                </form>
                </div>
            </div>
    )
};

class Panel extends React.PureComponent {

    state = {
        formlist: listform,
        serverlist: []
    }

    elemToFormClick = (el) => this.props.dispatch({ type: el.title });
    commentSubmit = (e) => this.props.dispatch({ 
            type: 'SUBMIT_COMMENT', 
            payload: { 
                comment: e.target.elements[0].value ,
                id: e.target.elements[1].value
            } 
    });

    render() {
        const { panelVisible, panelHide, newelem, chosenElem, chooseElem } = this.props;
        const { formlist } = this.state;
        const list = chosenElem == 'forms' 
            ? <PanelForm formlist={formlist} newelem={newelem} elemToFormClick={this.elemToFormClick}/> 
            : <PanelServer elem={this.props.projects.template} commentSubmit={this.commentSubmit} />;
        return (
            <aside className={panelVisible ? "adminmenu" : "adminmenu adminmenu--hidden"} >
                <div className="adminmenu__controls">
                    <button onClick={() => chooseElem('server')} type="button">Dashboard</button>
                    <button onClick={() => chooseElem('forms')} type="button">Формы</button>
                    <button className="btnclose" type="button" onClick={panelHide}>x</button>
                </div>
                <h2 className="adminmenu__title">Управление</h2>
                {list}
            </aside>
        )
    }
}

export default connect(store => ({ newelem: store.newelem, projects: store.projects}))(Panel);

