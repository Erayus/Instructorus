import React from 'react';
import './App.css';

import {Route, Switch} from 'react-router-dom' ;
import AdminLayout from "./hoc/Admin/AdminLayout";
import UserLayout from "./hoc/User/UserLayout";
// import Report from './containers/Report/Report'

const App: React.FC = () => {
  return (
    <div className="App">
    <Switch>
      {/* <Route path="/admin/report/:schoolName" component={Report} /> */}
      <Route path= '/admin' component={AdminLayout}/>
      <Route path='/'  component={UserLayout}/>
    </Switch>
  </div>
  );
}

export default App;
