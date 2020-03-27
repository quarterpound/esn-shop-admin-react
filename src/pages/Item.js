import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux'
import { ITEMS, IMAGES } from '../c';
import './Item.css';

class Item extends React.Component {
    state = {}

    componentDidMount = () => {
        this.getItem();
    }

    getItem = async () => {
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
                                    <div style={{border: "1px solid black"}} className="bordered">
                                        <div className="detailRow">
                                            <div style={{borderRight: '1px solid black', fontWeight: 'bold', textAlign: 'center'}}>
                                                Item ID:
                                           </div>
                                            <div style={{textAlign: 'center'}} >
                                                {this.props.id}
                                            </div>
                                        </div>
                                        <div className="detailRow">
                                            <div style={{borderRight: '1px solid black', fontWeight: 'bold', textAlign: 'center'}}>
                                                Item Name:
                                           </div>
                                            <div style={{textAlign: 'center'}} >
                                                {this.state.item.title}
                                            </div>
                                        </div>
                                        <div className="detailRow">
                                            <div style={{borderRight: '1px solid black', fontWeight: 'bold', textAlign: 'center'}}>
                                                Quantity:
                                           </div>
                                            <div style={{textAlign: 'center'}} >
                                                {this.state.item.quantity}
                                            </div>
                                        </div>
                                        <div className="detailRow">
                                            <div style={{borderRight: '1px solid black', fontWeight: 'bold', textAlign: 'center'}}>
                                                Category:
                                           </div>
                                            <div style={{textAlign: 'center'}} >
                                                {this.state.item.category}
                                            </div>
                                        </div>
                                        <div className="detailRow">
                                            <div style={{borderRight: '1px solid black', fontWeight: 'bold', textAlign: 'center'}}>
                                                Price:
                                           </div>
                                            <div style={{textAlign: 'center'}} >
                                                {`₼ ${this.state.item.price}`}
                                            </div>
                                        </div>
                                        <div className="detailRow">
                                            <div style={{borderRight: '1px solid black', fontWeight: 'bold', textAlign: 'center'}}>
                                                Item Thumbnail:
                                           </div>
                                            <div style={{textAlign: 'center'}} >
                                                <a target="_blank" href={`${IMAGES}/${this.state.item.thumb}`}>{this.state.item.thumb}</a>
                                            </div>
                                        </div>
                                        <div className="detailRow" style={{gridTemplateColumns: "1fr"}}>
                                            <div style={{fontWeight: 'bold', textAlign: 'center'}}>
                                                Images
                                           </div>
                                        </div>
                                        {
                                            (() => {
                                                return this.state.item.images.map((i, key) => {
                                                    return (
                                                        <div key={key} className="detailRow" style={{gridTemplateColumns: "2fr 1fr"}}>
                                                            <div style={{borderRight: '1px solid black', textAlign: 'center'}}>
                                                                <a target="_blank" href={`${IMAGES}/${i}`}>{i}</a>
                                                            </div>
                                                            <span style={{textAlign: 'center'}} >Size</span>
                                                        </div>
                                                    )
                                                })
                                            })()
                                        }
                                        <div className="detailRow" style={{gridTemplateColumns: "1fr"}}>
                                            <div style={{fontWeight: 'bold', textAlign: 'center'}}>
                                                Description
                                            </div>
                                        </div>
                                        <div className="detailRow" style={{gridTemplateColumns: "1fr"}}>
                                            <div>
                                                {
                                                    (() => {
                                                        return this.state.item.description.split("\n").map((pk, k) => {
                                                            return <p key={k} >{pk}</p>
                                                        })
                                                    })()
                                                }
                                            </div>
                                        </div>
                                    </div>
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