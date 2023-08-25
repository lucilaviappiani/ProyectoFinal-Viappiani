import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom'; 
import ItemCount from './ItemCount';
import Card from 'react-bootstrap/Card';
import { Carousel} from 'react-bootstrap';
import { CartContext } from '../context/CartContext';


//recibe los productos por props
const ItemDetail = ({ productos }) => {

  //estado donde se almacenará la cantidad agregada de ese producto
  const [quantityAdded, setQuantityAdded] = useState(0)

  const {addItem} = useContext(CartContext)
  const handleOnAdd = (quantity) => {
    setQuantityAdded(quantity)

    const { id, nombre, description, price } = productos;


    const item = {
      id, nombre, description, price
    }

    addItem(item, quantity)
  }


  //los mapea. Por cada iteración renderiza un nuevo componente.
  return (
    <div className="ItemListContainer">
          <div key={productos.id}>
            <Card className="ItemCard" style={{ width: '30rem' }}>
              <Card.Body className='CardBody'>
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
                <Card.Title>{productos.nombre}</Card.Title>
                <Card.Text>{productos.detail}</Card.Text>
                <Card.Text> US$ {productos.price}</Card.Text>
                <div>
                  {
                    quantityAdded > 0 ? (<Link to={"/cart"}> <button className='CounterButton'> ¡Product added! Go to cart</button></Link>)
                  : (<ItemCount initial={1} onAdd={handleOnAdd} />)
                  }
                </div>
              </Card.Body>
            </Card>
          </div>
    </div>
  )
}

export default ItemDetail
