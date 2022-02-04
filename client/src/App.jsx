import "./App.css";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registration from "./pages/Registration";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="navbar">
          <Link to="/">Back To Home</Link>
          <Link to="/createpost">Create Post</Link>
          <Link to="/login">Login</Link>
          <Link to="/registration">Registration</Link>
        </div>

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/createpost" exact component={CreatePost} />
          <Route path="/post/:id" exact component={Post} />
          <Route path="/login" exact component={Login} />
          <Route path="/registration" exact component={Registration} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
