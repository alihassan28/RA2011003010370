import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TrainList from './components/TrainList';
import TrainDetails from './components/TrainDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={TrainList} />
          <Route path="/train/:trainNumber" component={TrainDetails} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
