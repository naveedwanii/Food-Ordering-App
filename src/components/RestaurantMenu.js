
import { useEffect, useState } from 'react'
import Shimmer from './Shimmer/Shimmer'
import { useParams } from 'react-router-dom'
import useRestaurantMenu from '../utils/useRestaurantMenu'
import RestaurantCategory from './RestaurantCategory'
// import { MENU_API } from '../utils/constants'


const RestaurantMenu = () => {
    // const [resInfo, setResInfo] = useState(null)
    // useEffect(() => {
    //     fetchMenu()
    // })
    // // const params = useParams()
    // // console.log(params)
    // const { resId } = useParams()

    // const fetchMenu = async () => {
    //     const data = await fetch(MENU_API+ resId)
    //     const json = await data.json()
    //     // console.log(json)
    //     setResInfo(json.data)
    // }
    const {resId} = useParams()
    const resInfo = useRestaurantMenu(resId)
    const [showIndex, setShowIndex] = useState(null)

    if(resInfo === null) return <Shimmer />
    const { name, cuisines, costForTwoMessage } = resInfo?.cards[0]?.card?.card?.info
    // const { itemCards } = resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card
    // console.log(itemCards)
    console.log('res-info', resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards)
    const categories =
      resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (c) =>
            c.card?.["card"]?.["@type"] ==
        'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory'
    )
    //   console.log(categories)
        return (
            <div className='text-center'>
                <h1 className='font-bold my-6 text-2xl'>{name}</h1>
                <p className='font-bold text-lg'>{cuisines.join(',')} - { costForTwoMessage }</p>
                {/* <h3>{costForTwoMessage }</h3> */}
                {/* <h1>{resInfo?.cards[0]?.card?.card?.info?.name}</h1> */}
                {/* <h2>Menu</h2>
                <ul>
                    {itemCards.map(itemCard =>
                        <li> key={itemCard.card.info.id}
                            {itemCard.card.info.name} - {'Rs.'}
                            {itemCard.card.info.price || itemCard.card.info.defaultPrice}
                        </li>
                       
                    )}
                     <li>{itemCards[0].card.info.name}</li>
                    <li>{itemCards[1].card.info.name}</li>
                    <li>{itemCards[2].card.info.name}</li> 
                </ul> */}
                {
                    categories.map((category, index) => 
                     <RestaurantCategory
                        key={category?.card?.card?.title}
                        data={category?.card?.card}
                        showItems={index === showIndex ? true : false}
                        setShowIndex={() => setShowIndex(index)}
                        />
                    )
                }
            </div>
        )
    }

export default RestaurantMenu
