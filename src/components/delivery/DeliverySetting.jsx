import React,{useState,useEffect} from 'react'
import SetPriceModal from './modal/SetPriceModal';

export default function () {
    const [modalOpen,setModalOpen] =useState()
  return (
    <div>
      <SetPriceModal modalOpen={modalOpen} setModalOpen={setModalOpen}/>
        <div className='-text-xl font-black py-4 text-black'>
        Delivery Settings by Region
        </div>
        <div className='border-b border-gray-300 text-black py-3 font-semibold w-52'>
            Nigeria
        </div>
        <div className='py-4'>
            <div className='inline-flex'>
                <div>
                  Lagos  
                </div>
                <div  onClick={() => {
                        setModalOpen("modal-open");
                       
                      }} className='cursor-pointer font-bold pl-40 text-deepBlue'>
                    Set Price
                </div>
            </div>
            <div className='py-3'>
                 <div className='inline-flex'>
                <div>
                  Outside Lagos  
                </div>
                <div  onClick={() => {
                        setModalOpen("modal-open");
                       
                      }} className='cursor-pointer font-bold pl-24 text-deepBlue'>
                    Set Price
                </div>
            </div>
            </div>
           
        </div>
    </div>
  )
}
