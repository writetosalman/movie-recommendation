import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';

export default class App extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            genre:      '',
            showTime:   '',
            isLoading:  false,
            isSearched: false,
            movies:     [],
            status:     '',
        };

        // Bind function
        this.setAppState = this.setAppState.bind(this)
    }

    /**
     * This function sets state of the app. It can be passed to child components as prop
     * @param newState
     */
    setAppState(newState) {

        // Update state if newState is passed
        if ( newState ) {
            this.setState(newState);
        }
    }

    /**
     * Render function
     * @returns {XML}
     */
    render() {
        return (
            <div className="margin-md">
                <SearchForm     appState={this.state} setAppState={this.setAppState} />
                <SearchResults  appState={this.state} setAppState={this.setAppState} />
            </div>
        );
    }
}