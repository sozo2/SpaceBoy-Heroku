import React, { Component } from 'react';
import axios from 'axios';
import {getUser} from '../services/auth-service';
import uuid from 'uuid';

class NewPost extends Component {

    constructor(props) {
        super(props);

        this.onChangeArticleTitle = this.onChangeArticleTitle.bind(this);
        this.onChangeArticleCategory = this.onChangeArticleCategory.bind(this);
        this.onChangeArticleDescription = this.onChangeArticleDescription.bind(this);
        this.onChangeArticleContent = this.onChangeArticleContent.bind(this);
        this.onChangeArticleImage = this.onChangeArticleImage.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            article_creator: '',
            article_title: '',
            article_description: '',
            article_category: '',
            article_tags: [],
            article_content: '',
            articleImage: ''
        }
    }

    componentDidMount() {
        this.setState({
            article_creator: getUser().username
        });
    }; 

    onChangeArticleTitle(e) {
        this.setState({
            article_title: e.target.value
        });
    }

    onChangeArticleCategory(e) {
        this.setState({
            article_category: e.target.value
        });
    }

    onChangeArticleDescription(e) {
        this.setState({
            article_description: e.target.value
        });
    }

    onChangeArticleContent(e) {
        this.setState({
            article_content: e.target.value
        });
    }

    onChangeArticleImage(e) {
        this.setState({
            articleImage: e.target.files[0]
        });
    }
    

    onSubmit(e) {
        e.preventDefault();
        let newfilename = uuid() + "." + this.state.articleImage.type.replace(/^.*[\\\/]/, '');
        console.log(newfilename);
        console.log(this.state.article_creator);
        let formData = new FormData();
        formData.append('article_creator', this.state.article_creator);
        formData.append('article_title', this.state.article_title);
        formData.append('article_description', this.state.article_description);
        formData.append('article_category', this.state.article_category);
        formData.append('article_content', this.state.article_content);
        formData.append('article_src', newfilename);
        formData.append('articleImage', this.state.articleImage);

        axios.post('/api/post/create', formData)
            .then(function(res) { 
                console.log(res.data);
                this.props.history.push("/");
            });


        this.setState({
            article_title: '',
            article_description: '',
            article_category: '',
            article_tags: [],
            article_content: '',
            articleImage: ''
        });
        // this.props.history.push("/");
    }

    render() {
        return (
            <div>
                <div id="post-form-container">
                <h2>Write something new about SPACE!</h2>
                <form onSubmit={this.onSubmit}>
                    {/* <input type="hidden" name="article_creator" value="samzoeller"/> */}
                    <div className="form-group"> 
                        <label>Title: </label>
                        <input  type="text"
                                value={this.state.article_title}
                                onChange={this.onChangeArticleTitle}
                                name="article_title"
                                />
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input 
                                type="text" 
                                value={this.state.article_description}
                                onChange={this.onChangeArticleDescription}
                                name="article_description"
                                />
                    </div>

                    <div className="form-group">
                        <label>Category: </label>
                        <select name="article_catgory" onChange={this.onChangeArticleCategory} value={this.state.article_category ? this.state.article_category : ''}>
                            <option value="">Select a Category</option>
                            <option value="tech">Technology</option>
                            <option value="politics">Politics</option>
                            <option value="science">Science</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Content: </label>
                        <textarea 
                                value={this.state.article_content}
                                onChange={this.onChangeArticleContent}
                                name="article_content"
                                />
                    </div>

                    <div className="form-group">
                        <label>Upload an image: </label>
                        <input 
                                type="file" 
                                name="articleImage"
                                onChange={this.onChangeArticleImage}
                                accept="image/png, image/jpeg, image/jpg"
                                />
                    </div>
                   
                    <div className="form-group">
                        <input id="blast-off" type="submit" value="Blast Off!" />
                    </div>
                </form>
            </div>
            </div>
        )
    }
}
export default NewPost;