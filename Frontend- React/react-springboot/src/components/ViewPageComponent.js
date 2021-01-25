import React, { Component } from 'react';

class ViewPageComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
           
        }
        this.goToLogin = this.goToLogin.bind(this);
    }

    goToLogin(){
        this.props.history.push('/Login');
    }
    render() {
        return (
            <div>
                <button className="btn btn-primary" onClick={this.goToLogin}>Login</button>
            </div>
        );
    }
}

export default ViewPageComponent;