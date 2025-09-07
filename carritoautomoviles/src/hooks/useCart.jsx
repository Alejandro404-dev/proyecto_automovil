import { useState, useEffect } from 'react'
import db from '../data/db'

const useCart = () => {

    const initailCart = () => {
        const localStoregeCart = localStorage.getItem('cart') /**se obtiene el carrito del local storage */
        return localStoregeCart ? JSON.parse(localStoregeCart) : [] /**si existe el carrito se parsea y se retorna, si no existe se retorna un array vacio */
    }

    const data = db /**se crea una constante que es igual a la base de datos (se llama a la base de datos)*/


    /**se crea un estado para el carrito de compras */
    const [cart, setCart] = useState(initailCart)
    const MIN_ITEMS = 1
    const MAX_ITEMS = 10

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart)) /**se guarda el carrito en el local storage cada que el carrito cambie  */
    }, [cart])

    /**funcion para agregar un item al carrito */
    /**se crea una funcion que recibe un item y verifica si ya existe en el carrito */
    function addToCart(item) {

        const itemExist = cart.findIndex(automovil => automovil.id === item.id)

        if (itemExist >= 0) {
            const updateCart = [...cart] /**una constante que es igual a una copia del carrito que almenos tiene un item */
            updateCart[itemExist].quantity++ /**como verificamos que el item existe se agrega uno cada que hagamos click */
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

    /**funcion para aumentar o disminuir la cantidad de un item en el carrito */
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

    function clearCart() {
        setCart([]) /**se limpia el carrito */
    }


    const cartTotal = cart.reduce((total, { quantity, price }) => { return total + (quantity * price) }, 0) /** se utiliza reduce para sumar el total del carrito, se multiplica la cantidad por el precio de cada item y se acumula en total */
    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        clearCart,
        cartTotal
    }

}

export default useCart