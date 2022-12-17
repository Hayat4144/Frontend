import React, { Fragment, useState, useEffect } from 'react'
import Navbar from '../UsableComponent/Navbar'
import { MdSort } from 'react-icons/md'
import { FiFilter } from 'react-icons/fi'
import { AiOutlineClose } from 'react-icons/ai'
import { BsPlus } from 'react-icons/bs'
import { AiOutlineMinus } from 'react-icons/ai'
import ProductImage from '../assets/images/thumbnail-1.jpg'
import Slider from '@mui/material/Slider';
import { createSearchParams, useSearchParams, useNavigate } from 'react-router-dom'
import Paginations from '../UsableComponent/Paginations'
import Footer from '../UsableComponent/Footer'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { AiOutlineArrowLeft } from 'react-icons/ai'


export default function ProductSearch() {
    const [products, setProducts] = useState([])
    const [isSortOpen, setisSortOpen] = useState(false)
    const [isFilterOpen, setisFilterOpen] = useState(false)
    const [categoryOpen, setcategoryOpen] = useState(false)
    const [ColourOpen, setColourOpen] = useState(false)
    const [SizeOpen, setSizeOpen] = useState(false)
    const [filterOpne, setfilterOpen] = useState(false)
    const [PriceOpne, setPriceOpen] = useState(false)
    const [price, setprice] = useState([0, 400])
    const [totalProduct, setTotalProduct] = useState()
    const [showProductPerPage, setShowProductPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();


    const priceHander = (event, newprice) => {
        setprice(newprice)
        // change the page number to load the fresh data accoring to the price
        setCurrentPage(1)
    }

    useEffect(() => {

        if (searchParams.get('price[gte]') && searchParams.get('price[lte]') && searchParams.get('page')) {
            searchParams.delete('price[lte]')
            searchParams.delete('price[gte]')
            searchParams.delete('page', currentPage)
        }
        else {
            searchParams.append('price[gte]', price[0])
            searchParams.append('price[lte]', price[1])
            searchParams.append('page', currentPage)
            navigate({
                pathname: location.pathname,
                search: `?${createSearchParams(searchParams)}`
            })
        }
        const link = `http://localhost:5000/v4/api/get_all/product?search=${searchParams.get('keyword')}&price[gte]=${price[0]}&price[lte]=${price[1]}&page=${currentPage}`
        async function fetchproducts() {
            await fetch(link, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                },
                credentials: 'include'
            }).then(async (res) => {
                const { data } = await res.json();
                const { result, total_result } = data[0];
                setProducts(result)
                setTotalProduct(Number(total_result[0].count))
            })
        }
        fetchproducts();
    }, [price, navigate, searchParams, searchParams.get('keyword'), currentPage, setTotalProduct, setProducts])

    if (totalProduct > 10) {
        var numberofPages = Math.ceil(totalProduct / 10);
        var page_number = [...Array(numberofPages + 1).keys()].slice(1)
    }


    const nextPage = () => {
        if (currentPage !== numberofPages) {
            setCurrentPage(currentPage + 1)
        }

    }
    const previousPage = () => {
        if (currentPage !== 1)
            setCurrentPage(currentPage - 1)
    }

    console.log(currentPage)

    return (
        <Fragment>
            <header>
                <Navbar />
            </header>
            <div className='product_search_total_value_show'>
                <h2 className='product_total_info'>Showing <span className=''> {showProductPerPage} of {totalProduct} </span>
                    result of <span className='text-indigo-700 hover:cursor-pointer
                    hover:text-indigo-900'>
                        "{searchParams.get('keyword')}"
                    </span>
                </h2>
            </div>

            <main className='my-5 md:my-10 grid grid-cols-1 md:grid-cols-5 lg:grid-cols-7 gap-y-5'>
                <section className='sort_filter md:col-span-1'>
                    {/* for mobile only */}
                    <section className=' md:hidden filter-sort-for-mobile-only h-10 py-2 grid grid-cols-2 px-5'>
                        <article className='sort'>
                            <h3 className='flex items-center font-[500]'>Sort {isSortOpen ? <AiOutlineClose className='mx-2' onClick={() => { setisSortOpen(!setisSortOpen) }} fontSize={'20px'} /> : <MdSort onClick={() => { setisSortOpen(!isSortOpen) }} className='mx-2' fontSize={'22px'} />}</h3>
                            <aside className={` ${isSortOpen ? 'visible' : 'hidden'} side-sort-menu z-2 bg-white absolute left-0  w-[15em] px-5`}>
                                <form className='sort-form my-3 space-y-3'>
                                    <div className='input-field flex items-center justify-between text-center'>
                                        <label htmlFor='relevance'>Relevance</label>
                                        <input type={'checkbox'} id='relevance' className='' />
                                    </div>
                                    <div className='input-field flex items-center justify-between text-center'>
                                        <label htmlFor='low-to-high'>Price low-to-high</label>
                                        <input type={'checkbox'} id='low-to-high' className='' />
                                    </div>
                                    <div className='input-field flex items-center justify-between text-center'>
                                        <label htmlFor='high-to-low'>Price high-to-low</label>
                                        <input type={'checkbox'} id='high-to-low' className='' />
                                    </div>
                                    <div className='input-field flex items-center justify-between text-center'>
                                        <label htmlFor='new-arrivals'>New Arrivals</label>
                                        <input type={'checkbox'} id='new-arrivals' className='' />
                                    </div>
                                    <div className='input-field flex items-center justify-between text-center'>
                                        <label htmlFor='discount'>Discount</label>
                                        <input type={'checkbox'} id='discount' className='' />
                                    </div>
                                    <div className='input-field flex items-center justify-between text-center'>
                                        <label htmlFor='tranding'>Tranding</label>
                                        <input type={'checkbox'} id='tranding' className='' />
                                    </div>
                                </form>
                            </aside>
                        </article>

                        <article className='filter'>
                            <h3 className='flex items-center md:hidden  md:float-left float-right font-[500]'> Filter <FiFilter className='mx-2' fontSize={'20px'} onClick={() => {
                                setfilterOpen(!isFilterOpen)
                            }} /></h3>
                            <aside className={` ${filterOpne ? 'visible' : 'hidden'} md:block bg-white px-5 z-2 filter-aside absolute left-36 w-56  top-14  h-screen`}>
                                <h3 className='filter-text flex  border-b pb-3 border-gray-400 font-[500] text-xl justify-between items-center'><span className='pr-2'> Filter</span><AiOutlineClose className='md:hidden ' onClick={() => { setfilterOpen(!filterOpne) }} fontSize={'20px'} /></h3>
                                <form className='filter-form my-4'>
                                    <div className='category border-b border-gray-400 pb-2'>
                                        <h3 className='Category-text flex w-full  justify-between items-center'><span> Category</span>{!categoryOpen ? < BsPlus fontSize={'22px'} onClick={() => { setcategoryOpen(!categoryOpen) }} /> : <AiOutlineMinus fontSize={'22px'} onClick={() => { setcategoryOpen(!categoryOpen) }} />} </h3>
                                        <ul className={`${categoryOpen ? 'block' : 'hidden'} category-list-filter px-3 my-2`}>
                                            <li className='text-sm flex items-center justify-between'><span className='category-list-item'>Jhumka</span> <input type={'checkbox'} className="accent-indigo-800 w-6 h-4" /></li>
                                            <li className='text-sm flex items-center justify-between'><span className='category-list-item'>Bali</span> <input type={'checkbox'} className="accent-indigo-800 w-6 h-4" /></li>
                                            <li className='text-sm flex items-center justify-between'><span className='category-list-item'>Necklace</span> <input type={'checkbox'} className="accent-indigo-800 w-6 h-4" /></li>
                                            <li className='text-sm flex items-center justify-between'><span className='category-list-item'>Tops</span> <input type={'checkbox'} className="accent-indigo-800 w-6 h-4" /></li>
                                        </ul>
                                    </div>
                                    <div className='Colour my-3 border-b border-gray-400 pb-2'>
                                        <h3 className='Colour-text flex w-full  justify-between items-center'><span> Colour</span> {!ColourOpen ? < BsPlus fontSize={'22px'} onClick={() => { setColourOpen(!ColourOpen) }} /> : <AiOutlineMinus fontSize={'22px'} onClick={() => { setColourOpen(!ColourOpen) }} />}</h3>
                                        <ul className={`${ColourOpen ? 'block' : 'hidden'} Colour-list-filter px-3 my-2`}>
                                            <li className='text-sm flex items-center justify-between'><span className='category-list-item'>Rani</span> <input type={'checkbox'} className="accent-indigo-800 w-6 h-4" /></li>
                                            <li className='text-sm flex items-center justify-between'><span className='category-list-item'>Silver</span> <input type={'checkbox'} className="accent-indigo-800 w-6 h-4" /></li>
                                            <li className='text-sm flex items-center justify-between'><span className='category-list-item'>Black</span> <input type={'checkbox'} className="accent-indigo-800 w-6 h-4" /></li>
                                            <li className='text-sm flex items-center justify-between'><span className='category-list-item'>orange</span> <input type={'checkbox'} className="accent-indigo-800 w-6 h-4" /></li>
                                            <li className='text-sm flex items-center justify-between'><span className='category-list-item'>Pink</span> <input type={'checkbox'} className="accent-indigo-800 w-6 h-4" /></li>
                                            <li className='text-sm flex items-center justify-between'><span className='category-list-item'>Mahroon</span> <input type={'checkbox'} className="accent-indigo-800 w-6 h-4" /></li>
                                        </ul>
                                    </div>
                                    {/* <div className='Size my-3 border-b border-gray-400 pb-2'>
                                        <h3 className='Size-text flex w-full  justify-between items-center'><span>Size</span> {!SizeOpen ? <BsPlus fontSize={'22px'} onClick={() => { setSizeOpen(!SizeOpen) }} /> : <AiOutlineMinus fontSize={'22px'} onClick={() => { setSizeOpen(!SizeOpen) }} />} </h3>
                                        <ul className={`${SizeOpen ? 'block' : 'hidden'} Size-list-filter px-3 my-2`}>
                                            <li className='text-sm flex items-center justify-between'><span className='category-list-item'>Small</span> <input type={'checkbox'} className="accent-indigo-800 w-6 h-4" /></li>
                                            <li className='text-sm flex items-center justify-between'><span className='category-list-item'>Medium</span> <input type={'checkbox'} className="accent-indigo-800 w-6 h-4" /></li>
                                            <li className='text-sm flex items-center justify-between'><span className='category-list-item'>Large</span> <input type={'checkbox'} className="accent-indigo-800 w-6 h-4" /></li>
                                        </ul>
                                    </div> */}
                                    <div className='Price my-3 border-b border-gray-400 pb-2'>
                                        <h3 className='Price-text flex w-full  justify-between items-center'><span>Price</span> {!PriceOpne ? <BsPlus fontSize={'22px'} onClick={() => { setPriceOpen(!PriceOpne) }} /> : <AiOutlineMinus fontSize={'22px'} onClick={() => { setPriceOpen(!setPriceOpen) }} />} </h3>
                                        <div className={`${PriceOpne ? 'block' : 'hidden'}
                                        Price-list-filter px-3 my-10`}>
                                            <Slider
                                                aria-label="Always visible"
                                                value={price}
                                                onChange={priceHander}
                                                aria-lableledby="range-slider"
                                                max={400}
                                                min={10}
                                                step={10}
                                                valueLabelDisplay="on"
                                            />
                                        </div>
                                    </div>
                                </form>
                            </aside>
                        </article>
                    </section >
                    <section section className='filter&sort-medium-large-screen hidden md:block' >
                        <article className='sort rounded-md bg-white'>
                            <h3 className='flex font-[500] justify-between items-center py-3 rounded-md mx-3 bg-white '>Sort By {isSortOpen ? <AiOutlineMinus className='mx-2' onClick={() => { setisSortOpen(!setisSortOpen) }} fontSize={'20px'} /> : <BsPlus onClick={() => { setisSortOpen(!isSortOpen) }} className='mx-2' fontSize={'22px'} />}</h3>
                            <aside className={` ${isSortOpen ? 'visible' : 'hidden'} side-sort-menu z-2 bg-white px-5`}>
                                <form className='sort-form my-3 space-y-3'>
                                    <div className='input-field flex items-center justify-between text-center'>
                                        <label htmlFor='relevance'>Relevance</label>
                                        <input type={'checkbox'} id='relevance' className='' />
                                    </div>
                                    <div className='input-field flex items-center justify-between text-center'>
                                        <label htmlFor='low-to-high'>Price low-to-high</label>
                                        <input type={'checkbox'} id='low-to-high' className='' />
                                    </div>
                                    <div className='input-field flex items-center justify-between text-center'>
                                        <label htmlFor='high-to-low'>Price high-to-low</label>
                                        <input type={'checkbox'} id='high-to-low' className='' />
                                    </div>
                                    <div className='input-field flex items-center justify-between text-center'>
                                        <label htmlFor='new-arrivals'>New Arrivals</label>
                                        <input type={'checkbox'} id='new-arrivals' className='' />
                                    </div>
                                    <div className='input-field flex items-center justify-between text-center'>
                                        <label htmlFor='discount'>Discount</label>
                                        <input type={'checkbox'} id='discount' className='' />
                                    </div>
                                    <div className='input-field flex items-center justify-between text-center'>
                                        <label htmlFor='tranding'>Tranding</label>
                                        <input type={'checkbox'} id='tranding' className='' />
                                    </div>
                                </form>
                            </aside>
                        </article>

                        {/* for filter */}
                        <article className='filter rounded'>
                            <h3 className='flex items-center md:hidden  md:float-left float-right font-[500]'> Filter <FiFilter className='mx-2' fontSize={'20px'} onClick={() => {
                                setfilterOpen(!isFilterOpen)
                            }} /></h3>
                            <aside className={` bg-white px-5 z-2 filter-aside rounded-md pb-5 `}>
                                <h3 className='filter-text flex  border-b pb-3 border-gray-400 font-[500] text-xl justify-between items-center'><span className='pr-2'> Filter</span><AiOutlineClose className='md:hidden ' onClick={() => { setfilterOpen(!filterOpne) }} fontSize={'20px'} /></h3>
                                <form className='filter-form my-4'>
                                    <div className='category border-b border-gray-400 pb-2'>
                                        <h3 className='Category-text flex w-full  justify-between items-center'><span> Category</span>{!categoryOpen ? < BsPlus fontSize={'22px'} onClick={() => { setcategoryOpen(!categoryOpen) }} /> : <AiOutlineMinus fontSize={'22px'} onClick={() => { setcategoryOpen(!categoryOpen) }} />} </h3>
                                        <ul className={`${categoryOpen ? 'block' : 'hidden'} category-list-filter px-3 my-2`}>
                                            <li className='text-sm flex items-center justify-between'><span className='category-list-item'>Jhumka</span> <input type={'checkbox'} className="accent-indigo-800 w-6 h-4" /></li>
                                            <li className='text-sm flex items-center justify-between'><span className='category-list-item'>Bali</span> <input type={'checkbox'} className="accent-indigo-800 w-6 h-4" /></li>
                                            <li className='text-sm flex items-center justify-between'><span className='category-list-item'>Necklace</span> <input type={'checkbox'} className="accent-indigo-800 w-6 h-4" /></li>
                                            <li className='text-sm flex items-center justify-between'><span className='category-list-item'>Tops</span> <input type={'checkbox'} className="accent-indigo-800 w-6 h-4" /></li>
                                        </ul>
                                    </div>
                                    <div className='Colour my-3 border-b border-gray-400 pb-2'>
                                        <h3 className='Colour-text flex w-full  justify-between items-center'><span> Colour</span> {!ColourOpen ? < BsPlus fontSize={'22px'} onClick={() => { setColourOpen(!ColourOpen) }} /> : <AiOutlineMinus fontSize={'22px'} onClick={() => { setColourOpen(!ColourOpen) }} />}</h3>
                                        <ul className={`${ColourOpen ? 'block' : 'hidden'} Colour-list-filter px-3 my-2`}>
                                            <li className='text-sm flex items-center justify-between'><span className='category-list-item'>Rani</span> <input type={'checkbox'} className="accent-indigo-800 w-6 h-4" /></li>
                                            <li className='text-sm flex items-center justify-between'><span className='category-list-item'>Silver</span> <input type={'checkbox'} className="accent-indigo-800 w-6 h-4" /></li>
                                            <li className='text-sm flex items-center justify-between'><span className='category-list-item'>Black</span> <input type={'checkbox'} className="accent-indigo-800 w-6 h-4" /></li>
                                            <li className='text-sm flex items-center justify-between'><span className='category-list-item'>orange</span> <input type={'checkbox'} className="accent-indigo-800 w-6 h-4" /></li>
                                            <li className='text-sm flex items-center justify-between'><span className='category-list-item'>Pink</span> <input type={'checkbox'} className="accent-indigo-800 w-6 h-4" /></li>
                                            <li className='text-sm flex items-center justify-between'><span className='category-list-item'>Mahroon</span> <input type={'checkbox'} className="accent-indigo-800 w-6 h-4" /></li>
                                        </ul>
                                    </div>
                                    <div className='Size my-3 border-b border-gray-400 pb-2'>
                                        <h3 className='Size-text flex w-full  justify-between items-center'><span>Size</span> {!SizeOpen ? <BsPlus fontSize={'22px'} onClick={() => { setSizeOpen(!SizeOpen) }} /> : <AiOutlineMinus fontSize={'22px'} onClick={() => { setSizeOpen(!SizeOpen) }} />} </h3>
                                        <ul className={`${SizeOpen ? 'block' : 'hidden'} Size-list-filter px-3 my-2`}>
                                            <li className='text-sm flex items-center justify-between'><span className='category-list-item'>Small</span> <input type={'checkbox'} className="accent-indigo-800 w-6 h-4" /></li>
                                            <li className='text-sm flex items-center justify-between'><span className='category-list-item'>Medium</span> <input type={'checkbox'} className="accent-indigo-800 w-6 h-4" /></li>
                                            <li className='text-sm flex items-center justify-between'><span className='category-list-item'>Large</span> <input type={'checkbox'} className="accent-indigo-800 w-6 h-4" /></li>
                                        </ul>
                                    </div>
                                    <div className='Price my-3 border-b border-gray-400 pb-2'>
                                        <h3 className='Price-text flex w-full  justify-between items-center'><span>Price</span> {!PriceOpne ? <BsPlus fontSize={'22px'} onClick={() => { setPriceOpen(!PriceOpne) }} /> : <AiOutlineMinus fontSize={'22px'} onClick={() => { setPriceOpen(!setPriceOpen) }} />} </h3>
                                        <div className={`${PriceOpne ? 'block' : 'hidden'}
                                        Price-list-filter px-3 my-2`}>
                                            <Slider
                                                aria-label="Always visible"
                                                value={price}
                                                onChange={priceHander}
                                                aria-lableledby="range-slider"
                                                max={400}
                                                min={10}
                                                step={10}
                                                valueLabelDisplay="on"
                                            />
                                        </div>
                                    </div>
                                </form>
                            </aside>
                        </article>
                    </section >
                </section >
                <section className='md:col-span-3 mx-5 lg:col-span-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                    {
                        products.length > 0 ? products.map(item => (
                            <div key={item._id} className="cursor-pointer">
                                <figure className='overflow-hidden rounded-md'>
                                    <img src={ProductImage} alt="product-pic"
                                        className='w-full h-56 rounded-md hover:scale-125  transition ease-in-out duration-500' />
                                </figure>
                                <div className='product_details my-2'>
                                    <p className='product_name capitalize w-full text-[17px] 
                                    hover:text-indigo-700'>
                                        {item.name}
                                    </p>
                                    <p className='product_price text-[18px]'>
                                        <span className='currency_symbol'> Rs </span>
                                        {item.price}
                                    </p>
                                </div>
                            </div>
                        )) : <Fragment>
                            not found
                        </Fragment>
                    }
                </section>
            </main >
            {
                totalProduct > 10 ? <div className='paginations my-16'>
                    <section className='pagination_container my-5'>
                        <div className='pagination_box flex items-center justify-center space-x-5'>
                            <div className='previous_btn'>
                                <button onClick={previousPage} disabled={currentPage === 1 ? true : false} className='bg-indigo-700 text-white  md:px-16 py-1.5 
                                 rounded-md text-center px-3'>
                                    <AiOutlineArrowLeft className='md:text-2xl' />
                                </button>
                            </div>
                            <div className='page_number_container  flex items-center space-x-3'>
                                {
                                    page_number.map(pg_number => (
                                        <button key={pg_number}
                                            onClick={() => {
                                                setCurrentPage(pg_number)
                                            }}
                                            className=
                                            {`${currentPage === pg_number ? 'border-none bg-indigo-700 text-white rounded-full outline-none' : ''}
                                                rounded-full
                                                focus:border-non hover:border-none
                                                transition ease-out duration-500 hover:bg-indigo-700
                                                w-8 h-8 hover:border border-gray-300 border
                                                hover:text-white`}
                                        >{pg_number}</button>
                                    ))
                                }


                            </div>
                            <div className='next_btn'>
                                <button onClick={nextPage}
                                    className='bg-indigo-700 md:px-16 text-white py-1.5 
                                    px-4 rounded-md text-center'>
                                    <AiOutlineArrowRight className='md:text-2xl' />
                                </button>
                            </div>
                        </div>
                    </section>
                </div > : ''
            }

            <Footer />
        </Fragment >
    )
}
