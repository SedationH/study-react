import React, { useReducer, useState, useEffect } from 'react';
import List from './List'
import Search from './Search'
const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

const useCustomHook = () => {
  const [searchValue, setSearchValue] = useState(
    localStorage.getItem('search') || ''
  )

  useEffect(() => {
    localStorage.setItem('search', searchValue)
  })

  return [searchValue, setSearchValue]
}
/**
 * loading error都是和list的获取相关的
 * 因此状态管理都放在一起更好管理
 * state ={
 *  list,
 *  loading,
 *  error
 * }
 */

const storiesReducer = (state, action) => {
  console.log(state, action)
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
          story => action.payload.objectID !== story.objectID
        ),
      };
    default:
      throw new Error();
  }
}

function App() {

  const [searchValue, setSearchValue] = useCustomHook()

  const [stories, dispatchStories] = useReducer(
    storiesReducer,
    { data: [], isLoading: false, isError: false }
  );

  const { isLoading, data, isError } = stories

  useEffect(() => {
    if (searchValue === '') return;
    dispatchStories({ type: 'STORIES_FETCH_INIT' });

    fetch(`${API_ENDPOINT}react`)
      .then(response => response.json())
      .then(result => {
        dispatchStories({
          type: 'STORIES_FETCH_SUCCESS',
          payload: result.hits,
        });
      })
      .catch(() =>
        dispatchStories({ type: 'STORIES_FETCH_FAILURE' })
      );
  }, [searchValue]);

  const handleInputChange = e => {
    setSearchValue(e.target.value)
  }

  const handleButtonClick = item => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  }

  const listFiltered = data.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))

  return (
    <>
      <h1>My Hacker Stories</h1>
      <Search
        handleInputChange={handleInputChange}
        value={searchValue}
      >
        <strong>Search: </strong>
      </Search>
      <hr />
      <List
        loading={isLoading}
        list={listFiltered}
        error={isError}
        handleButtonClick={handleButtonClick}
      />
    </>
  )
}

export default App