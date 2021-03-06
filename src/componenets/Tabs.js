import React from 'react';
import { connect } from 'react-redux';
import './Tabs.css';

class Tabs extends React.Component {

    onlyUnique = () => { 
        return [...new Set(this.props.purchases.map(pur => pur.phoneNumber))].length;
    }

    onlyOpen = () => {
        return this.props.purchases.map(i => {if(i.isOpen) return i}).length;
    }

    totalPurchases = () => {
        return [...new Set(this.props.purchases.map(pur => pur.id.txt))].length
    }

    calcRevenue = () => {
        if(this.props.purchases.length !== 0) {
            return this.props.purchases.reduce((a, c) => a+c.productPrice*c.productQty, 0);
        }
        return 0;
    }

    render = () => {
        return (
            <div>
                <div className="generalInfo">
                    <div className="infoTab">
                        <div className="infoTabInner">
                            <h2>{`₼ ${this.calcRevenue().toFixed(2)}`}</h2>
                            <p>Revenue</p>
                        </div>
                    </div>
                    <div className="infoTab">
                        <div className="infoTabInner">
                            <h2>{`${this.totalPurchases()}`}</h2>
                            <p>Total Purchases</p>
                        </div>
                    </div>
                    <div className="infoTab">
                        <div className="infoTabInner">
                            <h2>{`${this.onlyUnique() | `Loading`}`}</h2>
                            <p>Idv. Customers</p>
                        </div>
                    </div>
                    <div className="infoTab">
                        <div className="infoTabInner">
                            <h2>{this.onlyOpen()}</h2>
                            <p>Open Orders</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state) => {return {purchases: state.purchases}}, null)(Tabs);