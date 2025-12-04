"use client";
import React from "react";
import Image from "next/image";
// import hdb from "../../components/HDB-Yubi/HDB-Images/HDB.png";
import logo from "../../Rysa/ONDC/images/ondc_registered_logo.png";

const HeaderPart = () => {
  return (
    <>
      <div className="headerPart">
        <div className="innerLogoPart">
          <Image
            src={logo}
            alt="HDB tag"
            className="logoImagePart"
            style={{marginTop:"-70px",width:"auto",height:"150px"}}
            width={200}
            height={170}
          />
        </div>
      </div>

      <style jsx>{`
        .headerPart {
          margin-top: -4px;
          width: 412px;
          height: 230px;
        }
          @media (max-width: 400px){
           .headerPart {
          margin-top: -4px;
          width: 428px;
          height: 230px;
        }
          }

        .innerLogoPart {
          // background: linear-gradient(to right, #8ca8e6, #ecdffe, #fee1a2);
          background: linear-gradient(to right, #f197b6, #9e84ecff);
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          border-radius: 10px 10px 0px 0px;
        }

        .logoImagePart {
          width:auto;
          height:150px;
        }
      `}</style>
    </>
  );
};

export default HeaderPart;
