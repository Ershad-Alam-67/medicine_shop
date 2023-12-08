import React, { useContext, useState, useEffect } from "react"
import ReactDOM from "react-dom"
import MyContext from "../cotext/context"

const CartModal = () => {
  const { myCart } = useContext(MyContext)
  const [GT, setGT] = useState(0)
  useEffect(() => {
    let tot = 0
    myCart.forEach((item) => {
      tot += parseFloat(item.price) * item.qnt
    })

    setGT(tot)
  }, [myCart])

  return ReactDOM.createPortal(
    <div className=" bg-slate-400  w-sreen inset-0 fixed flex justify-center  bg-opacity-70">
      <div className="bg-slate-900  rounded-md   p-4 py-3 opacity-100 w-[40%] mt-20 h-max ">
        <div className="  flex p-1 justify-between ">
          <ul className="text-white p-1  w-[25%]">
            <li className="text-white ml-2">Name</li>
            <li></li>
            {myCart.map((item) => {
              return <li className="p-[8px]">{item.name}</li>
            })}
          </ul>
          <ul className="text-white text-right p-2 py-1  w-[20%]">
            <li>Price</li>
            {myCart.map((item) => {
              return <li className="p-[8px]">{item.price}</li>
            })}
          </ul>

          <ul className="text-white w-[25%]    text-right   ">
            <li className="">Total</li>
            {myCart.map((item) => {
              return (
                <li className="p-[8px] ">
                  {parseFloat(item.price) * item.qnt}
                </li>
              )
            })}
          </ul>
        </div>
        <div className="text-white ml-[55%] text-xl">Grand Total: {GT}</div>
        <button className="bg-blue-500 rounded-md text-white text-sm p-2 mt-3 ml-[42%]">
          Print Bill
        </button>
      </div>
    </div>,
    document.getElementById("modal-root")
  )
}

export default CartModal
