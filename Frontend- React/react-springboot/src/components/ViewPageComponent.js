import React, { Component } from 'react';
import {Jumbotron,Container}  from "react-bootstrap";

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
        const container={
            paddingLeft : '250px',
            paddingRight : '200px'
        };
        return (
            <div style={container}>
                <Jumbotron fluid>
                    <Container>
                        <h1>Welcome</h1>
                        <button className="btn btn-primary" onClick={this.goToLogin}>Login</button>
                    </Container>
                </Jumbotron>

            </div>
        );
    }
}

export default ViewPageComponent;