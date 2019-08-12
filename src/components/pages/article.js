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
                created_at: ""
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
                    created_at: moment(res.data.created_at).format('MMMM DD, YYYY')
                },
                imageSrc: res.data.image ? this.configureImageSrc(res.data.image.data.data) : "",
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

    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    decodeBase64 = function(s) {
        var e={},i,b=0,c,x,l=0,a,r='',w=String.fromCharCode,L=s.length;
        var A="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        for(i=0;i<64;i++){e[A.charAt(i)]=i;}
        for(x=0;x<L;x++){
            c=e[s.charAt(x)];b=(b<<6)+c;l+=6;
            while(l>=8){((a=(b>>>(l-=8))&0xff)||(x<(L-2)))&&(r+=w(a));}
        }
        return r;
    };

    configureImageSrc(articleImage){
        var imageStr = this.arrayBufferToBase64(articleImage);
        return this.decodeBase64(imageStr).replace("uploads", "");
        // return process.env.REACT_APP_API_ROOT + "/" + this.decodeBase64(imageStr);
        // return this.decodeBase64(imageStr);
    }

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
                    {/* <button onClick={this.toggleDeleteDiv}>Delete</button> */}
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
        console.log("check image source url:")
        console.log(this.state.imageSrc);
        console.log(uuid());
        return (
        <div className="postContainer">
            <div id="post-icon-box">
                <button className="post-btn" onClick={this.handleBackButton}><FiArrowLeft/></button>
                {this.state.loggedInAsAdmin ? <button className="post-btn" onClick={this.toggleDeleteDiv}><FiTrash2/></button> : null}
                {deleteDiv}
            </div>
            <div id="post-center">
                <div id="post-section-1">
                    <img className="articleTitleImage" alt="" src="https://spaceboy.s3.us-east-2.amazonaws.com/GreatMountain.jpg"/>
                    {/* <img className="articleTitleImage" alt="" src={this.state.imageSrc}/> */}
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