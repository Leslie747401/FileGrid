'use client';

import React, { useState } from 'react'
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { X } from 'lucide-react';

import { Check } from 'lucide-react';
import copy from '@/public/copy.png'
import Image from 'next/image';
import Email from '@/public/gmail.png'
import WhatsApp from '@/public/WhatsAppColor.png'
import { Inter } from "next/font/google";

import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog"

const inter = Inter({ subsets: ["latin"] });

export default function ShareAllFiles(props) {

  const [isCopying,setIsCopying] = useState(false);

  function copyurl(){
    navigator.clipboard.writeText(props.filelink);

    setIsCopying(true);
    setTimeout(() => {
      setIsCopying(false);
    }, 1000);
  }

  return (

    <Dialog>

        <DialogTrigger className='px-2 py-2 bg-[#ffecd1] text-black rounded-md font-medium'><ArrowUpRight width={22} height={22}/></DialogTrigger>

        <DialogContent>
            
            <div className='flex justify-between items-start'>

                <div>
                    <p className='text-lg font-semibold'>Share with others</p>
                    <p className={`${inter.className} text-sm text-gray-400 pb-6`}>Anyone with link can view this file</p>
                </div>

                <DialogClose><X/></DialogClose>    

            </div>


            <div className='flex justify-between mb-4 w-full'>

                <Link href={`https://wa.me/?text=${"File name - " + props.filename + " and the link to access this file - " + props.filelink}`} target="_blank" rel="noopener noreferrer" className='w-[48%]'>
                <button className='w-full font-medium border border-[#d1d1d1] flex justify-center rounded-lg gap-3 items-center p-2'>
                    <Image
                    src={WhatsApp}
                    width={25}
                    height={25}
                    alt='WhatsApp_logo'
                    />
                    <p>WhatsApp</p>
                </button>
                </Link>

                <Link href={`mailto:?subject=${encodeURIComponent("Testing File Share")}&body=${"File name - " + props.filename + " and the link to access this file - " +  props.filelink}`} className='w-[48%]'>
                <button className='w-full font-medium border border-[#d1d1d1] flex justify-center gap-3 p-2 rounded-lg items-center'>
                    <Image
                    src={Email}
                    idth={22}
                    height={22}
                    alt='email_logo'
                    />
                    <p>Email</p>
                </button>
                </Link>

            </div>

            <div className='flex justify-between items-center pb-4'>
                <div className='border border-[#d1d1d1] w-[43%] h-0'></div>
                <p className='flex justify-center'>or</p>
                <div className='border border-[#d1d1d1] w-[43%] h-0'></div>
            </div>

            <div className='flex items-center justify-between'>

                <div className='w-[285px] sm:w-[415px] border border-[#d1d1d1] h-[40px] rounded-lg p-2 px-3 text-sm  overflow-hidden whitespace-nowrap text-ellipsis'>
                    {props.filelink}
                </div>

                <button className='p-[8px] rounded-md border border-[#d1d1d1]' 
                onClick={copyurl}>

                    {
                        isCopying ? 

                        <Check width={20} height={20}/>

                        : 

                        <Image
                            src={copy}
                            width={20}
                            height={20}
                            alt='copy_logo'
                        />
                    }

                </button>

            </div>

        </DialogContent>

    </Dialog>
  )
}
