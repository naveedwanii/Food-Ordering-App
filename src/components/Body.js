import RestaurantCard, {withLocalityLabel} from "./RestaurantCard"
// import { resList } from '../utils/mockData'
import { useState, useEffect, useContext } from 'react'
import Shimmer from "./Shimmer/Shimmer"
import { Link } from "react-router-dom"
import useOnlineStatus from "../utils/useOnlineStatus"
import UserContext from "../utils/UserContext"

const Body = () => {
    // Local State Variable
    // Let's use the mock data
  const [listOfRestaurants, setListOfRestaurant] = useState([])
  const [searchText, setSearchText] = useState('')
  const [filteredRestaurant, setFilteredRestaurant] = useState([])
  console.log('Body Rendered', listOfRestaurants)
  
  const RestaurantCardLabel = withLocalityLabel(RestaurantCard)

  useEffect(() => {
     fetchData()
  }, [])

  const fetchData = async () => {
    //('https://www.swiggy.com/dapi/restaurants/list/v5?lat=34.1516846&lng=74.8762972&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING')
    const data = await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=34.0836708&lng=74.7972825&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING')
    const json = await data.json()
    // console.log(json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants)
    setListOfRestaurant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
    setFilteredRestaurant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
  }

  
    
  // return listOfRestaurants.length === 0 ? ( <Shimmer /> ) :
  const onlinestatus = useOnlineStatus()

  if (onlinestatus === false) 
    return <h1>Look like you're offline!! Please check your connection</h1>
  
  // const { loggedInUser, setUserName} = useContext(UserContext);
  // if (listOfRestaurants.length === 0) {
  //   // return <h1>Loading ...</h1>
  //   return <Shimmer />
  // }
  
  return listOfRestaurants.length === 0 ? ( <Shimmer /> ) : (
    <div className='body'>
      {/* <div className='search'>Search</div> */}
      <div className="filter-texts flex">
          <div className="search m-4 p-4">
              <input type='text' className="border border-solid border-black" value={searchText} onChange={ (e) => { setSearchText(e.target.value)}} />
                <button className="px-4 py-2 bg-green-100 m-4 rounded-lg" onClick={() => {
                        // Filter the restaurant cards and upate the list of cards
                        console.log(searchText)

                        const filteredRestaurant = listOfRestaurants.filter(
                          (res) => res.info.name.toLowerCase().includes(searchText.toLowerCase())
                        )
                        setFilteredRestaurant(filteredRestaurant)
                  }}>Search</button>
              <div className='filter-btn'>
                <button className='px-4 py-2 bg-gray-50' onClick={() => {
                                //   { console.log('Button Clicked') }
                                
                                const filteredList = listOfRestaurants.filter((res) => res.avgRating > 4)
                                setListOfRestaurant(filteredList)
                                // console.log(listOfRestaurants)
                      }}>
                        Top Rated Restaurant
                </button>    
          </div>  
         
        </div>
         {/* <div className="search m-4 p-4">
          <label>UserName</label> 
          <input className="border border-black" value={loggedInUser}  onChange={(e) => setUserName(e.target.value)} />
          </div> */}
        
      </div>
       <div className='flex flex-wrap'>
        {
           filteredRestaurant.map((restaurant) => (
             <Link
               key={restaurant.info.id}
               to={'/restaurants/' + restaurant.info.id}
             >
               {/* if the restaurant is locality then add a locality label to it.*/
                 restaurant.info.locality ? (
                   <RestaurantCardLabel resData={restaurant} />
                 ) : (
                   <RestaurantCard key={restaurant.info.id} resData={restaurant} />
                 )}
            </Link>
         ))
       }   
      </div>
    </div>
  )
}
export default Body


