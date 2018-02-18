// SearchForm.test.js
import React from 'react';
import SearchForm from './SearchForm';
import renderer from 'react-test-renderer';

test('SearchForm Test', () => {

    let state      = {
        genre:      '',
        showTime:   '',
        isLoading:  false,
        isSearched: false,
        movies:     [],
        status:     '',
    };

    let setAppState = () => {};

    const component = renderer.create(
        <SearchForm appState={state} setAppState={setAppState} />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});