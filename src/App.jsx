import React, { useReducer, useState, useEffect, useCallback, useRef } from 'react';
import './App.css'
import List from './List'
import Search from './Search'
import Axios from 'axios';
const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

/**
 * 第一次便是获取上一次的值,没必要进行保存
 */
const useCustomHook = () => {

  const isMounted = useRef(false)

  const [searchValue, setSearchValue] = useState(
    localStorage.getItem('search') || ''
  )

  useEffect(() => {
    if (isMounted.current === false) {
      isMounted.current = true
    } else {
      localStorage.setItem('search', searchValue)
    }
  }, [searchValue])

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
  console.log(action.type)
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
  console.log('APP')
  const isFirst = useRef(true)

  const [searchValue, setSearchValue] = useCustomHook()

  const [stories, dispatchStories] = useReducer(
    storiesReducer,
    { data: [], isLoading: false, isError: false }
  );
  const [url, setUrl] = useState(`${API_ENDPOINT + searchValue}`)

  const { isLoading, data, isError } = stories

  const handleFetchStories = useCallback(() => {
    if (isFirst.current) {
      dispatchStories({ type: 'STORIES_FETCH_INIT' });
      isFirst.current = false
    }

    Axios(url)
      .then(result => {
        dispatchStories({
          type: 'STORIES_FETCH_SUCCESS',
          payload: result.data.hits,
        });
      })
      .catch(() =>
        dispatchStories({ type: 'STORIES_FETCH_FAILURE' })
      );
  }, [url])

  useEffect(() => {
    handleFetchStories()
  }, [handleFetchStories]);

  const handleInputChange = e => {
    setSearchValue(e.target.value)
  }

  /**
   * 传入List组件的props在仅仅输入input内容的时候就不需要进行全部渲染了
   */
  const handleButtonClick = useCallback(item => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  }, [])
  const handleSearchClick = e => {
    setUrl(API_ENDPOINT + searchValue)
    e.preventDefault()
  }

  return (
    <div className="container">
      <h1 className="headline-primary">My Hacker Stories</h1>
      <Search
        handleInputChange={handleInputChange}
        value={searchValue}
        handleSearchClick={handleSearchClick}
      >
        <strong>Search: </strong>
      </Search>
      {
        isError ?
          <strong>Error</strong> :
          <List
            loading={isLoading}
            list={data}
            handleButtonClick={handleButtonClick}
          />
      }
    </div>
  )
}

export default App