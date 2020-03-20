import React from 'react';
import { Link } from 'react-router-dom';
import Table from '../componenets/Table';
import './Items.css';

class Inventory extends React.Component {
    state = {
        log: "Loading data...",
    }

    render = () => {
        return (
            <div>
                <span className="add-button"><Link to="/inventory/add">Add Item</Link></span>
                {
                    (() => {
                        if(this.props.data) {
                            return <Table  data={this.props.data} ths={['ID', 'Name', 'Category', 'Qty', 'Price']} lengths="1fr 2fr 1fr 1fr 1fr"/>
                        }
                        return <><br/><br/>{this.state.log}</>;
                    })()
                }
            </div>
        )
    }
}

export default Inventory;