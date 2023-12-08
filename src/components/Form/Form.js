import React, { useRef, useContext } from "react"
import MyContext from "../cotext/context"
const Form = () => {
  const { setMyInventory, url, updateInventory } = useContext(MyContext)

  const nameRef = useRef()
  const desRef = useRef()
  const priceRef = useRef()
  const qntRef = useRef()
  const addProduct = () => {
    fetch(`${url}/products`)
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
      })
      .then(async (data) => {
        const findItem = data.find(
          (data) => data.name === nameRef.current.value
        )
        if (findItem) {
          console.log(findItem)
          fetch(`${url}/products/${findItem._id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: nameRef.current.value,
              price: priceRef.current.value,
              qnt: parseInt(findItem.qnt) + parseInt(qntRef.current.value),
              des: desRef.current.value,
            }),
          }).then((res) => {
            updateInventory()
          })
        } else {
          console.log(url)
          await fetch(`${url}/products`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: nameRef.current.value,
              price: priceRef.current.value,
              qnt: qntRef.current.value,
              des: desRef.current.value,
            }),
          })
          updateInventory()
        }
      })
  }
  return (
    <div className="">
      <form className="bg-white shadow-md w-[100%] flex justify-center rounded mt-6 pb-2">
        <div className="bg-slate-400 py-2 px-6 mr-3 rounded mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="name"
          >
            Medicine Name
          </label>
          <input
            type="text"
            id="name"
            ref={nameRef}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter name"
          />
        </div>
        <div className="bg-slate-400 mr-3 py-2 px-3 rounded mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            ref={desRef}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Description"
          />
        </div>
        <div className="bg-slate-400 mr-3 w-[10%]  py-2 px-3 rounded mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="price"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            ref={priceRef}
            className="border rounded w-[100%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Price"
          />
        </div>
        <div className="bg-slate-400 mr-3  w-[10%] py-2 px-3 rounded mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="qnt"
          >
            Quantity
          </label>
          <input
            type="number"
            id="qnt"
            ref={qntRef}
            className="border rounded w-[100%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Quantity"
          />
        </div>

        <div className="mt-5">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={addProduct}
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  )
}

export default Form
