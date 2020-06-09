import React from 'react'

function Search({
  handleInputChange,
  value
}) {
  return (
    <>
      <label htmlFor="search" >Search: </label>
      <input
        type="text"
        id="search"
        onChange={handleInputChange}
        value={value}
      />
    </>
  )
}

export default Search