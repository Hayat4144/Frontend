import React, { Fragment, useState } from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { AiOutlineArrowLeft } from 'react-icons/ai'


export default function Paginations({ product_count, resultPerPage }) {
    const [numberofStep, setNumberofStep] = useState(1);
    console.log(numberofStep)


    return (
        <Fragment>
            <section className='pagination_container my-5'>
                <div className='pagination_box flex items-center justify-center space-x-5'>
                    <div className='previous_btn'>
                        <button className='bg-indigo-700 text-white  md:px-16 py-1.5  rounded-md text-center px-3'>
                            <AiOutlineArrowLeft className='md:text-2xl' />
                        </button>
                    </div>
                    <div className='page_number_container  flex items-center space-x-3'>

                        <button className='rounded-full outline-none focus:bg-indigo-700
                                focus:border-none focus:text-white hover:border-none transition 
                                ease-out duration-500 hover:bg-indigo-700 w-8 h-8 hover:border
                                 border-gray-300 border hover:text-white '>1</button>
                    </div>
                    <div className='next_btn'>

                        <button className='bg-indigo-700 md:px-16 text-white py-1.5 px-4 rounded-md text-center'>
                            <AiOutlineArrowRight className='md:text-2xl' />
                        </button>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}
