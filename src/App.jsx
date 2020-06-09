import React, { useState, useEffect } from 'react';
import List from './List'
import Search from './Search'


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
    }, 2000)
  })
)

function App() {

  const [searchValue, setSearchValue] = useCustomHook()
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    getAsyncStories()
      .then(
        res => {
          setLoading(false)
          setList(res)
          throw Error(1)
        }
      )
      .catch(
        reason => {
          console.log(Error(reason))
          setError(true)
        }
      )
  })

  const handleInputChange = e => {
    setSearchValue(e.target.value)
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
      />
    </>
  )
}

export default App