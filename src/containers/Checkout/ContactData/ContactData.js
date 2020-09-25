import React, { Component } from 'react';
import Btn from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spiner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementtype: 'input',
                elementconfig: {
                    type: 'text',
                    placeholder: 'Your Name',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementtype: 'input',
                elementconfig: {
                    type: 'email',
                    placeholder: 'Your Email',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementtype: 'input',
                elementconfig: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementtype: 'input',
                elementconfig: {
                    type: 'text',
                    placeholder: 'ZIP code',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementtype: 'select',
                elementconfig: {
                    options: [{
                        value: 'fastest',
                        displayValue: 'Fastest'
                    },
                    {
                        value: 'slow',
                        displayValue: 'slow'
                    }]
                },
                value: '',
                validation: {},
                valid: false,
            },
        },
        formIsValid: false,
        loading: false
    }

    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }


    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const orderForm = {};
        for (let inputIndentifire in this.state.orderForm) {
            orderForm[inputIndentifire] = this.state.orderForm[inputIndentifire].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.price,
            constactData: orderForm
        }
        axios.post('/orders.json', order)
            .then(res => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({ loading: false });
                console.log(err)
            })
    }
    inputChangedHandler = (event, inputIdentify) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        let updatedOrderElement = {
            ...updatedOrderForm[inputIdentify]
        }
        // console.log(updatedOrderElement.value);
        updatedOrderElement.value = event.target.value;
        updatedOrderElement.valid = this.checkValidity(updatedOrderElement.value, updatedOrderElement.validation)
        updatedOrderElement.touched = true;
        updatedOrderForm[inputIdentify] = updatedOrderElement;
        let formIsValid = true;
        for (let inputIdentify in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentify].valid && formIsValid;
        }
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid })
    }

    render() {
        let formElements = [];
        for (let key in this.state.orderForm) {
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            });
        };
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElements.map(formElement => (
                    <Input key={formElement.id}
                        elementtype={formElement.config.elementtype}
                        elementconfig={formElement.config.elementconfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Btn btnType="Success" disabled={!this.state.formIsValid}>Order</Btn>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h2> Enter your Contact Data</h2>
                {form}
            </div>
        );
    }
}

export default ContactData;