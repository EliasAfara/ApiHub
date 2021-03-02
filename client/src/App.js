import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux'; // Allows us to share the store data to child components
import store from './store';

import NavBar from './layout/NavBar';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import Loader from './components/Loader';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Loader show={false} />
        <NavBar />
        <Switch>
          <Route exact path='/' component={Home} />

          <Route exact path='/github-jobs/' component={Jobs} />
          {/* <Route exact path='/tracker/' component={} />
            <Route exact path='/more/' component={} /> */}
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
