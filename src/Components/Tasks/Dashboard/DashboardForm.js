import React from 'react';
import { connect } from 'react-redux';

function ReactElem(elem, mEnter, mOut, mClick) {
    let b = React.createElement('b', {}, elem.id);
    let label = React.createElement('label', { htmlFor: elem.id, key: `${elem.id}` }, b);
    let input;
    switch (elem.type) {
        case 'text': case 'tel': case 'email': case 'password': case 'textarea': 
           input = React.createElement(
                elem.node, 
                {   type: elem.type, 
                    id: elem.id, 
                    name: elem.id, 
                    onMouseEnter: e => mEnter(e, elem),
                    onMouseOut: mOut,
                    onClick: mClick,
                    placeholder: elem.placeholder,
                    key: `${elem.id}    `
                }
                , null
            );
            return React.createElement(React.Fragment, {}, [label, input]);
        case 'checkbox': case 'radio':
            input = elem.params.map(
                (val, i) => {
                    let label = React.createElement('label', { htmlFor: `${elem.id}${i}` }, val);
                    return React.createElement('div', {key: `${elem.id}${i}`}, [label, React.createElement(
                        elem.node,
                        {
                            type: elem.type,
                            id: `${elem.id}${Date.now()+i}`,
                            name: elem.id,
                            onMouseEnter: e => mEnter(e, elem),
                            onMouseOut: mOut,
                            onClick: mClick,
                            value: val,
                        }
                        , null
                    )
                    ]);
                });
            return React.createElement(React.Fragment, {}, [label, ...input]);
        case 'select':
        let options = elem.params.map((val, i) => React.createElement('option', { value: val, key: `${elem.id}${Date.now()+i}` }, val));
        let select = React.createElement(elem.node,
            {
                type: elem.type,
                id: elem.id,
                name: elem.id,
                onMouseEnter: e => mEnter(e, elem),
                onMouseOut: mOut,
                onClick: mClick,
            }
            , [...options]);
            
        return React.createElement(React.Fragment, {}, [label, select]);
    }
}

class DashboardForm extends React.PureComponent {

    constructor (props) {
        super(props);
        this.hint = React.createRef();
        this.state = {
            hint: {
                name: '',
                type: '',
                required: ''
            }
        }
    }

    componentDidUpdate () {
        localStorage.setItem('managerform', JSON.stringify(this.props));
    }

    mouseEnterForHint = (e, el) => {
        this.hint.current.style.top = `${e.target.offsetTop + e.target.offsetHeight}px`;
        this.hint.current.style.left = `${e.target.offsetLeft + e.target.offsetWidth / 2}px`;
        this.hint.current.style.display = `block`;
        this.setState({hint: {
            name: el.id,
            type: el.type,
            required: el.required ? 'Да' : 'Нет',
        }})
    }
    mouseOutForHint = e => this.hint.current.style.display = `none`;
    mouseClickForHint = e => this.hint.current.style.display = `none`;
    mouseClickRemoveNode = index => {
        this.hint.current.style.display = `none`;
        this.props.dispatch({ type: 'REMOVE_FORM_NODE', payload: index});
    }
    mouseClickEditNode = (el,index) => this.props.dispatch({ type: 'EDIT_FORM_NODE', payload: {el, index}});

    mouseDragStart = (index) => {
        this.props.dispatch({type: 'DRAG_FORM_NODE', payload: {index}});
    }
    mouseDragEnd = (index) => {
        this.props.dispatch({type: 'DRAG_END_FORM_NODE', payload: {index}});
    }
    mouseonDragEnter = (index) => {
        this.props.dispatch({ type: 'DRAG_ENTER_FORM_NODE', payload: {index}});
    }
    mouseDragOver = (e) => {
        e.preventDefault();
    }

    

    render() {
        const { form } = this.props;
        const { hint } = this.state;
        return (
            <div className="dashboard__form">
                <form className="managerform">
                    {form.map((el,i)=>{
                        const node = ReactElem(el, this.mouseEnterForHint, this.mouseOutForHint, this.mouseClickForHint);

                        return (
                        <div 
                            onDoubleClick={()=>this.mouseClickEditNode(el, i)}
                            onContextMenu={()=>this.mouseClickRemoveNode(i)}
                            onDragStart={()=>this.mouseDragStart(i)}
                            onDragEnd={()=>this.mouseDragEnd(i)}
                            onDragOver={this.mouseDragOver}
                            onDragEnter={()=>this.mouseonDragEnter(i)}
                                
                                 
                            key={el.id} 
                            draggable="true" 
                            className="managerform__item"
                        >
                            {node}
                        </div>)
                    })}
                    <div ref={this.hint} className="managerform__hint">
                        <p>Имя: <b>{hint.name}</b></p>
                        <p>Тип: <b>{hint.type}</b></p>
                        <p>Обязательное: <b>{hint.required}</b></p>
                    </div>
                </form>
            </div>
        )
    }
}

export default connect(store => ({ form: store.form}))(DashboardForm);