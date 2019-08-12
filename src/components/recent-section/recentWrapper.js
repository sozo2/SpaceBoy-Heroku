import React, {Component} from "react"
import { FiArrowRight } from "react-icons/fi";

class RecentWrapper extends Component {

    constructor(props) {
        super(props);
        this.state={
            article_link:""
        }
    }

    render(props) {

    return (
        <div id="recent-wrapper">
        {/* // <div id="recent-wrapper" style={{ backgroundImage:"url(lockheed-moon2024.jpg)",backgroundSize: "cover", backgroundPosition: "center" }}> */}
            {/* <div id="recent-image"><img src="lockheed-moon2024.jpg" /></div> */}
            {/* <div id="recent-title">
                <div className="buffer"></div> */}
                <div id="section-title-container">
                    {this.props.sectionTitle=="All" ? <h3 className="blogAbout">a blog about</h3> : <h3 className="blogAbout">a blog about space </h3>} 
                    {this.props.sectionTitle=="All" ? <h2 className="blogTopic">space</h2> : <h2 className="blogTopic">& {this.props.sectionTitle.toLowerCase()}</h2>}
                </div>
            {/* </div>
            <a id="article-link" href="#">Pluto: what's the deal? <FiArrowRight/></a> */}
            {/* <h3>{props.sectionTitle}</h3> */}
        </div>
    )}
}

export default RecentWrapper;