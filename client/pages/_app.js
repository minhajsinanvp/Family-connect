import {UserProvider} from "../context"

import "antd/dist/reset.css";
import "bootstrap/dist/css/bootstrap.min.css"
import Nav from "../components/Nav";

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function MyApp({ Component, pageProps }) {
  return (
   <UserProvider>
     <>
      
      <Nav  />
      <ToastContainer position="top-center" autoClose={1000}/>
      <Component {...pageProps} />

     

  </>
   </UserProvider>
  )
}