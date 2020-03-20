import React from 'react';
import validator from 'validate.js';
import axios from 'axios';
import Cookies from 'universal-cookie';
import {Redirect} from 'react-router-dom';
import './AddItem.css'


class AddItem extends React.Component {
    

    constructor(props) {
        super(props);
        const cookies = new Cookies();
        this.token = cookies.get("authtoken");
        this.state = {
            images: [],
            redirectAuth: cookies.get("authtoken") === undefined,
        }
    }

    addImageHandler = (e) => {
        e.persist();
        this.setState({images: Array.from(e.target.files)})
    }

    removeImage = (e) => {
        e.persist();
        const index = e.target.getAttribute("index");
        this.setState(state => {
            delete state.images[index]
            return {
                images: state.images
            }
        })
    }

    submitForm = async () => {
        const errors = validator(this.state, this.constraints);
        if(!errors) {
            const imageLinks = await this.uploadImages();
            if(imageLinks) {
                this.sendData(imageLinks)
            }
        }
        console.log(errors)
    }

    sendData = async (imageLinks) => {
        this.setState({log: "Submitting form"});
        try {
            await axios.post('http://localhost:3001/items', {
                title: this.state.title,
                description: this.state.description,
                images: imageLinks,
                thumb: imageLinks[this.state.thumbnail],
                category: this.state.category,
                price: this.state.price,
                quantity: this.state.quantity,
            }, {headers: {"Content-Type": "application/json", Authorization: `Bearer ${this.token}`}});

            this.setState({log: "Item Submission Succeded. Resetting form..."});

            setTimeout(() => {
                console.log("t")
                return (<Redirect to='/inventory/add' />)
            }, 3000) 

        } catch (e) {
            switch(e.response.status) {
                case 401:
                    this.setState({log: "Authentication failed. You are not supposed to be here"});
                    break;
                case 500:
                    this.setState({log: "Server issue. Everything was okay but server failed!"});
                    break;
                default:
                    this.setState({log: `Error: ${e.response.status}`})
                    break;
            }
        }
    }

    uploadImages = async () => {
        let formData = new FormData();
        for(const t of this.state.images) {
            formData.append('photos', t);
        }

        try {
            this.setState({log: "Image upload started"});
            const f = await axios.post('http://localhost:3001/images', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${this.token}`,
                }
            })
            this.setState({log: "Image upload finished"});
            return f.data;

        } catch(e) {

            switch(e.response.status) {
                case 401:
                    this.setState({log: "Authentication failed. You are not supposed to be here"});
                    break;
                case 400:
                    this.setState({log: "Wrong paramaters"});
                    break;
                case 500:
                    this.setState({log: "Server issue (Check file size and type)"});
                    break;
                default:
                    this.setState({log: `Error: ${e.response.status}`})
                    break;
            }
        }

    }

    constraints = {
        title: {
            presence: true,
            length: {
                minimum: 1,
                maximum: 100,
            }
        },
        thumbnail : {
            presence: true,
            type: "number",
            numericality: {
                greaterThanOrEqualTo: 0,
                strict: true,
            }
        },
        images: {
            presence: true,
            type: "array",
            length: {
                minimum: 1,
                maximum: 6,
            }
        },
        description: {
            presence: true,
            length: {
                minimum: 1,
                maximum: 200,
            }
        },
        price: {
            presence: true,
            numericality: {
                greaterThan: 0,
                strict: true,
            }
        },
        category: {
            presence: true,
            type: "string",
        },
        quantity: {
            presence: true,
            numericality: {
                onlyInteger: true,
                strict: true,
                greaterThan: 0,
            }
        }
    }

    render = () => {

        if(this.state.redirectAuth) {
            return (<Redirect to="/login" />)
        }

        return (
            <div className="itemForm">
                <div className="formRow">
                    <input type="text" onChange={(e) => {e.persist();this.setState({title: e.target.value})}} className="formInput" placeholder="Item Name"/>
                </div>
                <div className="formRow">
                    <textarea rows="5" onChange={(e) => {e.persist();this.setState({description: e.target.value})}} className="formInput" placeholder="Item descriptionription"></textarea>
                </div>
                <div className="formRow">
                    <input type='file' multiple onChange={this.addImageHandler}/>
                </div>
                <div className="formRow">
                    <div className="fileExplorer">
                        {
                            (() => {
                                return this.state.images.map((image, key) => {
                                    if(image !== null) {
                                        return (
                                            <div key={key} className="fileExplorerRow">
                                                <img className="fileExplorerImage" alt={image.name} src={URL.createObjectURL(image)} />
                                                <span>{image.name}</span>
                                                <label> <input type='radio' checked={this.state.thumbnail === key} onChange={() => {this.setState({thumbnail: key})}} /> Thumbnail </label>
                                                <button index={key} onClick={this.removeImage}>Action</button>
                                            </div>
                                        )                   
                                    }
                                    return <></>                
                                })
                            })()
                        }
                    </div>
                </div>
                <div className="formRow">
                    <div style={{display: 'grid', gridTemplateColumns: "1fr 1fr 1fr", gridGap: "30px"}}>
                        <input type="number" onChange={(e) => {e.persist();this.setState({quantity: e.target.value})}} min="1" placeholder="Quantity" className="formInput" />
                        <input type="text" onChange={(e) => {e.persist();this.setState({category: e.target.value})}} placeholder="Category" className="formInput" />
                        <input type="number" onChange={(e) => {e.persist();this.setState({price: e.target.value})}} step="0.01" placeholder="Price" className="formInput" />
                    </div>
                </div>
                <div className="formRow">
                    <div style={{width: "100px"}}>
                        <button onClick={this.submitForm} style={{cursor: 'pointer'}} className="formInput" >Submit</button>
                    </div>
                </div>
                <div className="logs">
                    {this.state.log}
                </div>
            </div>
        )
    }
}

export default AddItem;