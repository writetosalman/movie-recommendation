import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Movie extends Component
{
    constructor(props, context) {
        super(props, context);

        this.state     =  {
            movie:               this.props.movie,
        };
    }

    /**
     * Render function
     * @returns {XML}
     */
    render() {
        return (
            <tr>
                <td scope="col">{this.state.movie.name}</td>
                <td scope="col">{this.state.movie.rating}</td>
                <td scope="col">
                    <ul style={{paddingLeft: '0'}}>
                        {
                            this.state.movie.genres.map( (genre, index) => {
                                return <li key={index}>{genre}</li>
                            })
                        }
                    </ul>
                </td>
                <td scope="col">
                    <ul style={{paddingLeft: '0'}}>
                        {
                            this.state.movie.showings.map( (showTime, index) => {
                                return <li key={index}>{showTime}</li>
                            })
                        }
                    </ul>
                </td>
            </tr>
        );
    }
}