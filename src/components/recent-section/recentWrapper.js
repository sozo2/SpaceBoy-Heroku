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
            <div id="section-title-container">
                {this.props.sectionTitle=="All" ? <h3 className="blogAbout">a blog about</h3> : <h3 className="blogAbout">a blog about space </h3>} 
                {this.props.sectionTitle=="All" ? <h2 className="blogTopic">space</h2> : <h2 className="blogTopic">& {this.props.sectionTitle.toLowerCase()}</h2>}
            </div>
        </div>
    )}
}

export default RecentWrapper;