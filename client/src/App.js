import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

// Redux
import { Provider } from 'react-redux'; // Allows us to share the store data to child components
import store from './store';

import NavBar from './layout/NavBar';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import HackerNews from './pages/HackerNews';
import Loader from './components/Loader';
import PageNotFound from './components/PageNotFound';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Loader show={false} />
        <NavBar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/github-jobs/' component={Jobs} />
          <Route
            exact
            path='/hacker-news/'
            render={() => <Redirect to='/hacker-news/top' />}
          />
          {/* 
          We use a prop with the name render where we can write the component
          code directly inside the function. 
          */}
          <Route
            exact
            path='/hacker-news/:type'
            render={({ match }) => {
              const { type } = match.params;
              if (!['top', 'new', 'best'].includes(type)) {
                return <Redirect to='/hacker-news/' />;
              }
              return <HackerNews type={type} />;
            }}
          />
          {/* 
          Here, if the route matches with /hacker-news/top or /hacker-news/new or /hacker-news/best then we're showing the user the HackerNews component. If the user enters some invalid value for a route like /hacker-news/something, we will redirect the user again to the /hacker-news/top route which will render the HackerNews component with top stories..
          
          By default, the React router passes some props to each component mentioned in the <Route />. One of them is match so props.match.params will contain the actual passed value for the type.

          For the render prop function, we use destructuring to get the match property of the props object
          */}
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
