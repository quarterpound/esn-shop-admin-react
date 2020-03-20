import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import esnLogo from '../assets/esn.png';
import Cookies from 'universal-cookie';
import './NavBar.css';

class NavBar extends React.Component {
    state = {}

    logOut = () => {
        new Cookies().remove("authtoken")
        this.setState({redirect: true})
    }

    render = () => {
        if(this.state.redirect) {
            return (<Redirect to="/login" />)
        }

        return (
            <div className="navBarOuter">
                <div className="navBarInner">
                    <div>
                        <img style={{width: "30px"}} alt="ESN Logo" src={esnLogo}/>
                    </div>
                    <div>
                        Webshop Admin
                    </div>
                    <div>
                        <ul className="navList">
                            <li><Link to="/purchases">Purchases</Link></li>
                            <li><Link to="/inventory">Inventory</Link></li>
                            {(() => {if(this.props.name === "Ali Gasimzade") return (<li><Link to="/users">Users</Link></li>)})()}
                        </ul>
                    </div>
                    <div style={{justifySelf: 'end'}}>
                        {`Logged in as ${this.props.name}`} 
                        <button onClick={this.logOut} style={{marginLeft: "5px"}}>Log out</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default NavBar;