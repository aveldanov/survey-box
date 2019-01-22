import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';


export class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    return this.props.surveys.reverse().map(survey => {
      return (
        <div className="card light-blue lighten-5" key={survey._id}>
          <div className="card-content">
            <span className="card-title">
              {survey.title}
              <p>
                {survey.body}
              </p>
              <p className="right">
                Sent On: {new Date(survey.dateSent).toLocaleDateString()}
              </p>
            </span>


          </div>
          <div className="card-action">
            <a className="light-blue-text text-darken-4">Yes: {survey.yes}</a>
            <a className="light-blue-text text-darken-4">No: {survey.no}</a>

          </div>
        </div>
      )
    })
  }
  render() {
    return (
      <div>
        {this.renderSurveys()}
      </div>
    )
  }
}

function mapStateToProps({ surveys }) {
  return { surveys: surveys }
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
