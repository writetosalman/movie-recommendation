// SearchResults.test.js
import React from 'react';
import SearchResults from './SearchResults';
import renderer from 'react-test-renderer';

test('SearchResults Test', () => {

    let state      = {
        genre:      'Drama',
        showTime:   '',
        isLoading:  false,
        isSearched: true,
        movies:     [],
        status:     '',
    };

    let setAppState = () => {};

    const component = renderer.create(
        <SearchResults appState={state} setAppState={setAppState} />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});