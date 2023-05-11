import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, createSearchParams } from 'react-router-dom'

export default function SearchModal({ SearchModal, SearchModalToggle }) {
    const [isModalOpen, setisModalOpen] = useState(SearchModal)
    const [keyword, setKeyword] = useState('')
    const navigate = useNavigate();
    

    useEffect(() => {
        setisModalOpen(SearchModal)
    }, [SearchModal])

    //  ----------------------- search products --------------- //
    const searchProducts = () => {
        SearchModalToggle(isModalOpen)
        const params = { 'keyword': keyword }
        navigate({
            pathname: '/V2/shop/search',
            search: `?${createSearchParams(params)}`
        })
    }
    return (
        <Fragment>
            <div className={`mobile_menu_dialog_model fixed md:hidden bg-black w-full
             opacity-100 bg-opacity-30 inset-0 z-50 flex items-center justify-center ${isModalOpen ? 'flex' : 'hidden'}`}
            >
                <div className='user_review_body bg-white w-[90%]  py-5 px-5  rounded-md'>
                    <h1 className='body_title text-xl font-bold'>
                        Search the products
                    </h1>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        searchProducts();
                    }}>
                        <div className="comment_field">
                            <input type={'search'} name="search"
                                className='border border-gray-400 rounded-md my-4
                            outline-none w-full px-5 py-2 focus:border-indigo-600
                            focus:ring-indigo-700 bg-inherit focus:border  
                            text-gray-700 placeholder:text-gray-500'
                                placeholder='Search the website ...'
                                value={keyword}
                                onChange={e => setKeyword(e.target.value)} />
                        </div>
                        <div className='sumbit-btn my-5 space-x-5'>
                            <button type='button'
                                onClick={() => SearchModalToggle(isModalOpen)}
                                className='w-24 px-5 h-10 bg-red-800 text-white py-1
                            rounded-md hover:bg-red-700 focus:outline-none focus:border focus:border-red-500
                            focus:bg-transparent focus:text-black '>Cancel</button>
                            <button type='submit' disabled={keyword.length < 2 ? true : false}
                                className='h-10 text-center text-white outline-none text-bold bg-indigo-800 rounded-md
                              hover:bg-indigo-700 px-5'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}
