import React, { useState, useEffect } from 'react';
import List from './List'
import Search from './Search'


const list = [
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
    localStorage.getItem('search') || 'r'
  )

  useEffect(() => {
    localStorage.setItem('search', searchValue)
  })

  return [searchValue, setSearchValue]
}

function App() {

  const [searchValue, setSearchValue] = useCustomHook()

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
      />
      <hr />
      <List
        list={listFiltered}
      />
    </>
  )
}

export default App