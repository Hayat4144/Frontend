import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function CategoryChildrenModal({ IsModalOpen, toggleModal, childData }) {
    const [modalOpen, setModalOpen] = useState(IsModalOpen)
    useEffect(() => {
        setModalOpen(IsModalOpen)
    }, [IsModalOpen])
    return (
        <Fragment>
            <section
                onMouseLeave={() => toggleModal(modalOpen)}
                className={`z-50 ${modalOpen ? 'absolute' : 'hidden'} bg-white shadow-md top-20 left-36 w-3/5
                px-10 py-5 h-[45%] text-[14px]`}>
                <ul className='grid grid-rows-5 grid-flow-col gap-2'>
                    {childData.map(childCat => (
                        <Link to={`/${encodeURIComponent(childCat.category)}`} key={childCat._id}>
                            <li className='hover:text-indigo-700 hover:translate-x-2 duration-150 ease-in-out
                        cursor-pointer py-1' >{childCat.name}</li>
                        </Link>

                    ))}
                </ul>
            </section>
        </Fragment>
    )
}
