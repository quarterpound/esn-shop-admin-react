import React from 'react';
import { Link } from 'react-router-dom';
import esnLogo from '../assets/esn.png';
import './NavBar.css';

class NavBar extends React.Component {
    render() {
        return (
            <div className="navBarOuter">
                <div className="navBarInner">
                    <div>
                        <img style={{width: "30px"}} src={esnLogo}/>
                    </div>
                    <div>
                        Webshop Admin
                    </div>
                    <div>
                        <ul className="navList">
                            <li><Link to="/purchases">Purchases</Link></li>
                            <li><Link to="/inventory">Inventory</Link></li>
                            <li><Link to="/users">Users</Link></li>
                        </ul>
                    </div>
                    <div style={{justifySelf: 'end'}}>
                        Logged in as Ali Gasimzade
                    </div>
                </div>
            </div>
        )
    }
}

export default NavBar;