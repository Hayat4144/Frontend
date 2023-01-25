import React, { Fragment, useState } from 'react'
import { useEffect } from 'react';
import { HiOutlineUserCircle } from 'react-icons/hi'
import { BsStarFill } from 'react-icons/bs'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';


export default function UserReview({ rating_review }) {
    // ------------------- all States ----------------- //
    const [Rating, setRating] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const { id } = useParams();
    useEffect(() => {
        const fetchreview = async () => {


            setIsLoading(!isLoading)
            await fetch(`http://localhost:5000/v4/api/products/ratings/review?product_id=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include"
            }).then(async res => {
                const { error, data } = await res.json();
                setIsLoading(!isLoading)
                if (res.status !== 200) {
                    toast.error(error, {
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
                setRating(data)

            }).catch(err => console.log(err))
        }

        fetchreview();
    }, [])
    return (
        <Fragment>
            {
                Rating.map((rating, index) => (
                    <section className='user_rating_review border-b border-gray-300 my-5' key={index}>
                        <div className='user_profile_reviews items-center flex space-x-5'>
                            <figure className=''>
                                <HiOutlineUserCircle className='text-4xl' />
                            </figure>
                            <h1 className='user_name_rating space-y-1'>
                                <span className="user_name font-bold text-xl">{rating.user.firstName} {rating.user.lastName}</span>
                                <div className='stars flex items-center space-x-1'>
                                    {Array.from({ length: rating.Star }, (_, i) => (
                                        <BsStarFill className='text-yellow-400 text-xl' key={i} />
                                    ))}
                                </div>
                            </h1>
                        </div>
                        <div className='my-3'>
                            <p>{rating.comment}</p>
                        </div>
                    </section>
                ))
            }

        </Fragment>
    )
}
