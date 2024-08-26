'use client'

import { Upload } from 'lucide-react'
import { Inter } from "next/font/google";
import { useState } from 'react';
import { Check } from 'lucide-react';
import { X } from 'lucide-react';
import { PinataSDK } from "pinata";
import Loader from './Loader';
import copy from '@/public/copy.png'
import Image from 'next/image';
import Email from '@/public/Email.png'
import WhatsApp from '@/public/WhatsApp.png'
import ImageIcon from '@/public/image.png'
import {WhatsappShareButton , WhatsappIcon , TwitterShareButton , TwitterIcon , FacebookShareButton , FacebookIcon , LinkedinShareButton, LinkedinIcon, RedditShareButton, RedditIcon, EmailShareButton} from 'next-share'
// import { EmailShareButton } from 'react-share';
import { useToast } from "@/Components/ui/use-toast"
import '@/app/globals.css'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog"

import Link from 'next/link';



const pinata = new PinataSDK({
  pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT,
  pinataGateway: process.env.NEXT_PUBLIC_PINATA_GATEWAY,
});

const inter = Inter({ subsets: ["latin"] });

export default function UploadCard() {

  const [file,setFile] = useState("");
  const [fileName,setFileName] = useState("");
  const [isUploading,setIsUploading] = useState(false);
  const [text,setText] = useState('Upload');
  const [fileLink,setFileLink] = useState("");
  const { toast } = useToast();
  const [isCopying,setIsCopying] = useState(false);
  

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
    
    if(upload) {
      setIsUploading(false)
      console.log(upload);
      setText('Uploaded');
      setFileLink(`https://${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/ipfs/${upload.IpfsHash}`);
    }
  }

  function copyurl(){
    navigator.clipboard.writeText(fileLink);
    // toast({
    //   description: "Link copied to clipboard",
    //   duration : 1000,
    //   className : 'bg-black text-white font-medium outline-[#1e1e1e]'
    // });

    setIsCopying(true);
    setTimeout(() => {
      setIsCopying(false);
    }, 1000);
  }

    return (
    <div className={`${inter.className} w-full flex flex-col justify-center items-center pb-24 max-sm:px-5`}>

        <div className='max-sm:w-full p-8 bg-[#1e1e1e] rounded-lg flex flex-col gap-6 border border-[#3e3e3e]'>

            <p className='flex justify-start w-full font-medium text-white text-xl'>Upload File</p>

            <input type="file" className='hidden uploadImage' accept='image/*' onChange={handleFile} disabled={fileName} required/>

            <div className='w-full sm:w-[450px] h-[250px] bg-[#2f2f2f] rounded-xl border border-[#5d5d5d] border-dashed flex flex-col justify-center items-center gap-4 cursor-pointer relative' onClick={handleUploadClick}>

              {
                fileName ? 
                
                  <>
                    <div className='sm:w-[75%] px-4 py-2 rounded-xl bg-blue-200 flex gap-2 items-center'>
                      <Image
                        src={ImageIcon}
                        width={25}
                        height={25}
                        alt='image_logo'
                      />
                      <p className='w-[120px] sm:w-full overflow-hidden whitespace-nowrap text-ellipsis'>{fileName}</p>
                      <Check width={22} height={22} className='pt-1'/>
                    </div>

                    <div className='w-8 h-8 absolute top-4 right-4 rounded-full cursor-pointer bg-black flex justify-center items-center ' onClick={() => {setFileName(false); setFile("");}}>
                      <X className='text-white'/>
                    </div>
                  </>
                
                :     
                  <>
                    <Upload className='text-gray-400'/>
                    <p className='text-[#575757] text-center'>Drag and drop or <br className='sm:hidden'/><span className='text-blue-500'>browse files</span></p>
                  </>
              }

            </div>

            <div className='flex justify-between'>

                  {/* When the file is not selected before uploading  */}
                  {
                      file == "" ?

                      <AlertDialog>
                        <AlertDialogTrigger className='bg-white text-black text-lg font-medium w-[48%] py-2 rounded-lg flex gap-2 justify-center items-center'>Upload</AlertDialogTrigger>
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

                    // Checking whether the file is being uploaded or not.

                    ( 
                      isUploading ?

                      <button className='bg-white text-black text-lg font-medium w-[48%] py-2 rounded-lg flex justify-center'>
                        <Loader/>
                      </button> 

                      :
                      
                      // If the file is not being uploaded, then it has either completed the upload or hasnt been uploaded. So if the file is not been uploaded we display "Upload" else we display "Uploaded"
                      (
                        text == 'Upload' ?

                        <button className='bg-white text-black text-lg font-medium w-[48%] py-2 rounded-lg flex gap-2 justify-center items-center' onClick={uploadFile}>
                            <p>Upload</p>
                        </button>

                      :

                        <button className='bg-white text-black text-lg font-medium w-[48%] py-2 rounded-lg flex gap-2 justify-center items-center pointer-events-none'>
                          <p>Uploaded</p>
                          <Check/>
                        </button>
                      )
                    )
                  }

                  {  file == "" ?

                        <AlertDialog>
                          <AlertDialogTrigger className='bg-blue-600 text-white text-lg font-medium w-[48%] py-2 rounded-lg'>Share</AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Upload Required</AlertDialogTitle>
                              <AlertDialogDescription>
                              To share a file, you must upload one first. Please select and upload a file to continue.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogAction>Got it</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                    : 

                    (  text == 'Upload' ?

                        <AlertDialog>
                          <AlertDialogTrigger className='bg-blue-600 text-white text-lg font-medium w-[48%] py-2 rounded-lg'>Share</AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Upload Required</AlertDialogTitle>
                              <AlertDialogDescription>
                              You have selected a file, but it has not been uploaded yet. Please upload the file before sharing.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogAction>Got it</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>                        

                      :

                        <Dialog>

                          <DialogTrigger className='bg-blue-600 text-white text-lg font-medium w-[48%] py-2 rounded-lg'>Share</DialogTrigger>

                          <DialogContent>
                              
                              <div className='flex justify-between items-start'>

                                  <div>
                                    <p className='text-lg font-semibold text-white'>Share with others</p>
                                    <p className={`${inter.className} text-sm text-gray-400 pb-6`}>Anyone with link can view this file</p>
                                  </div>

                                  <DialogClose><X className='text-white'/></DialogClose>    

                              </div>


                              <div className='flex justify-between pb-6 w-full'>
       
                                <Link href={`https://wa.me/?text=${"File name - " + fileName + " and the link to access this file - " +  fileLink}`} target="_blank" rel="noopener noreferrer" className='w-[48%]'>
                                  <button className='w-full text-white font-medium border border-[#1a1a1a] flex justify-center rounded-lg gap-3 items-center p-2'>
                                    <Image
                                      src={WhatsApp}
                                      width={20}
                                      height={20}
                                      alt='WhatsApp_logo'
                                    />
                                    <p>WhatsApp</p>
                                  </button>
                                </Link>

                                <Link href={`mailto:?subject=${encodeURIComponent("Testing File Share")}&body=${"File name - " + fileName + " and the link to access this file - " +  fileLink}`} className='w-[48%]'>
                                  <button className='w-full text-white font-medium border border-[#1a1a1a] flex justify-center gap-3 p-2 rounded-lg items-center'>
                                    <Image
                                      src={Email}
                                      idth={20}
                                      height={20}
                                      alt='email_logo'
                                    />
                                    <p>Email</p>
                                  </button>
                                </Link>

                              </div>

                              <div className='flex justify-between items-center pb-8'>
                                <div className='border border-[#1a1a1a] w-[43%] h-0'></div>
                                <p className='text-white flex justify-center'>or</p>
                                <div className='border border-[#1a1a1a] w-[43%] h-0'></div>
                              </div>

                              <div className='flex items-center justify-between'>

                                <div className='w-[285px] sm:w-[415px] text-white border border-[#1a1a1a] h-[40px] rounded-lg p-2 px-3 text-sm  overflow-hidden whitespace-nowrap text-ellipsis'>
                                  {fileLink}
                                </div>

                                <button className='p-[6px] bg-white rounded-md' onClick={copyurl}>
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

            </div>

        </div>

    </div>
  )
}
