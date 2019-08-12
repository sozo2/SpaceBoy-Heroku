import React, { Component }  from "react";
import { Link } from "react-router-dom";
import { FiEdit, FiPower } from "react-icons/fi";

class Navbar extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: this.props.isLoggedIn,
            userFirstName: this.props.userFirstName,
            loggedInAsAdmin: this.props.loggedInAsAdmin
        }
    }

    render() {
        console.log(this.props);
        return (        
        <div id="nav-wrapper">
            <div id="logo-div">
                <div className="headerSplit1"><Link to={"/"} className="linkStyle"><h1 id="space-boy-title">SpaceBoy</h1></Link></div>
                <div className="headerSplit2"><img id="logo-img" src="/redblueufo.png"/></div>
                <div className="headerSplit3">
                    <div className="icon-box">
                        <span>{this.props.loggedInAsAdmin ? <Link to={"/new-post"} className="linkStyle iconLink"><FiEdit/></Link>: null }
                        {this.props.isLoggedIn ? <button className="iconLink" onClick={this.props.updateStateAfterLogout}><FiPower/></button>: null}</span>
                    </div>
                    {this.props.isLoggedIn ? <p>Welcome, {this.props.userFirstName}</p> : null}
                </div>
            </div>
            <div id="category-link-container">
                <div className="category"><Link to={"/technology"} className="linkStyle category-link">tech</Link></div>
                <div className="category"><Link to={"/politics"} className="linkStyle category-link">politics</Link></div>
                <div className="category"><Link to={"/science"} className="linkStyle category-link">science</Link></div>
            </div>
            {/* {this.props.loggedInAsAdmin ? <Link to={"/new-post"} style={{ textShadow: `none`, backgroundImage: `none` }}> - New Post</Link> : null } */}
            {/* {this.props.isLoggedIn ? <div style={{ float: `right` }}><button style={{ textShadow: `none`, backgroundImage: `none` }} onClick={this.props.updateStateAfterLogout}>Logout</button><p>Welcome, {this.props.userFirstName}</p></div> :  <Link to="/login" style={{ textShadow: `none`, backgroundImage: `none` }}> - Login</Link>} */}
        </div>
)}}

export default Navbar;