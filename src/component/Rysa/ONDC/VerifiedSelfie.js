"use client";
import React from 'react';
import "./VerifiedSelfie.css";
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const VerifiedSelfiePage = () => {
  return (
     <div className={`${roboto.className} waiting-table`}>
      <div className="checkmark-circle">
  <div className="background"></div>
  <div className="checkmark"></div>
</div>

<br></br>

      <div className="loading-text">
       {/* <h3> <b>Please Wait...</b> </h3> */}
       <h1 style={{textAlign:"center"}}><b>Congratulations</b></h1>
       <h3 style={{textAlign:"center"}}> <b>Loan Approved</b> </h3>
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

export default VerifiedSelfiePage;