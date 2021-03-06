'use strict'
import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { browserHistory, Link } from 'react-router'
import fetchUserPicture from '../utils/fetchUserPicture.js'


class Sidebar extends React.Component {

  render () {

    const imgStyle = {
      height: '100px',
      borderRadius: '50%',
      marginTop: '10px',
      marginBottom: '10px',
      border: '2px, solid, #000',
    }


    const locationStyl = {
      marginTop: '10px',
      fontSize: '14px'
    }

   const { user, params, location, dispatch } = this.props;

	 const loggedInView = (
        <div className="sidebar-wrapper">
          <div className="sidebar-content">

            <h4 className="small-title hello"> Hello {user.username}!</h4>
            <img src={user.gravatar} style={imgStyle} />

             <p style={locationStyl}><small>City: <strong> San Francisco, CA </strong></small> </p><br/>
            <h4 className="small-title"> My Personality Profile </h4>

            <div style={{width: +(user.openness * 100).toFixed(0) + '%'}}>
              <div className="statBar">
                <div style={{width: '500px'}}>
                  <p><strong> Openness: </strong> { +(user.openness * 100).toFixed(0) || ' ' }%</p>
                </div>
              </div>
            </div>
            <div style={{width: +(user.conscientiousness * 100).toFixed(0) + '%'}}>
              <div className="statBar">
                <div style={{width: '500px'}}>
                  <p><strong> Conscientiousness: </strong> { +(user.conscientiousness * 100).toFixed(0) || ' ' }%</p>
                </div>
              </div>
            </div>
            <div style={{width: +(user.extraversion * 100).toFixed(0) + '%'}}>
              <div className="statBar">
                <div style={{width: '500px'}}>
                  <p><strong> Extraversion: </strong> { +(user.extraversion * 100).toFixed(0) || ' ' }%</p>
                </div>
              </div>
            </div>
            <div style={{width: +(user.emotionalRange * 100).toFixed(0) + '%'}}>
              <div className="statBar">
                <div style={{width: '500px'}}>
                  <p><strong> Emotional range: </strong> { +(user.emotionalRange * 100).toFixed(0) || ' ' }%</p>
                </div>
              </div>
            </div>

          </div>
        </div>
   )

    const noSideView = (
      <div></div>
    )

    if(user.isAuthenticated && location.pathname.startsWith('/message')) {
      return noSideView;
    }
    return  (user.isAuthenticated && params.username === user.username)?
    loggedInView : noSideView

  }
}

export default Sidebar;



// <small>The normalized percentile score for the characteristic. The range is 0 to 100. For example, if the percentage for Openness is 25%, the author scored in the 25th percentile; the author is more open than 24% of the population and less open than 74% of the population.
// </small>
			    // <img src={this.state.profilePicture} style={imgStyle} onError={handleError} />
