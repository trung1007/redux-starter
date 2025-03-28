
// import './App.css'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import NavbarHeader from './components/navbar'
import TabHeader from './components/tab'

function App() {

  // const count = useAppSelector((state) => state.counter)
  // // useSelector return an object represented a state
  // const dispatch = useAppDispatch()

  return (
    <>
      {/* <div>
        <img src={reduxLogo} className="logo" alt="Redux logo" />
      </div>
      <h1>Redux Starter</h1>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 20 }}>
        <h2>Counter: <span>{count.value}</span> </h2>
        <div style={{ display: 'flex', flexDirection: 'column', width: '50%', gap: 20 }}>
          <button onClick={() => dispatch(increment())}>Increase</button>
          <button onClick={() => dispatch(decrement())}>Decrease</button>
          <button onClick={() => dispatch(reset())}>Reset</button>
        </div>
      </div> */}
      <NavbarHeader />
      <div style={{display:'flex', flexDirection:'column', alignItems: 'center' }}>
        <div style={{ width: '68%' }}>
          <TabHeader />
        </div>
      </div>



    </>
  )
}

export default App
