'use client'
import React from 'react';
import { Outfit } from "next/font/google";
import Newlandingpage from '@/component/NewJourney/newladingpage';

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});
function page() { 
  return (
    <div className={outfit.className}>
      <Newlandingpage />
    </div>
  )
}
export default page
