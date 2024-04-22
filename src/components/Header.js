import { LOGO_URL } from '../utils/constants'
import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import useOnlineStatus from '../utils/useOnlineStatus'
import UserContext from '../utils/UserContext'
import { useSelector } from 'react-redux'


const Header = () => {
  // let btnName = 'Login'
  const [btnName, setBtnName] = useState('Login')

  const onlineStatus = useOnlineStatus()

  const {loggedInUser} = useContext(UserContext)
  console.log(loggedInUser)
  // Subscribing to the store using a Selector

  const cartItems = useSelector((store) => store.cart.items)
  console.log(cartItems)
  // console.log('Header render')

  // btnName = calling the rendering function once again.
  // If no dependency array => useEffect is called on every render.
  // If dependency array is empty = [] => useEffect is called on initial render, just once
  // If dependency array is [btnName] => called everytime btnName is updated
  // useEffect(() => {
  //   console.log('useEffect called')
  // },[btnName])
  return (
    <div className='flex justify-between bg-pink-200 shadow-lg sm:bg-yellow-50 lg:bg-green-50'>
      <div className='logo-container'>
              <img
                  className='w-24'
                  src={LOGO_URL} />
      </div>
      <div className='flex items-center'>
        <ul className='flex p-4 m-4'>
          <li className='px-4'>Online Status: {onlineStatus ?  '✅' : '🔴'}</li>
          <li className='px-4'><Link to='/'>Home</Link></li>
          <li className='px-4'>
            <a href='/about'>
                  About Us
            </a>  
          </li>
          <li className='px-4'>
            <Link to='/contact'>  Contact Us</Link>        
          </li>
          <li className='px-4 font-bold text-xl'>
             <Link to='/cart'>Cart - ({cartItems.length} items)</Link>
           
          </li>
          <li className='px-4 font-bold'>{loggedInUser}</li>
          <button className='login' onClick={() => {
            // setBtnName('Logout')
            btnName === 'Login' ? setBtnName('Logout') : setBtnName('Login')
          }}>{btnName
          }</button>
         </ul>
      </div>
    </div>
  )
}

export default Header