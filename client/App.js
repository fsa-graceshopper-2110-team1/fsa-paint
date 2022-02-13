import React, {useState} from 'react'
import Navbar from './components/Navbar'
import Routes from './Routes'
import Button from '@mui/material/Button'
import { LoginModal } from './components/LoginModal'

const App = () => {
  const [showModal, setShowModal] = useState(false)
  const openModal = ()=>{
    setShowModal(prev =>!prev)
  }
  return (
    <div>
      <Navbar />
      <Button onClick={openModal}>Modal Toggle</Button>
      <LoginModal showModal={showModal} setShowModal={setShowModal}/>
      <Routes />
    </div>
  )
}

export default App


