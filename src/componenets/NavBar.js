import React from 'react';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { connect } from 'react-redux';
import I from './Icon';
import logout from '../assets/logout.svg';
import esnLogo from '../assets/esn.png';
import actions from '../actions';
import './NavBar.css';

class NavBar extends React.Component {
    state = {}

    logOut = () => {
        this.props.logOut();
        window.location.href="/login"
    }

    capitalize = (s) => {
		return s.charAt(0).toUpperCase() + s.slice(1, s.length);
	}	

    render = () => {
        let decoded;
        try {
            decoded = jwt_decode(this.props.authtoken);
        } catch(k) {

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
                            {(() => {if(decoded.type === "webmaster") return (<li><Link to="/users">Users</Link></li>)})()}
                        </ul>
                    </div>
                    <div style={{justifySelf: 'end'}}>
                        {
                            (() => {
                                if(decoded) {
                                    return `Logged in as ${this.capitalize(decoded.first)} ${this.capitalize(decoded.last)}`
                                }
                            })()
                        } 
                        <button onClick={this.logOut} style={{marginLeft: "5px", background: 'white', border: 'none', borderRadius: '2px', padding: "5px"}}> <I width={"15px"} src={logout} /> </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state) => {return {authtoken: state.authtoken}}, actions)(NavBar);