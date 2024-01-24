'use client'

import React from 'react';
import IndexComponent from '../Components/Index/indexComponent';
import { HeaderListProvider } from '../Context/Header/HeaderContext';

export default function Home() {

  return (
    
      <HeaderListProvider>
        <IndexComponent />
      </HeaderListProvider>

    
  )
}
