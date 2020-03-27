import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Table from '../componenets/Table';
import actions from '../actions';
import { USERS } from '../c';

class Users extends React.Component {
    state = {users: []};

    componentDidMount = () => {
        this.getUsers();
    }

    capitalize = (s) => {
		return s.charAt(0).toUpperCase() + s.slice(1, s.length);
	}	

    getUsers = async () => {
        try {
            const usersRaw = await axios.get(USERS, {headers:{Authorization: `Bearer ${this.props.authtoken}`}});
            this.setState({users: usersRaw.data.map(t => {return {id: {txt: t.id, link: `${USERS}/${t.id}`}, full: `${this.capitalize(t.first)} ${this.capitalize(t.last)}`, email: {txt: t.email, link: `mailto:${t.email}`}, type: t.type}})});
        } catch (e) {
            console.log(e);
        }
    }

    render = () => {
        return (
            <div>
                {
                    (() => {
                        if(this.state.users) {
                            return (
                                <Table data={this.state.users} disallow={[]} ths={['ID', 'Full name', 'Email', 'Type']} lengths="1fr 2fr 1fr 1fr" />
                            )
                        }
                    })()
                }
            </div>
        )
    }
}

export default connect((state) => {return {authtoken: state.authtoken}}, actions)(Users);