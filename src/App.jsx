import { useState, useEffect } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './Appwrite/Auth'
import store from './store/store'
import { login, logout } from './store/authSlice'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'

function App() {
  
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login(userData))
      }else{
        dispatch(logout())
      }
    })
    .finally(() => {
      setLoading(false)
    })
  
    
  }, [])
  
  return !loading ? (
    <div className='min-h-sc flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>{/* outlet */}</main>
        <Footer />
      </div>
    </div>
  ) : (null)
}

export default App
 