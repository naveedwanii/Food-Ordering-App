import { useContext } from 'react'
import { CDN_URL } from '../utils/constants'
import UserContext from '../utils/UserContext'


const RestaurantCard = ({ resData }) => {
  // console.log(props)
  // const { resName, cuisine } = props
  // console.log(props)
  // const {resData} = props
  const {loggedInUser} = useContext(UserContext)
  const {name, cuisines, avgRating, cloudinaryImageId} = resData?.info
  return (
    <div className='m-4 p-5 w-[250px] h-[350px] rounded-lg bg-slate-100 hover:bg-gray-200'>
      <img className='rounded-lg h-[200px] w-[200px]' alt='res-logo' src={CDN_URL + cloudinaryImageId} />
      {/* <h3>{resData.card.info.name }</h3>
      <h4>{resData.card.info.cuisines.join(",") }</h4>
      <h4>{resData.card.info.avgRating}</h4> */}
      {/* <h4>38 minutes</h4> */}
      <h3 className='font-bold py-4 text-lg'>{name}</h3>
      <h4>{cuisines.join(",") }</h4>
      <h4>{avgRating}</h4> 
      <h4>User: {loggedInUser }</h4>
      
    </div>
  )
}


// Higher Order Component

// inpuy - RestaurantCard => RestaurantCardPromoted -> alias locality

export const withLocalityLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label className='absolute bg-black text-white m-2 p-2 rounded-lg'>Locality</label>
        <RestaurantCard {...props} />
      </div>
    )
  }
}
export default RestaurantCard