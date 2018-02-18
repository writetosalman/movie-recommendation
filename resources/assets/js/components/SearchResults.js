import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Movie from './Movie';

export default class SearchResults extends Component
{
    constructor(props, context) {
        super(props, context);

        this.state     =  {
            appState:               this.props.appState,
        };
    }

    /**
     * This function is called when parent updates props. In this event we will update state
     * @param newProps
     */
    componentWillReceiveProps(newProps) {
        this.setState({appState: newProps.appState});
    }

    /**
     * Render function
     * @returns {XML}
     */
    render() {
        return (
            <div className="container">
                <div className="form-group" />
                { this.state.appState.isSearched &&
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">Movies</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Genres</th>
                        <th scope="col">Show Time</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.appState.movies && this.state.appState.movies.length > 0 && this.state.appState.movies.map((movie, index) => {
                            return <Movie movie={movie} key={index}/>
                        })
                    }
                    {
                        this.state.appState.isLoading === false && this.state.appState.movies.length === 0 &&
                        <tr>
                            <td colSpan={4}>no movie recommendations</td>
                        </tr>
                    }
                    </tbody>
                </table>
                }
            </div>
        );
    }
}