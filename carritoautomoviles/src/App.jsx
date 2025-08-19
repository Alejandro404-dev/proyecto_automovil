import { useState } from "react"
import Automovil from "./components/Automovil"
import Header from "./components/Header"
import db from "./data/db"


function App() {

  const data = db

  const [cart,setCart]=useState([])

  function addToCart(item) {
    
    const itemExist = cart.findIndex(automovil => automovil.id === item.id)

    if (itemExist >= 0) {
      const updateCart = [...cart] /**una constante que es igual a una copia del carrito que almenos tiene un item */
      updateCart[itemExist].quantity++ /**como verificamos que el inten existe se agrega uno cada que hagamos click */
      setCart(updateCart)

    } else{
      item.quantity = 1
      setCart([...cart, item]) /**se hace una copia del carrito y se agrega un nuevo item */


    }
    
  }
  

  return (
    <>
      <Header
      cart={cart}
      
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Automóviles disponibles</h2>
        <div className="row mt-5">

          {data.map((automovil) => (
            <Automovil
              key={automovil.id}
              automovil={automovil}
              setCart={setCart}
              addToCart={addToCart}
            />
          ))}
        </div>




      </main>

      <footer className="mt-5 py-5">
        <div className="container-xl">
          <p className="text-center fs-6 mt-4 m-md-0 text-muted">© 2024 Super Carros, Inc</p>
        </div>
      </footer>

    </>
  )
}

export default App
