'use client';

import React, { useEffect, useState } from 'react'
import { Trash } from 'lucide-react';
import { Inter } from "next/font/google";
import { PinataSDK } from "pinata";
import Link from 'next/link';
import ShareAllFiles from './ShareAllFiles';
import Loader from './Loader';
import { createClient } from '@/utils/supabase/client';

const pinata = new PinataSDK({
    pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT,
    pinataGateway: process.env.NEXT_PUBLIC_PINATA_GATEWAY,
  });

const inter = Inter({ subsets: ["latin"] });

export default function List() {

  const [files,setFiles] = useState([]);
  const [searchText,setSearchText] = useState("");
  const [isLoading,setIsLoading] = useState(true);
  const [fileFound,setFileFound] = useState(false);
  const supabase = createClient();

  useEffect(() => {

    async function getFiles() {
        
        let { data: filedata, error } = await supabase
        .from('Files')
        .select('*')
        .range(0, 3)
                    
        // Set the files state with the files we have found.
        if(filedata) {
            setFiles(filedata);
            setIsLoading(false);
        }
    }

    getFiles();
        
  },[]);

  useEffect(() => {

    async function searchFile() {

        let { data : filedata, error } = await supabase
        .from('Files')
        .select('*')
        .range(0, 3)
        .ilike('file_name', `%${searchText}%`);  // Case-insensitive search

        // If the file that we are searching does not exist then we set the fileFound to false.
        if(filedata.length == 0){
            setFileFound(false);
        }
           
        // If the file that we are searching exists then we set the fileFound state to true and also set the Files with file that we found.
        else{
            setFiles(filedata);
            setFileFound(true);
        }
    }

    searchFile();

  },[searchText])


  // After clicking the trash button, the hash of the file to be deleted is passed to this function
  async function deleteFile(fileHash){

    // We use the hash of the file to be deleted to filter the files array to see the file being deleted in realtime. 
    const updatedFilesList = files.filter((f) => f.file_hash !== fileHash);
    setFiles(updatedFilesList);

    // We make a delete request to delete the file whose hash matches with the hash that is passed with the delete request.
    const { error } = await supabase
    .from('Files')
    .delete()
    .eq('file_hash', fileHash)
     
    // Similarly, we delete(unpin) the file from the IPFS.
    const response = await pinata.unpin([fileHash])

    if(error) {
        console.log(error);
    }

    if(response) {
        console.log("Response : ",response);
        console.log("File Deleted");
    }
  }

  return (

    <>

        {
            isLoading ? 

                // When we visit the /Files route, it takes a couple seconds to retrieve the data. While it is fetching the data, a loader is rendered.
                <div className='h-[400px] flex justify-center items-center text-white font-semibold text-xl'><Loader/></div>
            
            :

                (
                    files.length != 0 ?
                    
                    // if some files are uploaded then we render the heading "All files" and a searchbar to search files.
                    <div className='w-full sm:w-[50%] max-sm:pb-12 sm:h-screen'>
        
                        <p className='text-white text-[25px] sm:text-[40px] w-full flex justify-center pb-12'>All Files</p>
        
                        <div className={`${inter.className} bg-white px-6 py-3 rounded-lg mb-8 border border-[#3e3e3e]`}>
                            <input type="text" placeholder='Search for files...'  className='w-full h-[30px] bg-white outline-none' onChange={(e) => setSearchText(e.target.value)} value={searchText}/>
                        </div>
        
                        {
                            // If the file we are searching for exists then we render the below component
                            fileFound ? 

                                <div className='bg-[#8B80F9] rounded-xl py-2'>
            
                                    {
                                        files.map((f,index) => (
                
                                            <div className={`w-full flex justify-between items-center p-3 px-6 ${index == files.length - 1 ? 'border-none' : 'border-b border-white'}`} key={f.id}>
                
                                                {/* Here, target='_blank' opens the link on a new tab instead of opening it on the same tab*/}
                                                <Link href={`https://${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/ipfs/${f.file_hash}`} className='w-[65%] underline-white' target='_blank'>
                                                    <p className='text-white w-full overflow-hidden text-ellipsis text-nowrap'>{f.file_name}</p>
                                                </Link>
                    
                                                <div className='flex gap-4'>
                
                                                    <ShareAllFiles
                                                        filename={f.file_name}
                                                        filelink={`https://${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/ipfs/${f.file_hash}`}
                                                    />
                
                                                    <button className='px-2 py-2 bg-black text-white rounded-md font-medium' onClick={() => deleteFile(f.file_hash)}><Trash width={20} height={20}/></button>
                                                    
                                                </div>
                                                    
                                            </div>
                                        ))
                                    }
            
                                </div>
                            
                            :
                            
                            // If the file we are searching for does not exist then we just render "File not Found"
                            <p className='pt-16 text-white text-xl flex justify-center'>File not found</p>
                        } 
        
                    </div>
        
                    :
                    
                    // If there are no files uploaded yet then we render "No files Uploaded". 
                    <p className='text-white text-[25px] sm:text-[30px] w-full h-[350px] flex justify-center items-center'>No Files Uploaded</p>
                )
        }    

    </>
  )
}
