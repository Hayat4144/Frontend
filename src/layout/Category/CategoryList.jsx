import React, { Fragment, useState } from 'react'
import { Category } from '../../global/CategoryData'
import CategoryChildrenModal from './CategoryChildrenModal';

export default function CategoryList() {
    const [hoveredCategoryId, setHoveredCategoryId] = useState(null);
    const [IsModalOpen, setIsModalOpen] = useState(false)

    const handleMouseEnter = (categoryId) => {
        setHoveredCategoryId(categoryId);
        setIsModalOpen(true)
    };


    const ToggleModal = (state) => {
        setIsModalOpen(!state)
        setHoveredCategoryId(null)
    }

    return (
        <Fragment>
            <ul className='flex items-center space-x-5'>
                {Category.map(cat => (
                    <Fragment key={cat._id}>
                        <li key={cat._id}
                            onMouseEnter={(e) => {
                                e.stopPropagation();
                                console.log('top cat enter')
                                handleMouseEnter(cat._id)
                            }}
                            className="hover:text-indigo-700 hover:border-b-2 
                        hover:border-indigo-700 duration-150 ease-in-out
                        cursor-pointer py-4 text-[17px]">
                            {cat.name}
                        </li>
                        {hoveredCategoryId === cat._id && (
                            <CategoryChildrenModal IsModalOpen={IsModalOpen} toggleModal={ToggleModal} childData={cat.children} />
                        )}
                    </Fragment>

                ))}
            </ul>

        </Fragment>
    )
}

