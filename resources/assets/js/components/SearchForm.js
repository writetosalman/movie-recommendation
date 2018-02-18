import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PromiseButton from './PromiseButton';
import { FormWithConstraints, FieldFeedback }   from 'react-form-with-constraints';
import { FieldFeedbacks, FormGroup } from 'react-form-with-constraints/lib/Bootstrap4';
import { JsonPost } from './RESTService';

export default class SearchForm extends Component
{
    constructor(props, context) {
        super(props, context);

        // Get current local time
        let today = new Date();
        today.setHours( today.getHours()+(today.getTimezoneOffset()/-60) );

        this.state     =  {
            appState:               this.props.appState,
            genre:                  '',
            showTime:               today.toJSON().slice(0, 19),
            submitButtonDisabled:   true,
            statusMessage:          ''
        };

        // State
        this.handleInputChange  = this.handleInputChange.bind(this);
        this.formSubmit         = this.formSubmit.bind(this);
        this.focusTextInput     = this.focusTextInput.bind(this);
    }

    /**
     * This function calls focus on the text input
     */
    focusTextInput() {
        // Explicitly focus the text input using the raw DOM API
        this.textInput.focus();
    }

    /**
     * This function handles Input change events
     * @param event
     */
    handleInputChange(event) {
        const target    = event.target;
        const value     = target.value;

        this.form.validateFields(target);

        this.setState({
            [target.name]:          value,
            submitButtonDisabled:   !this.form.isValid()
        });
    }

    /**
     * This function is called when parent updates props. In this event we will update state
     * @param newProps
     */
    componentWillReceiveProps(newProps) {
        this.setState({appState: newProps.appState});
    }

    /**
     * This function submits form to server
     * @param e
     */
    formSubmit(e) {
        e.preventDefault();

        // Form validation
        this.setState({
            submitButtonDisabled:   !this.form.isValid()
        });

        // Return if form is in-valid
        if ( !this.form.isValid() ) {
            return;
        }

        // Form is valid, now set app state | not using redux as that is an overkill for this project
        this.props.setAppState({
            genre:          this.state.genre,
            showTime:       this.state.showTime,
            isLoading:      true,
            isSearched:     true,
            statusMessage:  '',
            movies:         []
        });

        return JsonPost('/movies', {
            genre:      this.state.genre,
            showTime:   this.state.showTime,
        }).then(
                (response) => {
                    console.log('movies', response);
                    this.props.setAppState({
                        isLoading:  false,
                        movies:     response.data
                    });
                    return false;
                },
                (error) => {
                    console.log('movies', response);
                    if ( error.response.data && error.response.data.message ) {
                        this.setState({
                            statusMessage: error.response.data.message
                        });
                        return Promise.reject(error)
                    }
                    this.props.setAppState({
                        isLoading:  false
                    });
                });
    }

    /**
     * Render function
     * @returns {XML}
     */
    render() {
        return (
            <div className="container">
                <div className="card">
                    <div className="card-header "><b>Movie Recommendations</b></div>
                    <div className="card-body">
                        <h5 className="card-title">Search for movies</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Use this form to find movies based on genre and showTime</h6><br/>

                        <FormWithConstraints className="form-horizontal" ref={formWithConstraints => this.form = formWithConstraints}
                                             onSubmit={this.formSubmit} noValidate>
                                <div className="form-group">
                                    <label htmlFor="inputGenre">Movie Genre</label>
                                    <input type="text" className="form-control" id="idInputGenre" name="genre" placeholder="Type genre"
                                           ref={ (input) => { this.textInput = input; } }   tabIndex="1"
                                           onChange={this.handleInputChange} value={this.state.genre} required />
                                        <small className="form-text text-muted">Movie genre can be Dramas, Comedy, Romance etc.</small>

                                        <FieldFeedbacks for="genre" show="all">
                                            <FieldFeedback when="*" />
                                        </FieldFeedbacks>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputTime">Movie Time</label>
                                    <input type="datetime-local" className="form-control" id="idInputTime" name="showTime" placeholder=""
                                           tabIndex="2"
                                           onChange={this.handleInputChange} value={this.state.showTime} required />
                                </div>

                        </FormWithConstraints>
                    </div>
                    <div className="card-footer text-right">
                        {this.state.statusMessage &&
                            <span className="text-danger">{this.state.statusMessage}&nbsp;&nbsp;</span>
                        }
                        <PromiseButton
                            tabIndex="3"
                            className="btn btn-primary"
                            text=" Search &raquo; "
                            pendingText="Searching..."
                            fulFilledText="Search!"
                            fulFilledClass="btn btn-success"
                            rejectedClass="btn btn-danger"
                            rejectedText="Failed! Try Again"
                            onClick={this.formSubmit}
                            disabled={this.state.submitButtonDisabled}
                        />
                    </div>
                </div>
            </div>
        );
    }
}