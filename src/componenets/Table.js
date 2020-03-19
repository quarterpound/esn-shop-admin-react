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
                                                return Object.values(row).map((t, k) => {
                                                    if(typeof t === 'object') {
                                                        return (
                                                            <div key={k}><Link to={t.link}>{t.txt}</Link></div>
                                                        )
                                                    }

                                                    return (
                                                        <div key={k}>{t}</div>
                                                    )
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