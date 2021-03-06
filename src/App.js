import React from 'react';
import { connect } from 'react-redux';
import decoder from 'jwt-decode';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import actions from './actions';
import Users from './pages/Users';
import Tabs from './componenets/Tabs';
import NavBar from './componenets/NavBar';
import Purchases from './pages/Purchases';
import Purchase from './pages/Purchase';
import Item from './pages/Item';
import Inventory from './pages/Items';
import AddItem from './pages/AddItem';
import Login from './pages/Login';


class App extends React.Component {
	state = {}

	componentDidMount() {
		try {
			this.decoded = decoder(this.props.authtoken);
		} catch (e) {
			this.setState({redirect: true})
		}
	}

    render() {
		return (
			<div className="App">
				<Router>
					{
						(() => {
							if(!this.props.authtoken || this.state.redirect) {
								return <Redirect to="/login" />
							}
						})()
					}
					<Switch>
						<Route path="/login">
							<div className="pageContainer">
								<Login />
							</div>
						</Route>
						<Route path="/inventory/add">
							<NavBar />
							<div className="pageContainer">
								<div style={{width: "50%", margin: "auto"}}>
									<h2>Add Item</h2>
									<AddItem />
								</div>
							</div>
						</Route>
						<Route path="/inventory/:id">
							<NavBar />
							<div className="pageContainer">
								<Item />
							</div>
						</Route>
						<Route path="/inventory">
							<NavBar />
							<div className="pageContainer">
								<h2>Inventory</h2>
								<Tabs />
								<Inventory data={this.props.inventory} />
							</div>
						</Route>
						<Route path="/users">
							<NavBar />
							<div className="pageContainer">
								<h2>Users</h2>
								<Tabs />
								<Users	 />
							</div>
						</Route>
						<Route path="/purchases/:id">
							<NavBar />
							<div className="pageContainer" style={{width: "40%"}} >
								<Purchase />
							</div>
						</Route>
						<Route path="/purchases">
							<NavBar />
							<div className="pageContainer">
								<h2>Purchases</h2>
								<Tabs />
								<Purchases />
							</div>
						</Route>
						<Route path="/">
							<NavBar />
							<div className="pageContainer">
								<h2>Purchases</h2>
								<Tabs />
								<Purchases />
							</div>
						</Route>
					</Switch>
				</Router>
			</div>
		);
    }
}

export default connect(
	(state) => {return {inventory: state.inventory, purchases: state.purchases, authtoken: state.authtoken}},
	actions,
)(App);
