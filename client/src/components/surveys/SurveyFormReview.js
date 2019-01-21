//shows users their form filled

import React from 'react'
import { connect } from 'react-redux';
import formFields from './formFields';
import _ from 'lodash';
import * as actions from '../../actions/index';
import { withRouter } from 'react-router-dom';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {

  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label>
          {label}
        </label>
        <div>
          {formValues[name]}
        </div>
      </div>
    )
  })

  return (
    <div>
      <h5 style={{ marginBottom: "20px" }}>Please confirm your entries:</h5>
      <div style={{ marginBottom: "20px" }}>{reviewFields}</div>
      <button
        className="light-blue darken-3 btn-flat  white-text"
        onClick={onCancel}
      >
        Back
      </button>
      <button
        onClick={() => submitSurvey(formValues, history)}
        className="light-blue darken-3 btn-flat right white-text">Send Survey
      <i className="material-icons right">email</i>
      </button>
    </div>
  );
}

function mapStateToProps(state) {
  console.log(state.form.surveyForm.values)
  return {
    formValues: state.form.surveyForm.values
  }
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
