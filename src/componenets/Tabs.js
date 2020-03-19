import React from 'react';
import './Tabs.css';

class Tabs extends React.Component {
    render = () => {
        return (
            <div>
                <div className="generalInfo">
                    <div className="infoTab">
                        <div className="infoTabInner">
                            <h2>123</h2>
                            <p>Revenue</p>
                        </div>
                    </div>
                    <div className="infoTab">
                        <div className="infoTabInner">
                            <h2>123</h2>
                            <p>Total Purchases</p>
                        </div>
                    </div>
                    <div className="infoTab">
                        <div className="infoTabInner">
                            <h2>123</h2>
                            <p>Individual Customers</p>
                        </div>
                    </div>
                    <div className="infoTab">
                        <div className="infoTabInner">
                            <h2>123</h2>
                            <p>Open Orders</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Tabs;