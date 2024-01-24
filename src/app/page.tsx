'use client'

import React from 'react';

import { HeaderListProvider } from '../Context/Header/HeaderContext';
import IndexComponent from '@/Components/Index/IndexComponent';

export default function Home() {

  return (        
      <HeaderListProvider>
        <IndexComponent />
      </HeaderListProvider>    
  )
}
