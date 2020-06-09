import React, { useReducer } from 'react'

const cntReducer = (state, action) => {
  console.log(state, action)
  switch (action.type) {
    case "ADD":
      return state + 1
    case "DEC":
      return state - 1
    default:
      return state
  }
}

export default () => {

  const [state, dispatch] = useReducer(cntReducer, 0)

  return (
    <div>
      <button onClick={() => dispatch({ type: 'ADD' })}>ADD</button>
      <button onClick={() => dispatch({ type: 'DEC' })}>DEC</button><br />
      {state}
    </div>
  )
}