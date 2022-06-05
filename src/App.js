import List from './List';
import InputWithLabel from './InputWithLabel';
import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

const useStorageState = (key, initialState) => {
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

function App() {
  const [searchTerm, setSearchTerm] = useStorageState('search', '');
  const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}`);

  const storiesReducer = (state, action) => {
    switch (action.type) {
      case 'STORIES_FETCH_INIT':
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
      case 'STORIES_FETCH_SUCCESS':
        return {
          ...state,
          isLoading: false,
          isError: false,
          data: action.payload,
        };
      case 'STORIES_FETCH_FAILURE':
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
      case 'REMOVE_STORY':
        return {
          ...state,
          data: state.data.filter(
            (story) => action.payload.objectID !== story.objectID
          ),
        };
      default:
        throw new Error();
    }
  };

  const [stories, dispatchStories] = useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  useEffect(() => {
    if (!searchTerm) return;

    dispatchStories({ type: 'STORIES_FETCH_INIT' });
    axios
      .get(url)
      .then((result) => {
        dispatchStories({
          type: 'STORIES_FETCH_SUCCESS',
          payload: result.data.hits,
        });
      })
      .catch(() => dispatchStories({ type: 'STORIES_FETCH_FAILURE' }));
  }, [url]);

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
  };

  const onDelete = (item) => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  };

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <InputWithLabel
        id='search'
        value={searchTerm}
        onInputChange={handleSearchInput}
      >
        Search:
      </InputWithLabel>

      <button type='button' disabled={!searchTerm} onClick={handleSearchSubmit}>
        Submit
      </button>

      <hr />

      {stories.isError && <p>Something went wrong ...</p>}

      {stories.isLoading ? (
        <p>Loading ...</p>
      ) : (
        <List list={stories.data} onDelete={onDelete} />
      )}
    </div>
  );
}

export default App;
