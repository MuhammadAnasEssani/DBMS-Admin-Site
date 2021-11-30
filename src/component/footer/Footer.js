import React from "react";
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom';

export default function Footer() {
  const state = useSelector((state) => state);
  const authState = state.AuthReducer.user;
  return (
    <>
      {authState.token != null ? (
         <footer id="footer" className="footer">
         <div className="container">
           <div className="copyright">
             &copy; Copyright{" "}
             <strong>
               <span>Papersmates.com</span>
             </strong>
             . All Rights Reserved
           </div>
           {/* <div className="credits"></div> */}
         </div>
       </footer>
      
    
      ) : null}
    </>
  );
}
