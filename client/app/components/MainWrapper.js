import React, { Component } from 'react'
import {Link, browserHistory} from 'react-router'
import {connect} from 'react-redux'
import {logoutClick} from '../actions/auth_actions.js'


import Signup from './Signup'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Landing from './Landing'
import setAuthorizationToken from '../utils/setAuthorizationToken.js'
import {setUser, getFollowers, getFollowing} from '../actions/auth_actions.js'
import {fetchUserPostsFromDb, fetchStarredPostsFromDb} from '../actions/post_actions.js'
import {initUserMatches } from '../actions/match_actions.js'
import {fetchCategories} from '../actions/category_actions.js'
import {Promise} from 'bluebird'
import jwt from 'jsonwebtoken';


//React.cloneElement will clone/propogate props down through the children elements
class Main extends Component {


	componentWillMount() {
		console.log("LOCATION", window.location.pathname)
		const { params, router} =  this.props;
		if(localStorage.token) {
		  setAuthorizationToken(localStorage.token);
		  const decoded = jwt.decode(localStorage.token)
			if(params.username !== decoded.user.username) {
				router.push(`/${decoded.user.username}`);
			}
			Promise.join(
		    this.props.dispatch(setUser(decoded.user)),
				this.props.dispatch(fetchCategories()),
		    this.props.dispatch(fetchUserPostsFromDb(decoded.user.username)),
		    this.props.dispatch(fetchStarredPostsFromDb(decoded.user.id)),
		    this.props.dispatch(getFollowers(decoded.user.id)),
		    this.props.dispatch(getFollowing(decoded.user.id)),
		    this.props.dispatch(initUserMatches(decoded.user.username))
		  )
			.then(() => console.log('yes'))
			//todo
			//setup pubnub notifications channel (in store?)
			//publish notifications on starring and following actions
			//publish notifications on messages (WHEN user is not present in message channel)
			//listen for starring, following, and messaging
			//use history to display notifications in seperate view
		} else if(window.location.pathname === "/") {
			router.push('/');
		} else if(window.location.pathname === "/signup") {
			router.push('/signup');
		} else {
			router.push('/login');
		}
	}


	render() {

		return (
			<div>
				<Navbar user={this.props.user} dispatch={this.props.dispatch} />
				<Sidebar user={this.props.user} dispatch={this.props.dispatch} />
				{ React.cloneElement(this.props.children, this.props) }
			</div>
		)
	}
}

export const defaultState = {
	user: {
		isAuthenticated: false,
		following: [],
		followers: []
	},
	starredPosts: [],
	userPosts: [],
	allPosts: [],
	publicPosts: [],
	categories: [],
	tags: [],
	matches: [],
	personalityMatches: []
}

function mapStatetoProps (state=defaultState) {
	return {
		user: Object.assign(state.user, ...state.user, {following: state.user.following, followers: state.user.followers}),
		tags: state.tags,
		categories: state.categories,
		starredPosts: state.starredPosts,
		userPosts: state.userPosts,
		allPosts: state.allPosts,
		personalityMatches: state.personalityMatches,
		publicPosts: state.publicPosts,
		matches: state.matches
	}
}

//init Redux store to React main
const MainWrapper = connect(mapStatetoProps)(Main);

export default MainWrapper;
