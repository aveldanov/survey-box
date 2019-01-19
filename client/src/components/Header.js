import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {

  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li><a href="/auth/google">Login with Google</a></li>
        );
      default:
        return [
          <li key="4" >Hello {this.props.auth.firstName} !</li >,
          <li key="2" style={{ margin: '0 10px' }}>Credits:{this.props.auth.credits}</li>,

          <li key="1" ><Payments /></li >,

          <li key="3" style={{ margin: '0 10px' }}><a href="/api/logout">Logout</a></li>
        ];
    }
  }


  render() {
    //console.log(this.props);

    return (
      <nav>
        <div className="nav-wrapper light-blue darken-3">
          <Link to={this.props.auth ? '/surveys' : '/'} className="left brand-logo ">
            survey-box
        </Link>

          <ul className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    )
  }
}


function mapStateToProps({ auth }) {
  return {
    auth: auth
  }
}

export default connect(mapStateToProps)(Header);