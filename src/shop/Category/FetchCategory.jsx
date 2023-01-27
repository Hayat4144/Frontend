import React, { Fragment, useState, useEffect, Suspense, lazy } from 'react'
import { AiOutlineDown } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { FETCHCATEGORY } from '../../Context/Actions/ActionType';


export default function FetchCategory() {
    const dispatch = useDispatch();
    const { data } = useSelector(state => state.Category)
    console.log(data)
    const FetchCate = async () => {
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/v4/api/get_all_categories`, {
            method: 'GET',
            credentials: 'include'
        })
            .then(async (res) => {
                var { data } = await res.json();
                const l = dispatch({ type: FETCHCATEGORY, payload: data })
                console.log(l)
            }).catch(error => console.log(error))
    }
    useEffect(() => {
        if (data.length === 0) {
            FetchCate()
        }
    }, [])

    const RenderCategories = (Category) => {
        let All_Category = []
        for (const cate of Category) {
            All_Category.push(
                <div key={cate._id} className="font-[500] list-none flex items-center 
                    space-x-2  hover:text-indigo-700
                    cursor-pointer transition ease-in-out
                    duration-400">
                    <h2 className='font-[500]' onMouseOver={() => {
                        return cate.children.length > 0 ? (<ul><li>{RenderCategories(cate.children)}</li></ul>) : null
                    }}>
                        {cate.name}
                    </h2>
                    <span className='open_menu_arrow'>
                        <AiOutlineDown className='text-[10px]' />
                    </span>
                    {/* {cate.children.length > 0 ? (<ul><li>{RenderCategories(cate.children)}</li></ul>) : null} */}
                </div>

            )
        }
        return All_Category;
    }

    return (
        <Fragment>
            <div className='category_contianer h-10 w-full mx-5'>
                <div className='category_data flex item-center space-x-10 py-2'>
                    {/* {
                        data.map(item => (
                            <div className='flex items-center space-x-2 
                            cursor-pointer hover:text-indigo-700
                            transition ease-in-out duration-400
                            '
                                key={item._id}>
                                <h2 className='font-[500]'>
                                    {item.name}
                                </h2>
                                <span className='open_menu_arrow'>
                                    <AiOutlineDown className='text-[10px]' />
                                </span>
                            </div>
                        ))
                    } */}
                    {RenderCategories(data)}
                    {/* <ChildrenCateogry /> */}
                </div>
                <div onMouseOver={() => {
                    const l = 4;
                    l > 1 ? (<li>heello</li>) : null;
                }}> hover it</div>
            </div>
        </Fragment>
    )
}
