import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
  render() {
    // console.log(process.env.REACT_APP_STRIPE_KEY)
    return (
      //amount in US cents
      <StripeCheckout
        name="survey-box"
        description="$5 for 5 email credits"
        amount={500}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn light-blue lighten-1">Add Credit</button>

      </StripeCheckout>
    )
  }
}

export default connect(null, actions)(Payments);
