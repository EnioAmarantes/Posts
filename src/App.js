import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import { Provider } from "react-redux";
import {store, persistor} from "../src/store"; 
import { PersistGate} from "redux-persist/integration/react";

/* Pages */
import Login from "./View/login";
import NewUser from "./View/newUser";
import Home from "./View/home";
import LostPassword from "./View/lostPassword";
import NewPost from "./View/newPost";
import PostDetails from "./View/postdetails";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        <Router>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route path="/posts/:parametro" component={Home} />
          <Route exact path="/newuser" component={NewUser} />
          <Route exact path="/lostpassword" component={LostPassword} />
          <Route exact path="/newpost" component={NewPost} />
          <Route path="/postdetails/:idPost" component={PostDetails} />
          <Route path="/postedit/:idPost" component={NewPost} />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;