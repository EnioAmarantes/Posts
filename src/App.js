import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import { Provider } from "react-redux";
import store from "../src/store";

/* Pages */
import Login from "./View/login";
import NewUser from "./View/newUser";
import Home from "./View/home";
import LostPassword from "./View/lostPassword";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/newuser" component={NewUser} />
        <Route exact path="/lostpassword" component={LostPassword} />
      </Router>
    </Provider>
  );
}

export default App;