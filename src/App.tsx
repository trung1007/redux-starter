import { useState } from 'react'
import reduxLogo from '/redux.svg'
import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './redux/store'
import { decrement, increment } from './redux/counter/counter.slide'

function App() {

  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <>
      <div>
        <a href="https://redux.js.org" target="_blank">
          <img src={reduxLogo} className="logo" alt="Redux logo" />
        </a>
      </div>
      <h1>Redux Starter</h1>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 20 }}>
        <h2>Counter: <span>{count}</span> </h2>
        <div style={{ display: 'flex', flexDirection: 'column', width: '50%', gap: 20 }}>
          <button onClick={() => dispatch(increment())}>Increase</button>
          <button onClick={() => dispatch(decrement())}>Decrease</button>
        </div>

      </div>

    </>
  )
}

export default App
