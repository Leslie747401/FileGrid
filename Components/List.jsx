'use client';

import React, { useEffect, useState } from 'react'
import { Trash } from 'lucide-react';
import { Inter } from "next/font/google";
import { PinataSDK } from "pinata";
import Link from 'next/link';
import ShareAllFiles from './ShareAllFiles';

const pinata = new PinataSDK({
    pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT,
    pinataGateway: process.env.NEXT_PUBLIC_PINATA_GATEWAY,
  });

const inter = Inter({ subsets: ["latin"] });

export default function List() {

  const [files,setFiles] = useState([]);
  const [searchText,setSearchText] = useState("");

  useEffect(() => {

    async function getFiles() {
    
        const response = await pinata.listFiles().pageLimit(4);

        if(response) {
            setFiles(response);
        }
      }

    getFiles();
    
  },[]);

  useEffect(() => {

    async function searchFile() {

        const response = await pinata.listFiles().pageLimit(3).name(searchText);   // Here, 'searchText' is the name of the file you are searching for. Let's say you are searching for a image named 'dog.png'. If you type 'dog.png' you will get that image. but if you dont type anything then it will be - const response = await pinata.listFiles().pageLimit(3).name("")  which will return the same result as const response = await pinata.listFiles().pageLimit(3) therfore we will get the default list of 3 files when the SearchBar is Empty.

        if(response){
            setFiles(response);
        }
    }

    searchFile();

  },[searchText])


  async function deleteFile(fileHash){
    
    const updatedFilesList = files.filter((f) => f.ipfs_pin_hash !== fileHash);
    setFiles(updatedFilesList);

    const response = await pinata.unpin([fileHash])

    if(response) {
        console.log("File Deleted");
    }
  }

  return (

    <>

        {
            files ?
            

            <div className='w-full sm:w-[50%] max-sm:pb-12 sm:h-screen'>

                <p className='text-white text-[25px] sm:text-[40px] w-full flex justify-center pb-12'>All Files</p>

                <div className={`${inter.className} bg-white px-6 py-3 rounded-lg mb-8 border border-[#3e3e3e]`}>
                    <input type="text" placeholder='Search for files...'  className='w-full h-[30px] bg-white outline-none' onChange={(e) => setSearchText(e.target.value)} value={searchText}/>
                </div>

                <div className='bg-[#8B80F9] rounded-xl py-2'>

                    {
                        files.map((f,index) => (

                            <div className={`w-full flex justify-between items-center p-3 px-6 ${index == files.length - 1 ? 'border-none' : 'border-b border-white'}`} key={f.id}>

                                {/* Here, target='_blank' opens the link on a new tab instead of opening it on the same tab*/}
                                <Link href={`https://${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/ipfs/${f.ipfs_pin_hash}`} className='w-[65%] underline-white' target='_blank'>
                                    <p className='text-white w-full overflow-hidden text-ellipsis text-nowrap'>{f.metadata.name}</p>
                                </Link>
    
                                <div className='flex gap-4'>

                                    <ShareAllFiles
                                        filename={f.metadata.name}
                                        filelink={`https://${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/ipfs/${f.ipfs_pin_hash}`}
                                    />

                                    <button className='px-2 py-2 bg-black text-white rounded-md font-medium' onClick={() => deleteFile(f.ipfs_pin_hash)}><Trash width={20} height={20}/></button>
                                    
                                </div>
                                    
                            </div>
                        ))
                    }

                </div>

            </div>

            :

            <p className='text-white text-[25px] sm:text-[30px] w-full h-[350px] flex justify-center items-center'>No Files Uploaded</p>
        }    

    </>


  )
}
