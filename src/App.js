import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Cookies from 'universal-cookie';
import Decoder from 'jwt-decode';
import Tabs from './componenets/Tabs';
import NavBar from './componenets/NavBar';
import Purchases from './pages/Purchases';
import Inventory from './pages/Items';
import AddItem from './pages/AddItem';
import Login from './pages/Login';


class App extends React.Component {
	state = {}
	constructor(props) {
		super(props);
		const cookie = new Cookies();
		this.token = cookie.get("authtoken");
		if(this.token) {
			this.decoded = Decoder(this.token);
		}
	}
	
	capitalize = (s) => {
		return s.charAt(0).toUpperCase() + s.slice(1, s.length);
	}

	componentDidMount = () => {
		if(this.token) {
			this.getPurchases();
			this.getItems();
		}
	}

	calcRevenue = async () => {
		let s = 0 

		for (const a of this.state.rawPurchases) {
			for (const b of a.items) {
				const k = await axios.get(`http://localhost:3001/items/${b.id}`)
				s += b.quantity * k.data.price
			}
		}

		this.setState({revenue: s})
	}

	getPurchases = async () => {
		try {
            const f = await axios.get("http://localhost:3001/purchases", {headers: {Authorization: `Bearer ${this.token}`}});
            let t = [];
			this.setState({rawPurchases: f.data, totalPurchases: f.data.length});
            for (const a of f.data) {
                for (const b of a.items) {
                    const k = await axios.get(`http://localhost:3001/items/${b.id}`)
                    t.push({
                        id : {
                            txt: `${a.id}`,
                            link: `/purchases/${a.id}`
                        },
                        productId: {
                            txt: `${b.id}`,
                            link: `/inventory/${b.id}`
                        },
                        productOwner: `${this.capitalize(a.first)} ${this.capitalize(a.first)}`,
                        productName: k.data.title,
                        productQty: b.quantity,
                        productDate: moment().format('MMMM Do YYYY, h:mm a')
                    })
                }
            }

            this.setState({purchases: t})

        } catch (e) {
            console.log(e)
		}

		this.calcRevenue();
		this.getIndividuals();
		this.getOpenPurchases();
	}

	getItems = async () => {		
		const f = await axios.get("http://localhost:3001/items");
        const k = f.data.map(t => {
            return {
                id: {
                    txt: t.id,
                    link: `/inventory/${t.id}`
                },
                name: t.title,
                category: t.category,
                quantity: t.quantity,
                price: t.price
            }
        })
        this.setState({inventory: k})
	}

	getIndividuals = async () => {
		let s = []

		for (const a of this.state.rawPurchases) {
			if(!s.includes(a.phoneNumber)) s.push(a.phoneNumber)
		}

		this.setState({individuals: s.length})
	}

	getOpenPurchases = async () => {
		this.setState({open: this.state.rawPurchases.map(t => {return t.isOpen}).length})
	}

	

    render() {
		const tabData = {
			revenue: this.state.revenue,
			totalPurchases: this.state.totalPurchases, 
			individuals: this.state.individuals,
			open: this.state.open
		}

		let userName;
		if(this.token) {
			userName = `${this.capitalize(this.decoded.first)} ${this.capitalize(this.decoded.last)}`;
		}

		return (
			<div className="App">
				<Router>
					{
						(() => {
							const cookie = new Cookies();
							if(!cookie.get("authtoken")) {
								return (<Redirect to="/login" />)
							} 
						})()
					}

					<Switch>
						<Route exact path="/login">
							<div className="pageContainer">
								<Login />
							</div>
						</Route>
						<Route exact path="/inventory/add">
							<NavBar name={userName} />
							<div className="pageContainer">
								<div style={{width: "50%", margin: "auto"}}>
									<h2>Add Item</h2>
									<AddItem />
								</div>
							</div>
						</Route>
						<Route path="/inventory">
							<NavBar name={userName} />
							<div className="pageContainer">
								<h2>Inventory</h2>
								<Tabs data={tabData} />
								<Inventory data={this.state.inventory} />
							</div>
						</Route>
						<Route path="/users/add">
							{"Users adding page"}
						</Route>
						<Route path="/users">
							{"Users"}
						</Route>
						<Route path="/">
							<NavBar name={userName} />
							<div className="pageContainer" >
								<h2>Purchases</h2>
								<Tabs data={tabData} />
								<Purchases data={this.state.purchases} />
							</div>
						</Route>
					</Switch>
				</Router>
			</div>
		);
    }
}

export default App;
