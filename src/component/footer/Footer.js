import React from "react";
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom';

export default function Footer() {
  const auth = useSelector((state) => state.auth);
  return (
    <>
         <footer id="footer" className="footer">
         <div className="container">
           <div className="copyright">
             &copy; Copyright{" "}
             <strong>
               <span>Multivendor.com</span>
             </strong>
             . All Rights Reserved
           </div>
           {/* <div className="credits"></div> */}
         </div>
       </footer>
    </>
  );
}
