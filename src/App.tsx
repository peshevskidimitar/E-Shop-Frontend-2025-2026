import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import ProductsPage from './ui/pages/ProductsPage/ProductsPage.tsx';
import Layout from './ui/components/layout/Layout/Layout.tsx';
import HomePage from './ui/pages/HomePage/HomePage.tsx';
import ProductDetailsPage from './ui/pages/ProductDetailsPage/ProductDetailsPage.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<HomePage/>}/>
          <Route path='products' element={<ProductsPage/>}/>
          <Route path='products/:id' element={<ProductDetailsPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
