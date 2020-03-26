import React from 'react';
import { connect } from 'react-redux';
import { ITEMS, PURCHASES } from '../c';
import actions from '../actions';
import axios from 'axios';
import moment from 'moment';
import Table from '../componenets/Table';
import './Purchases.css';

class Purchases extends React.Component {

    state = {
        log: "Loading data...",
    }
    
    componentDidMount = () => { 
        if(this.props.purchases.length === 0) {
            this.getPurchases();
        }
    }
    capitalize = (s) => {
		return s.charAt(0).toUpperCase() + s.slice(1, s.length);
	}	

    getPurchases = async () => {
		try {
            const f = await axios.get(PURCHASES, {headers: {Authorization: `Bearer ${this.props.authtoken}`}});
            let t = [];
            for (const a of f.data) {
                for (const b of a.items) {
                    const k = await axios.get(`${ITEMS}/${b.id}`, {headers: {Authorization: `Bearer ${this.props.authtoken}`}})
                    t.push({
                        id : {
                            txt: `${a.id}`,
                            link: `/purchases/${a.id}`
                        },
                        productId: {
                            txt: `${b.id}`,
                            link: `/inventory/${b.id}`
                        },
                        productOwner: `${this.capitalize(a.first)} ${this.capitalize(a.last)}`,
                        productName: k.data.title,
                        productQty: b.quantity,
                        productPrice: k.data.price,
                        productDate: moment(a.createdAt).format('MMMM Do YYYY, h:mm a')
                    })
                }
            }

			
			this.props.initPurchases(t)

        } catch (e) {
            
		}
	}

    render = () => {
        return (
            <div>
                {               
                (() => {
                    if(this.props.purchases) {
                        return (<Table data={this.props.purchases} disallow={["productPrice"]} ths={['ID', 'Product ID', 'Ordered By', 'Product Name', 'Qty', 'Date']} lengths="1fr 1fr 2fr 2fr 1fr 2fr"/>)
                    }

                    return (<><br /><br /> {this.state.log}</>)
                })()
                }
            </div>
        )
    }
}

export default connect((state) => {return {authtoken: state.authtoken, purchases: state.purchases}}, actions)(Purchases);