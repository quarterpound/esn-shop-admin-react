import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import actions from '../actions';
import Table from '../componenets/Table';
import './Items.css';

class Items extends React.Component {
    state = {
        log: "Loading data...",
    }

    componentDidMount() {
        if(this.props.inventory.length === 0) {
            console.log(this.props.authtoken)
            this.getItems();
        }
    }

	getItems = async () => {		
		const f = await axios.get("http://localhost:3001/items", {headers: {Authorization: `Bearer ${this.props.authtoken}`}});
        const k = f.data.map(t => {
            return {
                id: {
                    txt: t.id,
                    link: `/inventory/${t.id}`
                },
                name: t.title,
                category: t.category,
                quantity: t.quantity,
                price: t.price
            }
        })
        this.props.initInventory(k)
	}

    render = () => {
        return (
            <div>
                <span className="add-button"><Link to="/inventory/add">Add Item</Link></span>
                {
                    (() => {
                        if(this.props.data) {
                            return <Table disallow={[]} data={this.props.inventory} ths={['ID', 'Name', 'Category', 'Qty', 'Price']} lengths="1fr 2fr 1fr 1fr 1fr"/>
                        }
                        return <><br/><br/>{this.state.log}</>;
                    })()
                }
            </div>
        )
    }
}

export default connect((state) => {return {inventory: state.inventory, authtoken: state.authtoken}}, actions)(Items);