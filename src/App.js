import React from 'react';
import {connect} from 'react-redux';

//Components
import Panel from './Components/Tasks/Panel';
import FormDashboard from './Components/Tasks/Dashboard';
import ServerDashboard from './Components/Tasks/ServerDashboard';

class App extends React.PureComponent {

    state = {
        panelVisible: false,
        chosenElem: ''
    }

    panelShow = () => this.setState({ panelVisible: true });
    panelHide = () => this.setState({ panelVisible: false });

    chooseElem = (elem) => this.setState({ chosenElem: elem }); 

    render() {
        const { panelVisible, chosenElem } = this.state;
        const Dashboard = chosenElem == 'forms' 
            ? <FormDashboard panelVisible={panelVisible} /> 
            : <ServerDashboard panelVisible={panelVisible} />;
        return (
            <section className="wrap">
                <header className={!panelVisible ? "header" : "header header--hidden"}>
                    <img className="header__logo" src="img/logo.png" alt="Test"/>
                        <ul className="header__menu">
                        <li><a href="#" id="menu" onClick={this.panelShow}>Тестовые</a></li>
                            <li><a href="#" id="about">......</a></li>
                            <li><a href="#" id="date">......</a></li>
                            <li><a href="#" id="contacts">......</a></li>
                        </ul>
                </header>
                <Panel chooseElem={this.chooseElem} chosenElem={chosenElem} panelVisible={panelVisible} panelHide={this.panelHide} />
                {Dashboard}
            </section>
        )
    }
}

export default connect(store=>store)(App);