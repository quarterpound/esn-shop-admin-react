import React from 'react';
import Table from '../componenets/Table';
import './Purchases.css';

class Purchases extends React.Component {
    purchases = [
        {
            id: {
                txt: 'fgrfekjf',
                link: 'purchases/fgrfekjf'
            },
            productId: 'asaefas',
            productOwner: 'Full Name',
            productName: 'Some Name',
            productQty: 24,
            productDate: '13 March, 2018'
        },
        {
            id: {
                txt: 'fgrfekjf',
                link: 'purchases/fgrfekjf'
            },
            productId: 'asaefas',
            productOwner: 'Full Name',
            productName: 'Some Name',
            productQty: 24,
            productDate: '13 March, 2018'
        },
        {
            id: {
                txt: 'fgrfekjf',
                link: 'purchases/fgrfekjf'
            },
            productId: 'asaefas',
            productOwner: 'Full Name',
            productName: 'Some Name',
            productQty: 24,
            productDate: '13 March, 2018'
        }
    ]

    render = () => {
        return (
            <div>
                <Table searchBy={['id', 'productId', 'productOwner', 'productName']}  data={this.purchases} ths={['ID', 'Product ID', 'Ordered By', 'Product Name', 'Qty', 'Date']} lengths="1fr 1fr 2fr 2fr 1fr 2fr"/>
            </div>
        )
    }
}

export default Purchases;