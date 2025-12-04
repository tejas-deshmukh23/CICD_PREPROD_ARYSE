'use client'
import React from 'react';
import { Outfit } from "next/font/google";
import Newhomepage from '@/component/NewJourney/newhomepage';

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});
function page() { 
  return (
    <div className={outfit.className}>
      <Newhomepage />
    </div>
  )
}
export default page
