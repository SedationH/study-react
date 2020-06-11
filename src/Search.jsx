import React, { useEffect } from 'react'

function Search({
  handleInputChange,
  value,
  children,
  handleSearchClick
}) {
  console.log('Search')
  const inputRef = React.useRef()
  /**
   * 一个重要的理解就是在加载一个组件的时候，整个函数都是重新执行的，一些use方法
   * 提供了变化中不变化的方法
   */
  useEffect(() => {
    inputRef.current.focus()
  }, [inputRef])


  return (
    <>
      <form onSubmit={handleSearchClick} className="search-form">
        <label className="label" htmlFor="search" >{children}</label>
        <input
          ref={inputRef}
          type="text"
          id="search"
          onChange={handleInputChange}
          value={value}
          className="input"
        />
        <button type="submit" className="button button_large">Click Me</button>
      </form>
    </>
  )
}

export default Search