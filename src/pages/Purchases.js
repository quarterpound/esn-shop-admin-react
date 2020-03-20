import React from 'react';
import Table from '../componenets/Table';
import './Purchases.css';

class Purchases extends React.Component {

    state = {
        log: "Loading data...",
    }

    render = () => {
        return (
            <div>
                {               
                (() => {
                    if(this.props.data) {
                        return (<Table searchBy={['id', 'productId', 'productOwner', 'productName']}  data={this.props.data} ths={['ID', 'Product ID', 'Ordered By', 'Product Name', 'Qty', 'Date']} lengths="1fr 1fr 2fr 2fr 1fr 2fr"/>)
                    }

                    return (<><br /><br /> {this.state.log}</>)
                })()
                }
            </div>
        )
    }
}

export default Purchases;