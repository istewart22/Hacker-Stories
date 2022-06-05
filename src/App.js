import List from './List';
import InputWithLabel from './InputWithLabel';
import { useEffect, useReducer, useState } from 'react';

const useStorageState = (key, initialState) => {
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

function App() {
  const initialStories = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  const getAsyncStories = () =>
    new Promise((resolve) =>
      setTimeout(() => resolve({ data: { stories: initialStories } }), 500)
    );

  const [searchTerm, setSearchTerm] = useStorageState('search', '');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const storiesReducer = (state, action) => {
    switch (action.type) {
      case 'SET_STORIES':
        return action.payload;
      case 'REMOVE_STORY':
        return state.filter(
          (story) => action.payload.objectID !== story.objectID
        );
      default:
        throw new Error();
    }
  };

  const [stories, dispatchStories] = useReducer(storiesReducer, []);

  useEffect(() => {
    setIsLoading(true);
    getAsyncStories()
      .then((result) => {
        dispatchStories({
          type: 'SET_STORIES',
          payload: result.data.stories,
        });
        setIsLoading(false);
      })
      .catch(() => setIsError(true));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const onDelete = (item) => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  };

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <InputWithLabel
        id='search'
        value={searchTerm}
        onInputChange={handleSearch}
      >
        Search:
      </InputWithLabel>

      <hr />

      {isError && <p>Something went wrong ...</p>}

      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <List list={searchedStories} onDelete={onDelete} />
      )}
    </div>
  );
}

export default App;
