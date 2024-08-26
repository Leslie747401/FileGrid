'use client';

import React, { useState } from 'react'
import { ArrowUpRight } from 'lucide-react';
import { Trash } from 'lucide-react';
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function List() {

  const [isFilesLoaded,setIsFilesLoaded] = useState(false);

  return (

    <>

        {
            isFilesLoaded ? 

            <p className='text-white text-[25px] sm:text-[30px] w-full flex justify-center items-center'>No Files Uploaded</p>
            
            :

            <div className='w-full sm:w-[50%] max-sm:pb-12 sm:h-screen'>

                <p className='text-white text-[25px] sm:text-[40px] w-full flex justify-center pb-12'>All Files</p>

                <div className={`${inter.className} text-white bg-white px-4 py-4 rounded-lg mb-8 border border-[#3e3e3e]`}>
                    <input type="text" placeholder='Search for files...'  className='w-full bg-white outline-none' />
                </div>

                <div className='bg-[#8B80F9] rounded-xl py-2'>

                    <div className='w-full flex justify-between items-center p-3 px-6 border-b border-white'>
                                    
                        <p className='text-white'>Image1.png</p>

                            <div className='flex gap-3'>
                                <button className='px-2 py-2 bg-[#ffecd1] text-black rounded-md font-medium '><ArrowUpRight width={22} height={22}/></button>
                                <button className='px-2 py-2 bg-black text-white rounded-md font-medium '><Trash width={20} height={20}/></button>
                            </div>
                                
                    </div>

                    <div className='w-full flex justify-between items-center p-3 px-6 border-b border-white'>
                                    
                        <p className='text-white'>Image2.png</p>

                            <div className='flex gap-3'>
                                <button className='px-2 py-2 bg-[#ffecd1] text-black rounded-md font-medium '><ArrowUpRight width={22} height={22}/></button>
                                <button className='px-2 py-2 bg-black text-white rounded-md font-medium '><Trash width={20} height={20}/></button>
                            </div>
                                
                    </div>

                    <div className='w-full flex justify-between items-center p-3 px-6 border-b border-[#ffecd1]'>
                                    
                        <p className='text-white'>Image3.png</p>

                            <div className='flex gap-3'>
                                <button className='px-2 py-2 bg-[#ffecd1] text-black rounded-md font-medium '><ArrowUpRight width={22} height={22}/></button>
                                <button className='px-2 py-2 bg-black text-white rounded-md font-medium '><Trash width={20} height={20}/></button>
                            </div>
                                
                    </div>

                    <div className='w-full flex justify-between items-center p-3 px-6'>
                                    
                        <p className='text-white'>Image4.png</p>

                            <div className='flex gap-3'>
                                <button className='px-2 py-2 bg-[#ffecd1] text-black rounded-md font-medium '><ArrowUpRight width={22} height={22}/></button>
                                <button className='px-2 py-2 bg-black text-white rounded-md font-medium '><Trash width={20} height={20}/></button>
                            </div>
                                
                    </div>

                </div>

            </div>
        }    

    </>

  )
}
