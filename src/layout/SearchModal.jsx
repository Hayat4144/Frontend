import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, createSearchParams } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'

export default function SearchModal({ SearchModal, SearchModalToggle }) {
    const [isModalOpen, setisModalOpen] = useState(SearchModal)
    const [keyword, setKeyword] = useState('')
    const navigate = useNavigate();


    useEffect(() => {
        setisModalOpen(SearchModal)
    }, [SearchModal])

    const handlekeyDown = (event) => {
        if (event.key === 'Enter') {
            searchProducts();
        }
    }


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
            <div className={`mobile_menu_dialog_model fixed md:hidden  w-full
              inset-0 z-50 ${isModalOpen ? 'flex' : 'hidden'}`}
            >
                <div className='bg-white h-full w-full'>
                    <div className='search-box flex border-b px-2 border-gray-300 items-center justify-start py-5'>
                        <AiOutlineArrowLeft onClick={() => SearchModalToggle(isModalOpen)} className='text-zinc-500 cursor-pointer text-xl font-semibold' />
                        <input
                            id="myInput"
                            type="search"
                            name="search"
                            autoFocus
                            className="w-full mx-2 py-1 px-2 cursor-auto focus:cursor-text outline-none  text-gray-600 placeholder:text-zinc-500"
                            placeholder="Search the website ..."
                            value={keyword}
                            onKeyDown={handlekeyDown}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                    </div>

                </div>
            </div>
        </Fragment>
    )
}
