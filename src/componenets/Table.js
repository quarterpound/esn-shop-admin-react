import React from 'react';
import { Link } from 'react-router-dom';
import "./Table.css";

class Table extends React.Component {
    state = {
        search: ""
    }

    render() {
        return (
            <div className="tableDiv">
                <div className="tableDivInner">
                    <div className="searchBarHolder">
                        <input type="text" onChange={(val) => {this.setState({search: val.target.value})}} className="searchField" placeholder="Search Not Implemented" />
                    </div>
                    <div className="tableRow rowHeader" style={{gridTemplateColumns: this.props.lengths}}>
                        {
                            (() => {
                                return this.props.ths.map((th, key) => {
                                    return <div key={key}>{th}</div>
                                })
                            })()
                        }
                    </div>
                    {
                        (() => {
                            return this.props.data.map((row, key) => {
                                return (
                                    <div key={key} style={{gridTemplateColumns: this.props.lengths}} className="tableRow">
                                        {
                                            (() => {
                                                return Object.entries(row).map(([a, b], k) => {
                                                    if(typeof b === 'object') {
                                                        return (
                                                            <div key={k}><Link to={b.link}>{b.txt}</Link></div>
                                                        )
                                                    }

                                                    if(this.props.disallow && !this.props.disallow.includes(a)) {
                                                        return (
                                                            <div key={k}>{b}</div>
                                                        )
                                                    }

                                                    return null;
                                                })
                                            })()
                                        }
                                    </div>
                                )
                            })
                        })()
                    }
                </div>
            </div>
        )
    }
}

export default Table;