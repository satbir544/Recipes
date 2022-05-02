import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Home from './Home';
import About from './About';
import Nav from './Components/Nav';

// contains router
function App() {
  return (
    <Router>
		<div className="App">			
			<Nav/>
			<Switch>
				<Route path="/" exact component={Home}/>
				<Route path="/about" component={About}/>
			</Switch>
		</div>
	</Router>
  );
}

export default App;
