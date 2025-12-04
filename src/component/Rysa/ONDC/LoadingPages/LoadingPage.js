"use client";
import React from 'react';
import "./LoadingPage.css";
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const LoadingPage = () => {
  return (
     <div className={`${roboto.className} waiting-table`}>
      <div className="loading-circle">
        <svg className="hourglass-icon" viewBox="0 0 24 24" fill="none">
          <path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6z" 
                fill="#6039D2" stroke="#6039D2" strokeWidth="2.5"/>
        </svg>
      </div>

      <div className="loading-text">
       <h3 style={{textAlign:"center"}}> <b>Please Wait...</b> </h3>
       <br></br>

       <p className='para'>Do not press the back button or refresh the page</p>
      </div>

        {/* Submit Button */}
              <div className="Long-button">
                <button
                  type="submit"
                  className="form-submit"
                >
                  Next
                </button>
              </div>

          {/* Submit Button */}
              {/* <div className="btnContainer">
                <button
                  type="submit"
                  className="nextBtn"
                >
                  Next
                </button>
              </div> */}


    </div>
  );
};

export default LoadingPage;