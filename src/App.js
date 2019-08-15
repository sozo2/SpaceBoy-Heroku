import React, { Component } from 'react';
import './styles/global.css';
import Navbar from './components/navbar/navbar';
import Footer from './components/navbar/footer';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/pages/home"
import Tech from "./components/pages/technology"
import Politics from "./components/pages/politics"
import Science from "./components/pages/science"
import NewPost from "./components/pages/new-post"
import Article from "./components/pages/article"
import Login from "./components/pages/login"
// import Signup from "./components/pages/signup"
import AdminSignup from "./components/pages/admin-signup"
import { isLoggedIn, logout, getUser } from "./components/services/auth-service"

class App extends Component {

  state = {
    isLoggedIn: isLoggedIn(),
    userFirstName: getUser().first_name,
    loggedInAsAdmin: getUser().is_admin
  }

    updateStateAfterLogout = () => {
        this.setState({
            isLoggedIn: false,
            userFirstName: "",
            loggedInAsAdmin: false,
        });
        logout();
    }

    updateStateAfterLogin = (previous,next) => {
        this.setState({
            isLoggedIn: isLoggedIn(),
            userFirstName: getUser().first_name,
            loggedInAsAdmin: getUser().is_admin
        });
    }

  render() {
    return (
      <div className="App">
        <Router>
          <Navbar isLoggedIn={this.state.isLoggedIn} userFirstName={this.state.userFirstName} loggedInAsAdmin={this.state.loggedInAsAdmin}
          updateStateAfterLogout={this.updateStateAfterLogout} updateStateAfterLogin={this.updateStateAfterLogin}/>
          <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/technology' component={Tech} />
              <Route path='/politics' component={Politics} />
              <Route path='/science' component={Science} />
              <Route path='/new-post' component={NewPost} />
              <Route path='/login' render={(props) => <Login {...props} updateStateAfterLogout={this.updateStateAfterLogout} updateStateAfterLogin={this.updateStateAfterLogin}/>}/>
              <Route path='/article/:postId' render={(props) => <Article {...props} loggedInAsAdmin={this.state.loggedInAsAdmin} />} />
              <Route path='/signup/admin' render={(props) => <AdminSignup {...props} updateStateAfterLogout={this.updateStateAfterLogout} updateStateAfterLogin={this.updateStateAfterLogin}/>}/>
          </Switch>
          <Footer/>
        </Router>
      </div>
    );
  }
}

export default App;
