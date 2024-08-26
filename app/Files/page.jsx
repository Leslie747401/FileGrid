import React from 'react'
import Navbar from '../../components/Navbar'
import List from '../../components/List'

export default function page() {
  return (
      <div className="flex flex-col items-center px-5 sm:px-16">

          <Navbar/>
          <List/>

      </div>
  )
}
