//SurveyField - logic to render a signle line of a form

import React from 'react'

export default ({ input, label, meta: { error, touched } }) => {
  //console.log(input);
  //console.log(meta)
  return (
    <div>
      <label htmlFor="">{label}</label>
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error}

      </div>
      <input {...input} style={{ marginBottom: '5px' }} />

    </div>
  )
}
