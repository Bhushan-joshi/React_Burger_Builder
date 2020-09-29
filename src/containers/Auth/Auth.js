import React, { Component } from 'react';
import { connect } from 'react-redux';

import Btn from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './Auth.module.css';
import Spinner from '../../components/UI/Spiner/Spinner'
import * as actionCreator from '../../store/actions/index';
import { Redirect } from 'react-router';

class Auth extends Component {
    state = {
        contact: {
            email: {
                elementtype: 'input',
                elementconfig: {
                    type: 'email',
                    placeholder: 'Your Email',
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementtype: 'input',
                elementconfig: {
                    type: 'password',
                    placeholder: 'password',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 7
                },
                valid: false,
                touched: false
            },
        },
        isSignup: true
    }
    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }
    switchSignMethod = () => {
        this.setState({ isSignup: !this.state.isSignup })
    }
    formSubmit = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.contact.email.value, this.state.contact.password.value, this.state.isSignup);
        this.props.history.push('/')
    }
    inputChangedHandler(event, inputName) {
        const updatedControls = {
            ...this.state.contact,
            [inputName]: {
                ...this.state.contact[inputName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.contact[inputName].validation),
                touched: true
            }
        }
        this.setState({ contact: updatedControls });
    }
    render() {
        let formElements = [];
        for (let key in this.state.contact) {
            formElements.push({
                id: key,
                config: this.state.contact[key]
            });
        };
        let inputs = (
            formElements.map(formElement => (
                <Input key={formElement.id}
                    elementtype={formElement.config.elementtype}
                    elementconfig={formElement.config.elementconfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)} />
            ))
        )
        if (this.props.loading) {
            inputs = <Spinner />
        }
        let errors = null;
        if (this.props.error) {
            errors = <p className={classes.Error}>{this.props.error.message}</p>
        }
        let redirect=null;
        if(this.props.token){
            redirect= <Redirect to="/"/>
        }
        return (
            <div className={classes.Auth}>
                {redirect}
                <h2 style={{ color: 'indigo' }}>{this.state.isSignup ? 'SIGN UP' : 'SIGN IN'}</h2>
                {errors}
                <form onSubmit={this.formSubmit}>
                    {inputs}
                    <Btn btnType="Success">{this.state.isSignup ? 'SIGN UP' : 'SIGN IN'} </Btn>
                </form>
                <Btn click={this.switchSignMethod} btnType="Danger">Switch to {this.state.isSignup ? 'SIGN IN' : 'SIGN UP'} </Btn>
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        token:state.auth.tokenID,
    }
}

const mapDipatchTOProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actionCreator.Auth(email, password, isSignup))
    }
}

export default connect(mapStateToProps, mapDipatchTOProps)(Auth);