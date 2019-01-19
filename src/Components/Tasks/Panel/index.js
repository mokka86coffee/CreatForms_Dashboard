import React from 'react';
import { connect } from 'react-redux';

class Panel extends React.PureComponent {

    state = {
        list: [
            {
                id: 'listElem1',
                title: 'текст',
                description: 'Добавить текстовое поле'
            },
            {
                id: 'listElem2',
                title: 'телефон',
                description: 'Добавить поле "телефон"'
            },
            {
                id: 'listElem3',
                title: 'email',
                description: 'Добавить поле "email"'
            },
            {
                id: 'listElem4',
                title: 'пароль',
                description: 'Добавить поле "пароль"'
            },
            {
                id: 'listElem5',
                title: 'текстовое поле',
                description: 'Добавить текстовое поле'
            },
            {
                id: 'listElem6',
                title: 'список',
                description: 'Добавить список'
            },
            {
                id: 'listElem7',
                title: 'радиокнопки',
                description: 'Добавить радиокнопки'
            },
            {
                id: 'listElem8',
                title: 'флажки',
                description: 'Добавить флажки'
            },
        ]
    }

    handleClick = (el) => {
        this.props.dispatch({ type: el.title });
    }

    render() {
        const { panelVisible, panelHide, newelem } = this.props;
        const { list } = this.state;
        return (
            <aside className={panelVisible ? "adminmenu" : "adminmenu adminmenu--hidden"} >
                <div className="adminmenu__controls">
                    <button type="button">Dashboard</button>
                    <button type="button">Формы</button>
                    <button className="btnclose" type="button" onClick={panelHide}>x</button>
                </div>
                <h2 className="adminmenu__title">Управление</h2>
                {list.map((el) =>
                    (
                        <div 
                            onClick={() => this.handleClick(el)} 
                            key={el.id} 
                            className={newelem.title == el.title ? "adminmenu__item adminmenu__item--editing" : "adminmenu__item"}>
                            <div className="adminmenu__icon"></div>
                            <div className="adminmenu__info">
                                <h4>{el.title}</h4>
                                <p>{el.description}</p>
                            </div>
                        </div>)
                )}
            </aside>
        )
    }
}

export default connect(store => ({ newelem: store.newelem}))(Panel);
