import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux'
import { ITEMS } from '../c';
import './Item.css';

class Item extends React.Component {
    state = {}

    componentDidMount = async () => {
        try {
            const f = await axios.get(`${ITEMS}/${this.props.id}`, {headers: {Authorization: `Bearer ${this.props.authtoken}`}})
            this.setState({item: f.data});
        } catch(e) {
            console.log(e);
        }
    }

    render() {
        return (
            <div>
                {
                    (() => {
                        if(this.state.item) {
                            return (
                                <>
                                    <h3>Product ID: {this.props.id}</h3>
                                    <p className="itemCAT">{moment(this.state.item.createdAt).format('MMMM Do YYYY, h:mm a')}</p>
                                    <h2>{this.state.item.title}</h2>
                                    {
                                      (() => {
                                        return this.state.item.description.split('\n').map((pt, k) => {
                                            return <p key={k}>{pt}</p>
                                        })
                                      })()
                                    }
                                    <ul>
                                        <li>PRICE: ₼ {this.state.item.price.toFixed(2)} </li>
                                        <li>QUANTITY: {this.state.item.quantity} </li>
                                    </ul>
                                </>
                            )
                        }
                    })()
                }
            </div>
        )
    }
}

function ItemWrapper(props) {
    const { id } = useParams();
    return <Item id={id} authtoken={props.authtoken} />
}

export default connect((state) => {return {authtoken: state.authtoken}}, null)(ItemWrapper);