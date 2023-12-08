import React, { useContext, useRef, useState } from "react"
import MyContext from "../cotext/context"
const Inventory = () => {
  const { myInventory, url, myCart, updateCart, updateInventory } =
    useContext(MyContext)
  const qntRef = useRef()

  const addToCart = async (name) => {
    const findItem = myCart.find((item) => item.name === name)
    const lookInInventory = myInventory.find((item) => item.name === name)
    if (lookInInventory.qnt < qntRef.current.value) {
      return alert("insufficient items")
    }

    if (findItem) {
      await fetch(`${url}/cart`)
        .then((res) => res.json())
        .then((data) => {
          const getItem = data.find((item) => item.name === name)

          fetch(`${url}/cart/${getItem._id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: getItem.name,
              price: getItem.price,
              qnt: parseInt(qntRef.current.value) + parseInt(getItem.qnt),
              des: getItem.des,
            }),
          }).then((res) => {
            updateCart()
          })
        })
    } else {
      const getItem = myInventory.find((item) => item.name === name)

      fetch(`${url}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: getItem.name,
          price: getItem.price,
          qnt: qntRef.current.value,
          des: getItem.des,
        }),
      }).then((res) => {
        if (res.ok) {
          updateCart()
        }
      })
    }
    const itemInInventory = myInventory.find((item) => item.name === name)
    fetch(`${url}/products/${itemInInventory._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: lookInInventory.name,
        price: lookInInventory.price,
        qnt: parseInt(lookInInventory.qnt) - parseInt(qntRef.current.value),
        des: lookInInventory.des,
      }),
    }).then(() => {
      updateInventory()
    })
  }

  // const addToCart = (name) => {
  //   const getCart = fetch(
  //     "https://crudcrud.com/api/a92c6965cf9f4f659d58d02d58b75e8a/cart"
  //   )
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json()
  //       }
  //     })
  //     .then(async (data) => {
  //       const findItem = data.find((item) => item.name === name)
  //       if (findItem) {
  //         await fetch(
  //           `https://crudcrud.com/api/a92c6965cf9f4f659d58d02d58b75e8a/cart/${findItem._id}`,
  //           {
  //             method: "PUT",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify({
  //               name: findItem.name,
  //               des: findItem.des,
  //               price: findItem.price,
  //               qnt: parseInt(findItem.qnt) + parseInt(itemQuantities[name]),
  //             }),
  //           }
  //         )
  //       } else {
  //         const itemToAdd = myInventory.find((item) => item.name === name)
  //         console.log(itemToAdd)
  //         const postItem = fetch(
  //           "https://crudcrud.com/api/a92c6965cf9f4f659d58d02d58b75e8a/cart",
  //           {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify({
  //               name: itemToAdd.name,
  //               des: itemToAdd.des,
  //               price: itemToAdd.price,
  //               qnt: parseInt(itemQuantities[name]),
  //             }),
  //           }
  //         )
  //       }
  //     })
  // }

  // const handleQuantityChange = (name, value) => {
  //   setItemQuantities({ ...itemQuantities, [name]: value })
  // }

  return (
    <div className=" flex  justify-center mt-8">
      <div className=" bg-slate-600 p-4  flex rounded-md justify-center w-[70%]">
        <ul className=" w-[100%] border-slate-400  rounded-md border-solid ">
          <li className="flex  px-2  text-white border-slate-600 border-solid border-2  rounded-md w-[100%]">
            <div className="flex  w-[21%] items-center">
              <div className="w-[100%]   ">
                <h1 className="font-bold">Name</h1>
              </div>
            </div>
            <div className="flex  font-bold   w-[30%] items-center">
              <div className="w-[100%] ml-2  ">
                <h1>Description</h1>
              </div>
            </div>
            <div className="flex font-bold   w-[15%] items-center">
              <div className="w-[100%] flex justify-end  whitespace-pre-wrap">
                <h1>Price</h1>
              </div>
            </div>
            <div className="flex  font-bold w-[15%] items-center">
              <div className="w-[100%] flex justify-end  whitespace-pre-wrap">
                <h1>Quantity</h1>
              </div>
            </div>
          </li>
          {myInventory
            .filter((item) => item.qnt !== 0)
            .map((item) => {
              return (
                <li className="flex p-1 px-2 justify-between bg-pink-200 border-slate-600 border-solid border-2  rounded-md w-[100%]">
                  <div className="flex   w-[20%] items-center">
                    <div className="w-[100%] text-black  ">
                      <h1 className="text-black">{item.name}</h1>
                    </div>
                  </div>
                  <div className="flex   w-[30%] items-center">
                    <div className="w-[100%]  ">
                      <h1>{item.des}</h1>
                    </div>
                  </div>
                  <div className="flex   w-[10%] items-center">
                    <div className="w-[100%] flex justify-end  whitespace-pre-wrap">
                      <h1>{item.price}</h1>
                    </div>
                  </div>
                  <div className="flex   w-[10%] items-center">
                    <div className="w-[100%] flex justify-end  whitespace-pre-wrap">
                      <h1>{item.qnt}</h1>
                    </div>
                  </div>
                  <div className="flex   w-[10%] items-center">
                    <div className="w-[100%] flex justify-end  whitespace-pre-wrap">
                      <input
                        className=" w-[60%] rounded-sm focus:outline-none p-1 text-sm "
                        type="number"
                        ref={qntRef}
                      ></input>
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={() => {
                        addToCart(item.name)
                      }}
                      className=" p-3 py-2 font-bold text-sm text-white bg-slate-500 rounded-md "
                    >
                      Add Item
                    </button>
                  </div>
                </li>
              )
            })}
        </ul>
      </div>
    </div>
  )
}

export default Inventory
