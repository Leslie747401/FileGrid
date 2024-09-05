'use client'

import { Upload } from 'lucide-react'
import { Inter } from "next/font/google";
import { useState } from 'react';
import { Check } from 'lucide-react';
import { X } from 'lucide-react';
import { PinataSDK } from "pinata";
import Loader from './Loader';
import Image from 'next/image';
import ImageIcon from '@/public/image.png'
import ShareSingleFile from './ShareSingleFile';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { createClient } from '@/utils/supabase/client';

const pinata = new PinataSDK({
  pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT,
  pinataGateway: process.env.NEXT_PUBLIC_PINATA_GATEWAY,
});

const inter = Inter({ subsets: ["latin"] });

export default function UploadCard() {

  const [file,setFile] = useState(null);
  const [fileName,setFileName] = useState("");
  const [isUploading,setIsUploading] = useState(false);
  const [fileLink,setFileLink] = useState("");
  const [fileStatus,setFileStatus] = useState("Upload Pending");
  const supabase = createClient();

  const handleUploadClick = () => {
    const upload_image = document.querySelector('.uploadImage');
    upload_image.click();
  }
  
  const handleFile = (event) => {
    const file = event.target.files[0];
    setFile(file);
    setFileName(file.name);
  }

  const uploadFile = async () => {

    setIsUploading(true);
    
    const upload = await pinata.upload.file(file);
    const { data: { user } } = await supabase.auth.getUser();
    
    // if the file is uploaded to IPFS and the user is authenticated then we can update the required states to share the file. The necessary details of the user and the hash of the file will be stored in the supabase database. 

    if(upload && user) {

      setIsUploading(false)
      setFileStatus("Uploaded");
      setFileLink(`https://${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/ipfs/${upload.IpfsHash}`);

      const { data, error } = await supabase
      .from('Files')
      .insert([
        { file_name: fileName, file_hash: upload.IpfsHash, email: user.email},
      ])
      .select();

    }

    // If the user is not logged in then we only update the required states to share the file. This file will be stored in the IPFS but not in the supabase database as i have enabled row level security (RLS) to restrict unauthenticated users to upload files to supabase database because we cannot track the user. 
    else if(upload && !user){
      setIsUploading(false)
      setFileStatus("Uploaded");
      setFileLink(`https://${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/ipfs/${upload.IpfsHash}`);
    }
  }

    return (
    <div className={`${inter.className} w-full flex flex-col justify-center items-center pb-24 max-sm:px-5`}>

        <div className='max-sm:w-full p-8 bg-[#8B80F9] rounded-lg flex flex-col gap-6'>

            <p className='flex justify-start w-full font-medium text-xl text-white'>Upload File</p>

            <input type="file" className='hidden uploadImage' accept='image/* .pdf' onChange={handleFile} disabled={fileName} required/>

            <div className='w-full sm:w-[450px] h-[250px] bg-white rounded-xl flex flex-col justify-center items-center gap-4 cursor-pointer relative' onClick={handleUploadClick}>

              {
                fileName ? 
                
                  <>
                    <div className='sm:w-[75%] px-4 py-2 rounded-xl border border-[#d0d0d0] flex gap-2 items-center'>
                      <Image
                        src={ImageIcon}
                        width={25}
                        height={25}
                        alt='image_logo'
                      />
                      <p className='w-[120px] sm:w-full overflow-hidden whitespace-nowrap text-ellipsis'>{fileName}</p>
                      <Check width={22} height={22} className='pt-1'/>
                    </div>

                    <div className='w-8 h-8 absolute top-4 right-4 rounded-full cursor-pointer bg-black flex justify-center items-center ' onClick={() => {setFileName(false); setFile(null); setFileStatus("Upload Pending")}}>
                      <X className='text-white'/>
                    </div>
                  </>
                
                :     
                  <>
                    <Upload/>
                    <p className='text-[#575757] text-center'>Drag and drop or <br className='sm:hidden'/>
                    <span className='text-blue-500'>browse files</span>
                    </p>
                  </>
              }

            </div>

            <div className='flex justify-between'>

                    {
                      file == "" ?

                      <AlertDialog>
                        <AlertDialogTrigger className='bg-black text-white text-lg font-medium w-full py-2 rounded-lg flex gap-2 justify-center items-center'>Upload</AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Missing File</AlertDialogTitle>
                            <AlertDialogDescription>
                              It looks like you did not select a file. Please choose a file to upload.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogAction>Got it</AlertDialogAction>
                          </AlertDialogFooter> 
                        </AlertDialogContent>
                      </AlertDialog>

                    :

                      (
                        isUploading ?

                          <button className='bg-black text-white text-lg font-medium w-full py-2 rounded-lg flex justify-center'>
                            <Loader/>
                          </button> 

                        :

                          (
                            fileStatus == "Upload Pending" ?

                              <button className='bg-black text-white text-lg font-medium w-full py-2 rounded-lg flex gap-2 justify-center items-center' onClick={uploadFile}>
                                <p>Upload</p>
                              </button>

                            :
                            
                              <>
                                <ShareSingleFile
                                  Filename={fileName}
                                  Filelink={fileLink}
                                />
                              </>
                          )
                      )

                    }
                  
            </div>

        </div>

    </div>
  )
}
