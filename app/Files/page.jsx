import React from 'react'
import Navbar from '@/Components/Navbar'
import List from '@/Components/List'

export default function page() {
  return (
    // <div class="absolute inset-0 -z-10 w-screen h-screen flex flex-col items-center [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] px-5 sm:px-16">
    <div class="absolute inset-0 -z-10 min-h-max min-w-max flex flex-col items-center [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] px-5 sm:px-16">

        <Navbar/>
        <List/>

    </div>
  )
}
