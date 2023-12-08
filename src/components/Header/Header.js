import React, { useContext, useState, useEffect } from "react"
import cart from "../../assets/cart_icon.png"
import MyContext from "../cotext/context"

const Header = (props) => {
  const { myCart } = useContext(MyContext)
  const [totalItems, setTotalItems] = useState(0)

  useEffect(() => {
    let total = 0
    myCart.forEach((element) => {
      total = total + (parseInt(element.qnt) || 0)
    })
    console.log("cart", myCart)
    setTotalItems(total || 0)
  }, [myCart])

  return (
    <header className="w-[100%] pb-5 p-3 bg-slate-500 flex justify-between text-xl black text-zinc-900 font-bold text-center">
      <h1 className="ml-[40%] text-white"> XYZ Medicine Shop</h1>
      <div className="w-48 flex justify-center shadow-md h-9 mr-4 items-center rounded-3xl bg-pink-500">
        <button
          onClick={props.showModalHandler}
          className="flex p-3 font-bold text-white"
        >
          <div>
            <img src={cart} className="mr-2 w-7 h-7" alt="Cart Icon" />
          </div>
          <h1 className="font-medium">Cart</h1>
          <div className="bg-blue-500 w-8 rounded-2xl ml-2">{totalItems}</div>
        </button>
      </div>
    </header>
  )
}

export default Header
