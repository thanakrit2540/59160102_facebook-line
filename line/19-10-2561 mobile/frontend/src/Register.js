import React from "react";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import './App.css'
import axios from "axios";
import 'bulma/css/bulma.css';

class Register extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name: "",
            email: "",
            picture: "https://bulma.io/images/placeholders/96x96.png"

                }        
        this.responseFacebook = this.responseFacebook.bind(this)
    }
    responseFacebook(response){
        this.setState({
            name: response.name,
            email: response.email,
            picture: response.picture.data.url,
        })
       
        axios.post('https://6ba82ed3.ngrok.io/loginf', {
            name: response.name,
            email: response.email,
            picture: response.picture.data.url
        })
        .then(function (response){
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    render(){
        return ( 
            <div className="App">
            <br/>
                <FacebookLogin
                    appId='294155848093780'
                    fields="name,email,picture"
                    callback={this.responseFacebook}
                    render={(renderProps) => (
                        <a className= "button is-info" onClick={renderProps.onClick}>This is my custom FB button</a>
                    )}

                />
                <div>
                    <br/>
                    <figure>
                        <img src={this.state.picture} alt= "Not found" />
                    </figure>
                </div>
                <div>
                    <p>{this.state.name}</p>
                    <p>{this.state.email}</p>
                </div>
            </div>
        )
    }
}

export default Register