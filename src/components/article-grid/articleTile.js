import React from "react"
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import moment from 'moment';

function ArticleTile(props) {
    var articleTitleLink = "/article/" + props.id;
    return (
    <div className="article-tile-container">
        <div className="article-tile">
            {/* <img className="tileImage" alt="nothing to see here" src={props.articleImage}/> */}
            <Link to={articleTitleLink} className="tile-title-link" style={{ textShadow: `none`, backgroundImage: `none` }}><h2 className="tile-title">{props.postTitle} <FiArrowRight/></h2></Link>
            <p className="tile-date">{moment(props.postDate).format('MMMM DD, YYYY')}</p>
            <p className="tile-description">{props.postDescription}</p>
        </div>
    </div>
)}

export default ArticleTile