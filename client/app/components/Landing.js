import React from 'react'
import { Promise } from 'bluebird'
import {Link, browserHistory} from 'react-router'
import {signupApiRequest, signupUser,loginApiRequest, getFollowers, getFollowing} from '../actions/auth_actions.js'
import {fetchUserPostsFromDb, fetchStarredPostsFromDb} from '../actions/post_actions.js'
import {fetchCategories} from '../actions/category_actions.js'
import {initUserMatches} from '../actions/match_actions.js'
import {getWatsonTwitterData} from '../actions/watson_actions.js'

const Landing = React.createClass({
	loginUser () {
		const {dispatch, router} = this.props;
		const user = {username: 'isaac94', password: '123', id: '1'}
		dispatch(loginApiRequest({username: 'isaac94', password: '123'}))
		.then(() => {
			let {user} = this.props;
			if(user.isAuthenticated) {
				Promise.join(
					dispatch(fetchUserPostsFromDb(user.username)),
					dispatch(fetchCategories()),
					dispatch(getFollowers(user.id)),
					dispatch(getFollowing(user.id)),
					dispatch(fetchStarredPostsFromDb(user.id)),
					dispatch(initUserMatches(user.username))
				)
				.then(() => router.push({pathname:`/${user.username}`}))
			}
		})
	},

	render() {
		return (
      <div className="jumbotron boxed landing">
        <div className="container-fluid">
          <h1> Welcome to aLike.me! </h1>
          <p> Find people like you. </p>
          <div className="padded-box">
            <Link to='/signup' className="btn btn-default linkto">Signup now!</Link>
            <button className="btn btn-default linkto demo" onClick={this.loginUser}>Demo app</button>

          </div>
          <div className="padded-box">
            <p>Already have an account?
              <Link to='/login'> Go to Login </Link>
            </p>
          </div>
        </div>
      </div>
		)
	}
})

export default Landing;
