'use client';

import React from 'react'
import Image from 'next/image'
import logo1 from '@/public/logo1.png'
import logo2 from '@/public/logo2.png'
import user from '@/public/User.avif'
import Google from '@/public/Google.png'
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';


export default function Navbar() {

  const [dropdown,setDropdown] = useState(false);

  return (
    <>
        <div className='w-full flex pt-8 sm:pt-12 pb-16 sm:pb-16 justify-between'>
            
            {/* Image and Name */}

            <Link href={'/'}>
                <div className='flex gap-3.5 sm:gap-5 items-center'>
                    <Image
                        src={logo1}
                        alt='Logo'
                        width={30}
                        height={30}
                        className='object-contain'
                    />
                    <p className='text-[20px] sm:text-[30px] font-bold text-white flex justify-center'>FileGrid</p>
                </div>
            </Link>

            {/* Sign in and profile button */}

            <div className='flex gap-8 items-center'>

                {/* Sign in Button  */}
                <button className='bg-white rounded-xl flex justify-center h-fit px-3 sm:px-4 py-2 gap-2'>
                    <Image
                        src={Google}
                        alt='Logo'
                        width={28}
                        height={28}
                        className='object-contain'
                    />
                    <p className='text-[16px] sm:text-[18px] font-medium'>Sign in</p>
                </button>

                {/* Profile Button */}
                {/* <div className='cursor-pointer' onClick={() => setDropdown(!dropdown)}>
                    <Image
                        src={user}
                        alt='Logo'
                        width={45}
                        height={45}
                        className='rounded-full'
                    />
                </div> */}
                

            </div>

        </div>


        {/* Dropdown Menu */}

        {
            dropdown  && 

            <div className='absolute top-[85px] right-[25px] sm:top-[105px] sm:right-16 bg-[#1e1e1e] border border-[#3e3e3e] rounded-xl'>

                <Link href={'/Files'}>
                    <button className='w-full text-white border-b border-b-[#3e3e3e] flex justify-start pl-5 pr-16 py-2'>
                        <p className='text-[16px] sm:text-[18px] font-medium'>Files</p>
                    </button>
                </Link>

                <button className='w-full rounded-xl flex justify-start pl-5 pr-16 py-2'>
                    <p className='text-white text-[16px] sm:text-[18px] font-medium'>Sign out</p>
                </button>
                
            </div>
        }
    </>
  )
}
