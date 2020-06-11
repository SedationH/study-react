import React from 'react'

function List({
  list,
  loading,
  handleButtonClick
}) {
  return (
    <div>
      {
        loading ?
          <div>Loading</div> :
          list.map(item => (
            <div key={item.objectID}  className="item">
              <span style={{ width: '40%' }}>
                <a href={item.url}>{item.title}</a>
              </span>
              <span style={{ width: '30%' }}>{item.author}</span>
              <span style={{ width: '10%' }}>{item.num_comments}</span>
              <span style={{ width: '10%' }}>{item.points}</span>
              <span style={{ width: '10%' }}>
                <button
                  type="button"
                  onClick={() => handleButtonClick(item)}
                  className="button button_small"
                >
                  Dismiss
                </button>
              </span>
            </div>
          ))
      }
    </div>
  )
}

export default List