'use client'
import React from 'react'
import { Roboto } from 'next/font/google';
import SinglePage from '../../component/Rysa/SinglePage';
import StructurePage from '@/component/myContener/StructurePage';

function page() {
  // Dummy company object (तू backend मधून फक्त structure असाच ठेव)
 
  return (
    <div>
     <StructurePage/>
    </div>
  )
}
export default page