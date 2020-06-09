import React from 'react'

function List({
  list,
  loading,
  error,
  handleButtonClick
}) {
  return (
    <>
      {
        error ?
          <strong>Error</strong> :
          (
            loading ?
              <div>Loading</div> :
              list.map(item => (
                <div key={item.objectID}>
                  <span>
                    <a href={item.url}>{item.title}</a>
                  </span>
                  <span>{item.author}</span>
                  <span>{item.num_comments}</span>
                  <span>{item.points}</span>
                  <button onClick={() => handleButtonClick(item.objectID)}>Remove</button>
                </div>
              ))
          )
      }
    </>
  )
}

export default List