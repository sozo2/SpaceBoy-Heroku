import React, {Component} from "react"
import { MdClear } from "react-icons/md";

class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.onChangeSearchString = this.onChangeSearchString.bind(this);
        this.state = {
            searchString: ""
        }
    }

    // searchFocusOn = () => {
    //     this.setState({searchFocusClass:"searchFocusClass"});
    // }

    // searchFocusOff = () => {
    //     this.setState({searchFocusClass:""});
    // }

    onChangeSearchString(e) {
        this.setState({
            searchString: e.target.value
        });
    }

    submitSearch(e) {
        e.preventDefault();
        console.log(this.state.searchString)
        this.props.updateSearchString({searchString: this.state.searchString});
    }

    clearSearch = () => {
        this.setState({searchString:""});
        this.props.updateSearchString({searchString: ""});
    }

    render() {
    return (
        <div id="search-bar-wrapper"> 
            <button id="clear-search-button" onClick={this.clearSearch}><MdClear/></button> 
            <form id="search-form-wrapper" autoComplete="off" method="post" onSubmit={event => {this.submitSearch(event);}}>
                <input id="search-input" type="text" placeholder="Search" value={this.state.searchString} onChange={this.onChangeSearchString}/>
            </form>
        </div>
    )}
}

export default SearchBar;