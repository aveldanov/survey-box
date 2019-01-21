import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import _ from 'lodash';
import { Link } from 'react-router-dom';


const FIELDS = [
  {
    label: "Survey Title",
    name: "title"
  },
  {
    label: "Subject Line",
    name: "subject"
  },
  {
    label: "Email Body",
    name: "body"
  },
  {
    label: "Recipient List",
    name: "emails"
  }
];

class SurveyForm extends Component {
  renderFields() {
    return _.map(FIELDS, ({ label, name }) => {
      return <Field
        key={name}
        component={SurveyField}
        type="text"
        label={label}
        name={name}
      />
    })
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
          {this.renderFields()}
          <Link to="/surveys" className="light-blue darken-3 btn-flat left white-text">
            Cancel
            <i className="material-icons right">clear</i>
          </Link>

          <button
            type="submit"
            className="light-blue darken-3 btn-flat right white-text"
          >Next
          <i className="material-icons right">arrow_forward</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  _.each(FIELDS, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'Please provide a value'
    }
  });

  return errors;
}

export default reduxForm({
  form: 'surveyForm',
  validate: validate

})(SurveyForm);
