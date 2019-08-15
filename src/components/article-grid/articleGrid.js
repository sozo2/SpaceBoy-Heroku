import React, { Component } from 'react';
import ArticleTile from "./articleTile"

class articleGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: this.props.allArticles
        }
    }

    componentDidMount() {
        this.setState({articles: this.props.allArticles});
    }; 

    render() {
        return (
            <div id="article-grid-container">{this.props.allArticles.map((article) => <ArticleTile key={article._id} id={article._id} postTitle={article.title} postDate={article.created_at} postDescription={article.description}/>)}</div>
        )
    }

}

export default articleGrid;