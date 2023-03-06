import {BrowserRouter,Routes,Route,Navigate, Outlet} from 'react-router-dom';
import Login from './components/account/Login';
import DataProvider from './context/DataProvider';
import Home from './components/home/Home';
import Header from './components/header/Header';
import CreatePost from './components/create/CreatePost';
import { useState } from 'react';



const PrivateRoute=({isAuthenticated,...props})=>{
  return isAuthenticated ?
  <>
  <Header/>
    <Outlet />
  </>
  : <Navigate replace to='/login'/>
}




function App() {
  const [isAuthenticated,isUserAuthenticated] =useState(false);
  return (
    
    <DataProvider>
    <BrowserRouter>
   
    <div style={{marginTop:"100px"}}>
    <Routes>

     <Route path='/login' element={<Login isUserAuthenticated={isUserAuthenticated}/>}/>

     <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
     <Route path='/' element={<Home/>}/>
     </Route>

     <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
     <Route path='/create' element={<CreatePost/>}/>
     </Route>
   
     </Routes>
     </div>
     </BrowserRouter>
   </DataProvider>
  
  );
}

export default App;
