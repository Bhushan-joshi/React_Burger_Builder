import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorhandler from '../../HOC/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state={
        orders:[],
        loading:true,
    }
    componentDidMount(){
        axios.get('/orders.json').then((res=>{
            const featchOrders=[];
            for(let key in res.data){
                featchOrders.push({
                    ...res.data[key],
                    id:key
                });
            }
            this.setState({loading:false, orders:featchOrders})
        })).catch(err=>{
            console.log(err);
        })
    }
    render() {
        return (
            <React.Fragment>
              {this.state.orders.map(order=>(
                  <Order 
                  key={order.id}
                  ingredients={order.ingredients}
                  totalPrice={+order.totalPrice}/>
              ))}
            </React.Fragment>

        );
    }
}
export default withErrorhandler(Orders , axios);