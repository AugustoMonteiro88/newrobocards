import React , { useState, useEffect } from 'react'
import CardList from '../components/CardList'
import SearchBox from '../components/SearchBox'
import './App.css';
import Scroll from '../components/Scroll'
import ErrorBoundary from '../components/ErrorBoundary'
// import { robots } from './robots' -> going with jsonplaceholder


function App() {
	// constructor(){
	// 	super();
	// 	this.state = {
	// 		robots: [],
	// 		searchfield: ''
	// 	}
	// }
	const [robots, setRobots] = useState([]);
	const [searchfield, setSearchfield] = useState('');

	// componentDidMount() {
	// 	fetch('https://jsonplaceholder.typicode.com/users')
	// 		.then(response => response.json())
	// 		.then(users => this.setState({ robots: users }))
	// 	;
	// }
	useEffect( () => {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.json())
			.then(users => {setRobots(users)});
	},[]) //simulating componentDidMount with that empty array

	const onSearchChange = (event) => {
		//this.setState({ searchfield: event.target.value })
		setSearchfield(event.target.value)
	}
	//const { robots, searchfield } = this.state; //destructuring
	const filteredRobots = robots.filter(robot => {
		return robot.name.toLowerCase().includes(searchfield.toLowerCase());
	})
	return !robots.length ?
		<h1 className ="tc">Loading...</h1> :
		(		
			<div className='tc'>
				<h1 className = 'f1'>RoboCards</h1>
				<SearchBox searchChange={onSearchChange}/> 
				<Scroll>
					<ErrorBoundary>
						<CardList robots={filteredRobots}/>
					</ErrorBoundary>
				</Scroll>
			</div>
		);	
}

export default App;