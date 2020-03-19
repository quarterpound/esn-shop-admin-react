import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Tabs from './componenets/Tabs';
import NavBar from './componenets/NavBar';
import Purchases from './pages/Purchases';
import Inventory from './pages/Items';
import AddItem from './pages/AddItem';


class App extends React.Component {
    render() {
		return (
			<div className="App">
				<Router>
					<NavBar />
					<div className="pageContainer">
						<Switch>
							<Route path="/purchases">
								<h2>Purchases</h2>
								<Tabs />
								<Purchases />
							</Route>
							<Route exact path="/inventory/add">
								<div style={{width: "50%", margin: "auto"}}>
									<h2>Add Item</h2>
									<AddItem />
								</div>
							</Route>
							<Route path="/inventory">
								<h2>Inventory</h2>
								<Tabs />
								<Inventory />
							</Route>
							<Route path="/users/add">
								{"Users adding page"}
							</Route>
							<Route path="/users">
								{"Users"}
							</Route>
						</Switch>
					</div>
				</Router>
			</div>
		);
    }
}

export default App;
