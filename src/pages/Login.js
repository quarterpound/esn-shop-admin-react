import React from 'react';
import axios from 'axios';
import validator from 'validate.js';
import jwt_decode from 'jwt-decode';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AUTH } from '../c';
import actions from '../actions';
import './Login.css';

class Login extends React.Component {
    state = {}

    componentDidMount() {
        if(this.props.authtoken) {
            try {
                jwt_decode(this.props.authtoken);
                this.setState({redirect: true})
            } catch(e) {
                
            }
        }
    }

    submitForm = async (e) => {
        e.preventDefault();
        if(!validator(this.state, this.constraits)) {
            try {
                const t = await axios.post(AUTH, {
                    email: this.state.email,
                    pwd: this.state.pwd
                })
                this.setState({redirect: true})
                this.props.logIn(t.data);
            } catch(e) {
                this.setState({log: "Wrong username or password"})
            }
        } else {
            this.setState({log: "Wrong username or password"})
        }
    }

    constraits = {
        email: {
            presence: true,
            email: true,
        },
        pwd: {
            presence: true,
            length: {
              minimum: 6,
            }
        },
    }

    render() {
        if(this.state.redirect) {
            return <Redirect to="/" />
        }

        return (
            <div className="loginContainer">
                <h2 className="logo">ESN Shop Admin Login</h2>
                <div className="loginInner">
                    <div className="itemForm">
                        <div className="errors" >{this.state.log}</div>
                    </div>
                    <form>

                        <div className="itemForm">
                            <div className="formRow">
                                <input type="text" onChange={(e) => {e.persist();this.setState({email: e.target.value})}} className="formInput" placeholder="Email"/>
                            </div>
                            <div className="formRow">
                                <input type="password" onChange={(e) => {e.persist();this.setState({pwd: e.target.value})}} className="formInput" placeholder="Password"/>
                            </div>
                            <div className="formRow">
                                <div style={{width: "100px"}}>
                                    <button type="submit" onClick={this.submitForm} style={{cursor: 'pointer'}} className="formInput" >Login</button>
                                </div>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        )
    }
}

export default connect((state) => {return {authtoken: state.authtoken}}, actions)(Login);