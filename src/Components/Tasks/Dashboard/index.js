import React from 'react';
import { connect } from 'react-redux';

import DashboardForm from './DashboardForm';

class FormDashboard extends React.PureComponent {

    state = {
    }

    handleRequired = () => this.props.dispatch({ type: 'required', payload: !this.props.newelem.required });

    handleType = e => this.props.dispatch({ type: e.target.options[e.target.selectedIndex].text.toLowerCase() });

     handleIdentificator = (e) => {
         let regexp = /[a-z0-9_]/gi;
         regexp.lastIndex = e.target.value.length - 1;
         regexp.test(e.target.value) ? this.props.dispatch({ type: 'id', payload: e.target.value }) : null;
     }
    handlePlaceholder = (e) => this.props.dispatch({ type: 'placeholder', payload: e.target.value });
    
    handleAddSubmit = () => this.props.dispatch({ type: 'ADD_ELEM', payload: this.props.newelem});
    handleCancelSubmit = () => this.props.dispatch({ type: 'CANCEL_ELEM'});

    addExtraField = () => this.props.dispatch({ type: 'ADD_LOCAL_FIELD' });
    editExtraField = (e, index) => this.props.dispatch({ type: 'EDIT_FIELD', payload: { index, value: e.target.value } });
    deleteExtraField = (index) => this.props.dispatch({ type: 'DELETE_FIELD', payload: {index} });

    render() {
        const { panelVisible, newelem } = this.props;
        let params;
        if ( newelem.params ) {
            params = newelem.params.map((elem, i) => (
                <div key={`${newelem.id}${i}`} className="item">
                    <label onClick={() => this.deleteExtraField(i)} htmlFor={`field_list${i}`}>{`Поле ${i+1}`}</label>
                    <input 
                        placeholder={elem}
                        onInput={e=>this.editExtraField(e,i)} 
                        type="text" 
                        name={`field_list${i}`} id={`field_list${i}`} />
                </div>
            ));
        } else {
            params = <div className="item">
                <label htmlFor="field_hint">Подсказка</label>
                <input value={newelem.placeholder} onChange={this.handlePlaceholder} type="text" name="field_hint" id="field_hint" />
            </div>;
        }
            

        return (
            <div className={panelVisible ? "dashboard" : "dashboard dashboard--hidden"}>
                <DashboardForm />

                <div className="dashboard__settings">
                    <h4 className="dashboard__settings__title">{newelem ? newelem.title : 'Элемент'}</h4>
                    <div className="dashboard__settings__items">
                        <div className="wrap_hidescroll">
                            <div className="item">
                                <label>Тип</label>
                                <select onChange={this.handleType} value={newelem.type} name="field_type" id="field_type">
                                    <option value="text">Текст</option>
                                    <option value="tel">Телефон</option>
                                    <option value="email">Email</option>
                                    <option value="password">Пароль</option>
                                    <option value="textarea">Текстовое поле</option>
                                    <option value="select">Список</option>
                                    <option value="radio">Радиокнопки</option>
                                    <option value="checkbox">Флажки</option>
                                </select>
                            </div>
                            <div className="item">
                                <label htmlFor="field_required">Обязательное</label>
                                <input onChange={this.handleRequired} checked={newelem.required} type="checkbox" name="field_required" id="field_required" />
                            </div>
                            <div className="item">
                                <label htmlFor="field_id">Идентификатор</label>
                                <input onChange={this.handleIdentificator} value={newelem.id} type="text" name="field_id" id="field_id" />
                            </div>
                            <hr />
                            {params}
                            <button 
                                style={newelem.params ? {} : {display: 'none'}}
                                className="item__btn--add"
                                onClick={this.addExtraField }
                            >+</button>
                        </div>
                        { /*wrap_hidescroll */}
                    </div>
                    {/*dashboard__settings__items*/}

                    <div className="dashboard__settings__controls">
                        <button onClick={this.handleAddSubmit} className="btn btn--finish">Добавить</button>
                        <button onClick={this.handleCancelSubmit} className="btn btn--cancel">Отмена</button>
                    </div>
                    {/*dashboard__settings__controls*/}
                </div>
                {/*dashboard__settings*/}
            </div>
        )
    }
}

export default connect(store => ({ newelem: store.newelem}))(FormDashboard);

