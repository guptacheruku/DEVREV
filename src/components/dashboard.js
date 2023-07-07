import React, { Component } from 'react';
import Nav1 from './nav1';
import '../CSS/dashboard.css'

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    const user = sessionStorage.getItem('user');
    this.setState({ user: JSON.parse(user) });
  }

  render() {
    const { user } = this.state;
    return (
        <div><Nav1 />
        <div className="dashboard-container">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-user-info">
          <span>User name:</span> {user.name}
        </p>
        <p className="dashboard-user-info">
          <span>Email:</span> {user.email}
        </p>
      </div>
      </div>
    );
  }
}
