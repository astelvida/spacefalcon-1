import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'

import Signup from './Signup'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

//React.cloneElement will clone/propogate props down through the children elements
const Main = React.createClass({
	render() {
	
	const isAuthenticated = this.props.user.isAuthenticated;

	const signedInUser = (
				<div>
					<h1>
						<Link to="/">aLike.me</Link>
					</h1>
					<Navbar user={this.props.user} dispatch={this.props.dispatch}/>
					<Sidebar user={this.props.user} dispatch={this.props.dispatch}/>
					{ React.cloneElement(this.props.children, this.props) }
			  </div>
	 )


		return (
      <div>
				{signedInUser}
     </div>
		)
	}
})

export const defaultState = {
	user: {
		isAuthenticated: false,
		following: [],
		followers:[]
	},
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
		user: state.user,
		tags: state.tags,
		categories: state.categories,
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

//		{React.cloneElement(this.props.children, this.props)}