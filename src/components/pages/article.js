import React, {Component} from "react"
import axios from 'axios';
import moment from 'moment';
import { TiCode } from "react-icons/ti";
import { FiArrowLeft, FiTrash2 } from "react-icons/fi";
import uuid from 'uuid';

class Article extends Component {

    constructor(props) {
        super(props);
        this.state = {
            article: {
                title: "",
                content: "",
                description: "",
                created_at: "",
                image_src: ""
            },
            imageSrc: "",
            createdBy: "",
            loggedInAsAdmin: this.props.loggedInAsAdmin,
            showDeleteConfirmation: false,
            deleteDivClass: "hideDelete"
        }
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({ loggedInAsAdmin: nextProps.loggedInAsAdmin });  
    }

    componentDidMount() {
        axios.post("/api/post/get", {article_id: this.props.match.params.postId})
        .then((res) => {
            console.log(res.data);
            this.setState({
                article: {
                    title: res.data.title,
                    content: res.data.content,
                    description: res.data.description,
                    created_at: moment(res.data.created_at).format('MMMM DD, YYYY'),
                    image_src: res.data.image_src
                },
                createdBy: res.data._creator.first_name + " " + res.data._creator.last_name
            });
        });
    }; 

    deleteArticle = () => {
        axios.post('/api/post/delete', {article_id: this.props.match.params.postId})
        .then((res) => {
            console.log(res.data);
            this.props.history.push("/");
        });
    }; 

    handleBackButton = () => {
        this.props.history.goBack();
    }

    toggleDeleteDiv = () => {
        if(this.state.deleteDivClass=="hideDelete"){
            this.setState({deleteDivClass:"showDelete"});
        }else {
            this.setState({deleteDivClass:"hideDelete"});
        }
    }
    
    render(props){

        var deleteDiv;
        if (this.state.loggedInAsAdmin) {
            deleteDiv = 
                <div>
                    <div className={this.state.deleteDivClass}>
                        <label>Are you sure?</label>
                        <div className="delete-confirm-container">
                            <button onClick={this.deleteArticle}>yes</button>
                            <button onClick={this.toggleDeleteDiv}>cancel</button>
                        </div>
                    </div>
                </div>;
        } else {
            deleteDiv = null;
        }

        return (
        <div className="postContainer">
            <div id="post-icon-box">
                <button className="post-btn" onClick={this.handleBackButton}><FiArrowLeft/></button>
                {this.state.loggedInAsAdmin ? <button className="post-btn" onClick={this.toggleDeleteDiv}><FiTrash2/></button> : null}
                {deleteDiv}
            </div>
            <div id="post-center">
                <div id="post-section-1">
                    <img className="articleTitleImage" alt="" src={this.state.article.image_src}/>
                </div>
                <div id="post-section-2">
                    <h1>{this.state.article.title}</h1>
                    <div id="post-section-2b">
                        <p>{this.state.article.created_at} <TiCode/> by {this.state.createdBy}</p>
                    </div>
                </div>
                <div id="post-content">{this.state.article.content}</div>
            </div>
        </div>
    )}
}

export default Article;