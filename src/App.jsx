import React, { useReducer, useState, useEffect } from 'react';
import List from './List'
import Search from './Search'
import TryReducer from './TryReducer'


const initialList = [
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

const useCustomHook = () => {
  const [searchValue, setSearchValue] = useState(
    localStorage.getItem('search') || ''
  )

  useEffect(() => {
    localStorage.setItem('search', searchValue)
  })

  return [searchValue, setSearchValue]
}

const getAsyncStories = () => (
  new Promise(resolve => {
    setTimeout(() => {
      resolve(initialList)
    }, 100)
  })
)

const listReducer = (state, action) => {
  console.log(state, action)
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'REMOVE':
      return state.filter(item => item.objectID !== action.objectID)
    default:
      return state
  }
}

function App() {

  const [searchValue, setSearchValue] = useCustomHook()
  const [list, ListDispatch] = useReducer(listReducer, [])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    getAsyncStories()
      .then(
        res => {
          setLoading(false)
          ListDispatch({ type: 'SET', payload: res })
        }
      )
      .catch(
        reason => {
          console.log(Error(reason))
          setError(true)
        }
      )
  }, [])
  // 如果[]省略，那么每次都会重新发起异步请求

  const handleInputChange = e => {
    setSearchValue(e.target.value)
  }

  const handleButtonClick = objectID => {
    ListDispatch({
      type: 'REMOVE',
      objectID
    })
  }

  const listFiltered = list.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))

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
        loading={loading}
        list={listFiltered}
        error={error}
        handleButtonClick={handleButtonClick}
      />
      <hr />
      <TryReducer />
    </>
  )
}

export default App