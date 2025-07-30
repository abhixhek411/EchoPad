import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
    className='inline-bock px-6 py-2 rounded-lg transform transition-all duration-500 hover:scale-1.2 hover:shadow-lg duration-400 ease-in-out  hover:bg-green-100'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn