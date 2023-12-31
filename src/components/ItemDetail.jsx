import { useContext, useState, useEffect} from 'react';
import { Link } from 'react-router-dom'; 
import ItemCount from './ItemCount';
import Card from 'react-bootstrap/Card';
import { Carousel} from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import Loading from "./Loading";



//recibe los productos por props
const ItemDetail = ({ productos }) => {


  const [quantityAdded, setQuantityAdded] = useState(0)
  const [loading, setLoading] = useState(true)

  const {addItem} = useContext(CartContext)
  const handleOnAdd = (quantity) => {
    setQuantityAdded(quantity)

    const { id, nombre, description, price } = productos;

    const item = {
      id, nombre, description, price
    }

    addItem(item, quantity)
  }


  useEffect(() => {
    setTimeout(()=> {
    setLoading(false)
    },1500)
    }, [])

  
    if(loading){
      return <Loading/>
    }

    return (
    <>
      <div key={productos.id} className='itemDetailCard'>

        <Carousel>
          <Carousel.Item >
            <img src={productos.img} className="CarouselImg" text="First slide" />
          </Carousel.Item>
          <Carousel.Item >
            <img src={productos.img2} className="CarouselImg" text="First Second slide" />
          </Carousel.Item>
          <Carousel.Item >
            <img src={productos.img3} className="CarouselImg" text="First Second slide" />
          </Carousel.Item>
        </Carousel>
            <div className='itemDetailBody'>
            <Card.Text className='ItemTitle'>{productos.nombre}</Card.Text>
            <Card.Text className='ItemDescription'>{productos.detail}</Card.Text>
            <Card.Text className='ItemTitle'> US$ {productos.price}</Card.Text>
            <div>
              {
                quantityAdded > 0 ? (<Link to={"/cart"}> <button className='CounterButton'> ¡Product added! Go to cart</button></Link>)
                  : (<ItemCount initial={1} onAdd={handleOnAdd} />)
              }
            </div>
            </div>
      </div>
    </>
  )
}

export default ItemDetail
