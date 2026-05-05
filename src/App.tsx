import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import ProductsPage from './ui/pages/product/ProductsPage/ProductsPage.tsx';
import Layout from './ui/components/layout/Layout/Layout.tsx';
import HomePage from './ui/pages/home/HomePage/HomePage.tsx';
import ProductDetailsPage from './ui/pages/product/ProductDetailsPage/ProductDetailsPage.tsx';
import RegisterPage from './ui/pages/auth/RegisterPage/RegisterPage.tsx';
import LoginPage from './ui/pages/auth/LoginPage/LoginPage.tsx';
import ProtectedRoute from './ui/components/routing/ProtectedRoute/ProtectedRoute.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/' element={<Layout/>}>
          <Route index element={<HomePage/>}/>
          <Route element={<ProtectedRoute/>}>
            <Route path='products' element={<ProductsPage/>}/>
            <Route path='products/:id' element={<ProductDetailsPage/>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
