
import { BrowserRouter, Routes, Route } from "react-router-dom"
import NavbarCart from './Cmponents/NavbarCart';
import ProductPages from "./Cmponents/ProductsPage";



function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <NavbarCart />
        <Routes>

          <Route path='/' element={<ProductPages/>} />

        </Routes>

      </div>
    </BrowserRouter>
  )
}

export default App
