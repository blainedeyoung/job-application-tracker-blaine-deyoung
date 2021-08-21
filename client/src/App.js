import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './components/Login.js'
import Main from './components/Main.js'
import './styles.css'


const App = () => {
  return (
    <div>
      <Switch>
          <Route exact path="/" component={Login}/>
          <Route path="/main" component={Main}/>
      </Switch>
    </div>
  );
}

export default App;
