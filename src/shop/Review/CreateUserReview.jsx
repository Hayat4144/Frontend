import React, { Fragment, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { BsStarFill } from 'react-icons/bs'
import { Rating, Typography } from '@mui/material'
import { useEffect } from 'react'


export default function CreateUserReview({isModalOpen ,RatingModalToggle}) {
    //  ---------------- all state ---------------- //
    const [isLoading, setIsLoading] = useState(false)
    const [showModal, setShowModal] = useState(isModalOpen)
    const [comment, setComment] = useState('')
    const [Star, setStar] = useState(0)
    const { id } = useParams();

    useEffect(()=>{
        setShowModal(isModalOpen)
    },[isModalOpen])

    //  -------------------------- Review Submit Handler ------------------- //

    const ReviewSubmitHandler = async () => {
        setIsLoading(!isLoading)
        const result = await fetch('http://localhost:5000/v4/api/product/reviews', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                comment,
                Star: 4,
                product_id: id
            }),
            credentials: 'include'
        })
        const response = await result.json();
        if (result.status !== 200) {
            setIsLoading(false)
            toast.error(response.error, {
                position: 'bottom-center',
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
            return;
        }
        setIsLoading(false)
        toast.success(response.data, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        RatingModalToggle(showModal)
    }

    // ------------------- star value change ----------- //
    const StarChangeValue = (e) => {
        setStar(e.target.value)
    }

    return (
        <Fragment>
            <div className={`bg-black w-full fixed h-screen opacity-100 bg-opacity-30 inset-0
            ${showModal ? 'flex' :'hidden'}  items-center justify-center z-50`}>
                <div className='user_review_body bg-white w-5/6 md:w-[40%] py-5 md:px-5  rounded-md'>
                    <h1 className='body_title text-xl font-bold'>
                        Share your feedback
                    </h1>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        ReviewSubmitHandler();
                    }}>
                        <div className="comment_field px-2 ">
                            <textarea name="comment" cols="35" rows="5"
                                className='border border-gray-400 rounded-md my-4
                            outline-none w-full px-5 py-2 focus:border-indigo-600
                            focus:ring-indigo-700 bg-inherit focus:border  
                            text-gray-700 placeholder:text-gray-500'
                                placeholder='Enter your comment ...'
                                value={comment}
                                onChange={e => setComment(e.target.value)} />
                        </div>
                        <div className='star_group_radio_btn flex items-center space-x-3'>
                            <Typography>How much do you rate this product?</Typography>
                            <Rating
                                value={Star}
                                onChange={StarChangeValue}
                                size="large" />
                        </div>
                        <div className='sumbit-btn mx-4 my-5 space-x-5'>
                            <button type='button'
                                onClick={() => RatingModalToggle(showModal)}
                                className='w-24 px-5 h-10 bg-red-800 text-white py-1
                            rounded-md hover:bg-red-700 focus:outline-none focus:border focus:border-red-500
                            focus:bg-transparent focus:text-black '>Cancel</button>
                            {!isLoading ? <button type='submit' disabled={Star === 0 || comment.length < 15 ? true : false}
                                className='h-10 text-center text-white outline-none text-bold bg-indigo-800 rounded-md
                              hover:bg-indigo-700 px-5'>Submit</button> : <button type="button"
                                className="inline-flex items-center justify-center py-2  leading-4 
                              text-sm shadow rounded-md text-white bg-indigo-800 hover:bg-indigo-900
                                text-center transition ease-in-out duration-150 cursor-not-allowed"
                                disabled="">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-500"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="pacity-25 text-white" cx="12" cy="12" r="10"
                                        stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 
                                    018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 
                                    3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing ...
                            </button>
                            }

                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}
