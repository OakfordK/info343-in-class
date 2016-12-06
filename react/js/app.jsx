/**
 * app.jsx
 * main entry point for our React application
 */
"use strict";

class NameForm extends React.Component {
    // Properties are static, should never change.
    // State is mutable data.
    constructor(props) {
        super(props);

        // Initialize starting state.
        this.state = {name : ""};
    }

    handleChange(event) {
        // Target refers to input element, value is the 
        // value attribute.
        this.setState({name : event.target.value});
        this.props.onChange(event.target.value);
    }

    // Inline anaonymous function that takes one parameter.
    // This is referring to the appropriate this thanks to
    // big arrow notation  =>. Would normally refer to 
    // global window
    render() {
        return (
            <form>
                
                <input type="text" 
                    className="form-control"
                    value={this.state.name}
                    onChange={event => this.handleChange(event)}/>
            </form>
        );
    }
}

class Hello extends React.Component {
    constructor(props) {
        super(props);
    }
    
    // React.Component requires this
    // Returns HTML markup to return
    render() {
        return (
            <h2>Hello {this.props.name} {this.props.title}</h2>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name : ""};
    }

    handleNameChange(name) {
        this.setState({name : name});
    }
    
    render () {
        return (
            <div>
                <NameForm onChange={name => this.handleNameChange(name)}> </NameForm>
                <Hello name={this.state.name}></Hello>
            </div>
        );
    }
}

// Render with following method. Interesting syntax
// involving new tag
ReactDOM.render(<App/>, document.getElementById("app"));