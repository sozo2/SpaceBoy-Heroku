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
        var imageStr = this.arrayBufferToBase64(articleImage.data.data);
        return process.env.REACT_APP_API_ROOT+ "/" + this.decodeBase64(imageStr);
    }

    render() {
        return (
            // <div id="article-grid-container"></div>
            <div id="article-grid-container">{this.props.allArticles.map((article) => <ArticleTile key={article._id} id={article._id} postTitle={article.title} postDate={article.created_at} postDescription={article.description} articleImage={article.image ? this.configureImageSrc(article.image) : ""}/>)}</div>
        )
    }

}

export default articleGrid;