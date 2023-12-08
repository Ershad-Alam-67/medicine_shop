import Form from "./components/Form/Form"
import "./App.css"
import Header from "./components/Header/Header"
import Inventory from "./components/Inventory/Inventory"
import DataProvider from "./components/cotext/DataProvider"
import CartModal from "./components/cart/CartModal"
import { useState } from "react"
function App() {
  const [showModal, setShowModal] = useState(false)
  const showModalHandler = () => {
    setShowModal((pre) => !pre)
  }
  return (
    <DataProvider>
      <div className="App  ">
        {showModal && <CartModal></CartModal>}
        <Header showModalHandler={showModalHandler} />
        <Form />
        <Inventory />
      </div>
    </DataProvider>
  )
}

export default App
