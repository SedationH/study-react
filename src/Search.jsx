import React, { useEffect } from 'react'

function Search({
  handleInputChange,
  value
}) {
  const inputRef = React.useRef()
  /**
   * 一个重要的理解就是在加载一个组件的时候，整个函数都是重新执行的，一些use方法
   * 提供了变化中不变化的方法
   */
  useEffect(() => {
    console.log('focus')
    inputRef.current.focus()
  }, [inputRef])


  return (
    <>
      <label htmlFor="search" >Search: </label>
      <input
        ref={inputRef}
        type="text"
        id="search"
        onChange={handleInputChange}
        value={value}
      />
    </>
  )
}

export default Search