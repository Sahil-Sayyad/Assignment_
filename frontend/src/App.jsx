import { useState } from 'react'
import './App.css'
import TransactionDashboard from './components/TransactionDashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TransactionDashboard/>
    </>
  )
}

export default App
