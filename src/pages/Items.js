import React from 'react';
import { Link } from 'react-router-dom';
import Table from '../componenets/Table';
import './Items.css';

class Inventory extends React.Component {
    inventory = [
        {
            id: {
                txt: 'dsafasf',
                link: 'inventory/dsafasf'
            },
            productName: 'Some Product Title',
            category: 'sweats',
            quantity: 12,
            price: 20.00,
        },
        {
            id: {
                txt: 'dsafasf',
                link: 'inventory/dsafasf'
            },
            productName: 'Some Product Title',
            category: 'sweats',
            quantity: 12,
            price: 20.00,
        },
        {
            id: {
                txt: 'dsafasf',
                link: 'inventory/dsafasf'
            },
            productName: 'Some Product Title',
            category: 'sweats',
            quantity: 12,
            price: 20.00,
        }
    ]


    render = () => {
        return (
            <div>
                <span className="add-button"><Link to="/inventory/add">Add Item</Link></span>
                <Table  data={this.inventory} ths={['ID', 'Name', 'Category', 'Qty', 'Price']} lengths="1fr 2fr 1fr 1fr 1fr"/>
            </div>
        )
    }
}

export default Inventory;