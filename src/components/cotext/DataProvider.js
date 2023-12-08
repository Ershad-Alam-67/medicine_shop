import React, { useState, useEffect } from "react"
import MyContext from "./context"
const DataProvider = (props) => {
  const [myInventory, setMyInventory] = useState([])
  const [myCart, setMyCart] = useState([])
  const url = "https://crudcrud.com/api/7507fc144795415da717a7213cb94a69"
  useEffect(() => {
    fetch(`${url}/products`)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setMyInventory(data)
      })
    fetch(`${url}/cart`)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setMyCart(data)
      })
  }, [])
  const updateCart = () => {
    fetch(`${url}/cart`)
      .then((res) => {
        if (res.ok) return res.json()
      })
      .then((data) => {
        setMyCart(data)
      })
  }
  const updateInventory = () => {
    fetch(`${url}/products`)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        console.log("pro", data)
        setMyInventory(data)
      })
  }
  // useEffect(() => {
  //   const getCart = fetch(
  //     "https://crudcrud.com/api/a92c6965cf9f4f659d58d02d58b75e8a/cart"
  //   )
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json()
  //       }
  //     })
  //     .then((data) => {
  //       setMyCart(data)
  //     })
  // }, [])

  // const myCartHandler = (newItem) => {
  //   setMyCart((pre) => {
  //     return [...pre, newItem]
  //   })
  // }
  // console.log(myInventory)
  // console.log(myCart)
  // const myInventoryHandler = (newItem) => {
  //   setMyInventory((pre) => {
  //     return [...pre, newItem]
  //   })
  // }

  return (
    <MyContext.Provider
      value={{
        myInventory,
        updateCart,
        updateInventory,
        myCart,
        url,
      }}
    >
      {props.children}
    </MyContext.Provider>
  )
}

export default DataProvider
