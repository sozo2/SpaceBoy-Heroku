import React, {Component} from "react"
import SearchBar from "./searchBar"
import ArticleGrid from "./articleGrid"
import axios from 'axios';

class GridWrapper extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchString: "",
            articles: []
        }
    }

    applySearch(articles, searchString){
        var filteredArticles = [];
        if(searchString===""){
            for(var i = articles.length-1; i >= 0; i-=1) {
                filteredArticles.push(articles[i]);
            }
            return filteredArticles;
        }
        for(var i = articles.length-1; i > 0; i-=1) {
            if(articles[i].title.toLowerCase().includes(searchString.toLowerCase())){
                filteredArticles.push(articles[i]);
            }
        }
        return filteredArticles;
    }

    updateSearchString = ({searchString}) => {
        console.log(searchString);
        this.setState({
            searchString: searchString
        });
        this.grabAllArticles();
    }

    grabAllArticles = () => {
        axios.post(process.env.MONGODB_URI+'/api/post/get-all', {category: this.props.queryCategory})
        .then((res) => {
            console.log(res.data);
            this.setState({
                articles: this.applySearch(res.data, this.state.searchString)
            });
        }); 
    }

    componentDidMount() {
        this.grabAllArticles();
    }; 

    render() {
    return (
        
        <div id="grid-wrapper">
            <SearchBar updateSearchString={this.updateSearchString}/>
            <ArticleGrid allArticles={this.state.articles}/>
        </div>

    )}
}

export default GridWrapper