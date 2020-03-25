import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux'
import { PURCHASES, ITEMS } from '../c';
import './Purchase.css';

class Purchase extends React.Component {
    state = {}

    componentDidMount = async () => {
        try {
            const f = await axios.get(`${PURCHASES}/${this.props.id}`, {headers: {Authorization: `Bearer ${this.props.authtoken}`}})
            let k = [];
            for(const l of f.data.items) {
                let dr = await axios.get(`${ITEMS}/${l.id}`);
                k.push({id: l.id, title: dr.data.title, qty: l.quantity, price: dr.data.price * l.quantity});
            }
            f.data.items = k; 
            this.setState({purchase: f.data});
        } catch(e) {
            console.log(e);
        }
    }

    closeOrder = async () => {
        console.log(`${PURCHASES}/${this.props.id}/close`);
        try {
            let k = await axios.put(`${PURCHASES}/${this.props.id}/close`, {}, {headers: {"Content-Type": "application/json", Authorization: `Bearer ${this.props.authtoken}`}, timeout: 10000});
            console.log(k)
            window.location.href = `${this.props.id}`;
        } catch(e) {
            console.log(e);
            this.setState({errors: `An error occured: ${e.response.status}`})
        }
    }

    render() {
        return (
            <div>
                {
                    (() => {
                        if(this.state.purchase) {
                            return (
                                <>
                                <div style={{border: "1px solid black"}} className="bordered">
                                    <div className="detailRow">
                                        <div style={{borderRight: '1px solid black', fontWeight: 'bold', textAlign: 'center'}}>
                                            Purchase ID:
                                        </div>
                                        <div style={{textAlign: 'center'}} >
                                            {this.props.id}
                                        </div>
                                    </div>
                                    <div className="detailRow">
                                        <div style={{borderRight: '1px solid black', fontWeight: 'bold', textAlign: 'center'}}>
                                            Created at:
                                        </div>
                                        <div style={{textAlign: 'center'}}>
                                            {moment(this.state.purchase.createdAt).format('MMMM Do YYYY, h:mm a')}
                                        </div>
                                    </div>
                                    <div className="detailRow">
                                        <div style={{borderRight: '1px solid black', fontWeight: 'bold', textAlign: 'center'}}>
                                            Ordered By:
                                        </div>
                                        <div style={{textAlign: 'center'}}>
                                            {`${this.state.purchase.first} ${this.state.purchase.last}`}
                                        </div>
                                    </div>
                                    <div className="detailRow">
                                        <div style={{borderRight: '1px solid black', fontWeight: 'bold', textAlign: 'center'}}>
                                            Email:
                                        </div>
                                        <div style={{textAlign: 'center'}}>
                                            <a href={`mailto:${this.state.purchase.email}`} >{this.state.purchase.email}</a>
                                        </div>
                                    </div>
                                    <div className="detailRow">
                                        <div style={{borderRight: '1px solid black', fontWeight: 'bold', textAlign: 'center'}}>
                                            Phone Number:
                                        </div>
                                        <div style={{textAlign: 'center'}}>
                                            <a href={`tel:${this.state.purchase.phoneNumber}`} >{this.state.purchase.phoneNumber}</a>
                                        </div>
                                    </div>
                                    <div className="detailRow">
                                        <div style={{borderRight: '1px solid black', fontWeight: 'bold', textAlign: 'center'}}>
                                            IP Address:
                                        </div>
                                        <div style={{textAlign: 'center'}}>
                                            <a href={`https://whatismyipaddress.com/ip/${this.state.purchase.ip}`} >{this.state.purchase.ip}</a>
                                        </div>
                                    </div>
                                    <div className="detailRow3">
                                        <div style={{borderRight: '1px solid black', fontWeight: 'bold', textAlign: 'center'}}>
                                            ID
                                        </div>
                                        <div style={{borderRight: '1px solid black', fontWeight: 'bold', textAlign: 'center'}}>
                                            Title
                                        </div>
                                        <div style={{fontWeight: 'bold', textAlign: 'center'}}>
                                            Quantity
                                        </div>
                                    </div>
                                    {
                                        (() => {
                                            return this.state.purchase.items.map((i, k) => {
                                                return (
                                                    <div key={k} className="detailRow3">
                                                        <div style={{borderRight: '1px solid black', textAlign: 'center'}}>
                                                            {i.id}
                                                        </div>
                                                        <div style={{borderRight: '1px solid black', textAlign: 'center'}}>
                                                            {i.title}
                                                        </div>
                                                        <div style={{textAlign: 'center'}}>
                                                            {i.qty}
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        })()
                                    }
                                    <div className="detailRow3">
                                        <div style={{fontWeight: 'bold', textAlign: 'center'}}>
                                            
                                        </div>
                                        <div style={{borderRight: '1px solid black', fontWeight: 'bold', textAlign: 'center'}}>
                                            
                                        </div>
                                        <div style={{fontWeight: 'bold', textAlign: 'center'}}>
                                            Total: <span style={{fontWeight: 400}}>₼ {this.state.purchase.items.reduce((a, c) => a + c.price, 0)}</span>
                                        </div>
                                    </div>
                                    <div className="detailRow1" style={{textAlign: 'center', fontWeight: 'bold'}}>
                                        Details
                                    </div>
                                    <div className="detailRow" style={{borderBottom: 'none'}}>
                                        <div style={{textAlign: 'center', fontWeight: 'bold', borderRight: '1px solid black'}}>
                                            Status:
                                        </div>
                                        <div style={{textAlign: 'center'}}>
                                            {this.state.purchase.isOpen ? 'Open' : 'Closed'}
                                        </div>
                                    </div>
                                </div>
                                {
                                    (() => {
                                        if(this.state.purchase.isOpen) {
                                            return <button onClick={this.closeOrder}>Close</button>
                                        }
                                    })()
                                }
                                {
                                    (() => {
                                        if(this.state.errors) {
                                            return <div>{this.state.errors}</div>
                                        }
                                    })()
                                }
                                </>
                            )
                        }
                    })()
                }
            </div>
        )
    }
}

function PurchaseWrapper(props) {
    const { id } = useParams();
    return <Purchase id={id} authtoken={props.authtoken} />
}

export default connect((state) => {return {authtoken: state.authtoken}}, null)(PurchaseWrapper);