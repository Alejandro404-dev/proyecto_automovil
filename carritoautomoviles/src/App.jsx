import { useState } from "react"
import Automovil from "./components/Automovil"
import Header from "./components/Header"
import db from "./data/db"


function App() {

  const data = db


  /**se crea un estado para el carrito de compras */
  const [cart, setCart] = useState([])
  const MIN_ITEMS=1
  const MAX_ITEMS=10

  /**funcion para agregar un item al carrito */
  /**se crea una funcion que recibe un item y verifica si ya existe en el carrito */
  function addToCart(item) {

    const itemExist = cart.findIndex(automovil => automovil.id === item.id)

    if (itemExist >= 0) {
      const updateCart = [...cart] /**una constante que es igual a una copia del carrito que almenos tiene un item */
      updateCart[itemExist].quantity++ /**como verificamos que el inten existe se agrega uno cada que hagamos click */
      setCart(updateCart)

    } else {
      item.quantity = 1
      setCart([...cart, item]) /**se hace una copia del carrito y se agrega un nuevo item si no hay nada en el carrito */
    }

  }
  /**funcion para eliminar un item del carrito */

  function removeFromCart(idElimiar) {
    setCart(preCart => preCart.filter(automovil => automovil.id !== idElimiar)) /**se crea una copia del carrito y se filtra el item que se quiere eliminar */

  }


  function decreaseQuantity(id) {
    const updatecart = cart.map(item => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return { ...item, quantity: item.quantity - 1 } /**si el id es igual al id del item que se quiere eliminar y la cantidad es mayor a 1 se resta uno */
      }
      return item /**si no se retorna el item */
    })
    setCart(updatecart)
  }

  function increaseQuantity(id) {
    const updatecart = cart.map(item => {
      if (item.id === id && item.quantity < MAX_ITEMS) { /**se verifica que la cantidad sea menor a 10 */
        return { ...item, quantity: item.quantity + 1 } /**si es asi se suma uno a la cantidad */
      }
      return item /**si no se retorna el item */
    })
    setCart(updatecart)
  }




  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}

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
