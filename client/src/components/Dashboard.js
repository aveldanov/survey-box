import React from 'react'
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      Dashboard
<div className="fixed-action-btn">


        <Link to="/surveys/new" className="btn-floating btn-large waves-effect waves-light  light-blue darken-3"><i className="material-icons">add</i></Link>


      </div>



    </div>
  )
}

export default Dashboard;
