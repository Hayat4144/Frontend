import React, { Fragment, useState, useEffect, lazy, Suspense } from 'react'
import { MdSort } from 'react-icons/md'
import { FiFilter } from 'react-icons/fi'
import { AiOutlineClose, AiOutlineCloseCircle } from 'react-icons/ai'
import { BsPlus, BsTypeH3 } from 'react-icons/bs'
import { AiOutlineMinus } from 'react-icons/ai'
import ProductImage from '../assets/images/thumbnail-1.jpg'
import NoResult from '../assets/images/no-results.png'
import Slider from '@mui/material/Slider';
import { createSearchParams, useSearchParams, useNavigate } from 'react-router-dom'
import NavbarSkeleton from '../Skeleton/NavbarSkeleton'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { Rating, Typography } from '@mui/material'
import OrderLoading from '../Skeleton/OrderLoading'
const Navbar = lazy(() => import('../UsableComponent/Navbar'))
const Footer = lazy(() => import('../UsableComponent/Footer'))




export default function ProductSearch() {
    //  ---------------------- All states ---------------------------- //
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [noProduct, setNoProduct] = useState(false)
    const [isSortOpen, setisSortOpen] = useState(false)
    const [isMobilfilter, setisMobilfilter] = useState(false)
    const [categoryOpen, setcategoryOpen] = useState(true)
    const [ColourOpen, setColourOpen] = useState(true)
    const [SizeOpen, setSizeOpen] = useState(true)
    const [PriceOpne, setPriceOpen] = useState(true)
    const [RatingOpen, setRatingOpen] = useState(true)
    const [price, setprice] = useState([0, 8000])
    const [totalProduct, setTotalProduct] = useState()
    const [showProductPerPage, setShowProductPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [sortPriceLowToHigh, setSortPriceLowToHigh] = useState('sortPriceLowToHigh')
    const [sortPriceHighToLow, setSortPriceHightToLow] = useState('sortPriceHighToLow')
    const [sortByName, setSortByName] = useState('name')
    const [sort, setsort] = useState(sortByName)
    const [Star1, setStar1] = useState(1)
    const [Star2, setStar2] = useState(2)
    const [Star3, setStar3] = useState(3)
    const [Star4, setStar4] = useState(4)
    const [Star, setStar] = useState(Star1)
    const [sortRelevence, setSortRelevence] = useState('Relevence')


    const navigate = useNavigate();
    const [searchParams] = useSearchParams();


    const priceHander = (event, newprice) => {
        setprice(newprice)
        // change the page number to load the fresh data accoring to the price
        setCurrentPage(1)
    }

    const searchvalue = searchParams.get('keyword')

    useEffect(() => {
        // ------------- Backend product fetch api url ------------------ //

        const link = `${import.meta.env.DEV ? import.meta.env.VITE_BACKEND_DEV_URL : import.meta.env.VITE_BACKEND_URL}/v4/api/get_all/product?search=${searchvalue}&price[gte]=${price[0]}&price[lte]=${price[1]}&page=${currentPage}&Star=${Star}&sort=${sort === 'sortPriceLowToHigh' ? 'price' : sort === 'sortPriceHighToLow' ? 'price' : sort}${sort === 'sortPriceHighToLow' ? '&orderby=desc' : ''}`;


        async function fetchProduct() {
            setIsLoading(!isLoading)
            await fetch(link, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            }).then(async res => {
                // if not found set no products and empty the products array .
                if (res.status !== 200) {
                    setNoProduct(true)
                    setIsLoading(false)
                    setProducts([])
                    return;
                }

                const { data } = await res.json();
                setIsLoading(false)
                const { result, total_result } = data[0];
                setProducts(result)
                setTotalProduct(Number(total_result[0].count))

            })
        }
        fetchProduct();
    }, [searchvalue, price, sort, currentPage, Star])



    //  ------------------ pagination logic ----------------
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

    //  -------------------- end of pagination logic ------------------

    // ---- calculating the product starting and ending number of every page

    // --- starting product 
    const startingProductNumber = (currentPage - 1) * showProductPerPage + 1;

    // --- ending product 
    var lastProductNumber;
    if (totalProduct < showProductPerPage) {
        lastProductNumber = totalProduct;
    } else {
        lastProductNumber = showProductPerPage * currentPage;
    }


    return (
        <Fragment>
            <Suspense fallback={<NavbarSkeleton />}>
                <Navbar />
            </Suspense>

            {isLoading ?
                <div className='w-full h-full'>
                    <OrderLoading />
                </div> :
                <Fragment>
                    {/*  ----------------------product count --------------------------  */}
                    {!noProduct || products.length > 0 ?
                        <div className='product_search_total_value_show border-b border-gray-400 
                            shadow-md h-10 w-full px-5 flex items-center justify-between'>
                            <h2 className='product_total_info'>Showing <span className='product_count'> {startingProductNumber} - {lastProductNumber} of {totalProduct} </span>
                                for result 
                                <span className='text-indigo-700 hover:cursor-pointer hover:text-indigo-900'>
                                    "{searchParams.get('keyword')}"
                                </span>
                            </h2>

                            {/*  ----------------- sort for large screeen --------------- */}
                            <div className='sortByContainer border border-gray-300 text-sm md:flex items-center hidden'>
                                <span className='sortby_text text-sm font-extrabold px-1'>Sort By:</span>
                                <select name="sort"
                                    id="sort"
                                    value={sort}
                                    onChange={(e) => setsort(e.target.value)}
                                    className='px-2 py-1 rounded-md bg-inherit'>
                                    <option value={sortByName}> Name</option>
                                    <option value={sortPriceHighToLow}> Price Hight to low</option>
                                    <option value={sortPriceLowToHigh}> Price low to High </option>
                                </select>
                            </div>
                            {/*  ------------------- end of sort for large screeen ----------------- */}

                        </div> : null}


                    {/*  -------------------- main container for product and filter ---------------------- */}
                    <main className='my-5 gap-y-5 md:flex space-x-5'>

                        {/*  --------------------- filter --------------- */}
                        <section className='filter md:w-[30%] mb-10'>
                            {/* filter for small screen */}
                            <aside className=' md:hidden filter-sort-for-mobile-only h-10 py-2 grid grid-cols-2 px-5'>

                                {/* --------------- sort --------- */}
                                <div className="sort_box flex items-center border border-gray-300">
                                    <h4>Sort:</h4>
                                    <select
                                        value={sort}
                                        onChange={(e) => setsort(e.target.value)}
                                        className='px-[6px] py-1 rounded-md bg-inherit text-sm'>
                                        <option value={sortByName}> Name</option>
                                        <option value={sortPriceHighToLow}>Price Hight to low</option>
                                        <option value={sortPriceLowToHigh}>Price low to High
                                        </option>
                                    </select>
                                </div>

                                {/* ------------------ start of filter for small screen ------------------- */}
                                <article className='filter'>
                                    {/* ---------- filter open icon ---------- */}
                                    <h3 className='flex items-center md:hidden space-x-3  md:float-left float-right font-[500]'>
                                        <span className='filter_text'>Filter</span>
                                        <FiFilter className='focus:text-indigo-800 text-xl'
                                            onClick={() => setisMobilfilter(!isMobilfilter)} />
                                    </h3>
                                    {/* ---------- close filter open icon --------- */}

                                    {/* --------------- filter body ------------  */}
                                    <aside className={`${isMobilfilter ? 'flex' : 'hidden'} w-full h-full 
                            flex fixed  bg-black inset-0 bg-opacity-30
                            opacity-100 space-x-10 z-50`}>
                                        <div className='filter_box bg-white w-4/6 h-full px-5 py-10'>
                                            <form className='filter-form my-4'>
                                                {/*  ---------------------- category facet------------------- */}
                                                <div className='category border-b border-gray-400 pb-2'>
                                                    <h3 className='Category-text flex w-full  justify-between items-center'><span> Category</span>{!categoryOpen ? < BsPlus fontSize={'22px'} onClick={() => { setcategoryOpen(!categoryOpen) }} /> : <AiOutlineMinus fontSize={'22px'} onClick={() => { setcategoryOpen(!categoryOpen) }} />} </h3>
                                                    <ul className={`${categoryOpen ? 'block' : 'hidden'} category-list-filter px-3 my-2`}>
                                                        <li className='text-sm flex items-center justify-between'><span className='category-list-item'>Jhumka</span> <input type={'checkbox'} className="accent-indigo-800 w-6 h-4" /></li>
                                                        <li className='text-sm flex items-center justify-between'><span className='category-list-item'>Bali</span> <input type={'checkbox'} className="accent-indigo-800 w-6 h-4" /></li>
                                                        <li className='text-sm flex items-center justify-between'><span className='category-list-item'>Necklace</span> <input type={'checkbox'} className="accent-indigo-800 w-6 h-4" /></li>
                                                        <li className='text-sm flex items-center justify-between'><span className='category-list-item'>Tops</span> <input type={'checkbox'} className="accent-indigo-800 w-6 h-4" /></li>
                                                    </ul>
                                                </div>

                                                {/*  ------------------ color facet -------------------- */}
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


                                                {/*  ------------------------- size facet --------------------- */}
                                                <div className='Size my-3 border-b border-gray-400 pb-2'>
                                                    <h3 className='Size-text flex w-full  justify-between items-center'><span>Size</span> {!SizeOpen ? <BsPlus fontSize={'22px'} onClick={() => { setSizeOpen(!SizeOpen) }} /> : <AiOutlineMinus fontSize={'22px'} onClick={() => { setSizeOpen(!SizeOpen) }} />} </h3>
                                                    <ul className={`${SizeOpen ? 'block' : 'hidden'} Size-list-filter px-3 my-2`}>
                                                        <li className='text-sm flex items-center justify-between'><span className='category-list-item'>Small</span> <input type={'checkbox'} className="accent-indigo-800 w-6 h-4" /></li>
                                                        <li className='text-sm flex items-center justify-between'><span className='category-list-item'>Medium</span> <input type={'checkbox'} className="accent-indigo-800 w-6 h-4" /></li>
                                                        <li className='text-sm flex items-center justify-between'><span className='category-list-item'>Large</span> <input type={'checkbox'} className="accent-indigo-800 w-6 h-4" /></li>
                                                    </ul>
                                                </div>

                                                {/* ------------------ price handling filter ------------------ */}
                                                <div className='Price my-3 border-b border-gray-400 pb-2'>
                                                    <h3 className='Price-text flex w-full  justify-between items-center'><span>Price</span> {!PriceOpne ? <BsPlus fontSize={'22px'} onClick={() => { setPriceOpen(!PriceOpne) }} /> : <AiOutlineMinus fontSize={'22px'} onClick={() => { setPriceOpen(!setPriceOpen) }} />} </h3>
                                                    <div className={`${PriceOpne ? 'block' : 'hidden'}
                                            Price-list-filter px-3 my-10`}>
                                                        <Slider
                                                            aria-label="Always visible"
                                                            value={price}
                                                            onChange={priceHander}
                                                            aria-lableledby="range-slider"
                                                            max={2000}
                                                            min={10}
                                                            step={20}
                                                            valueLabelDisplay="on"
                                                        />
                                                    </div>
                                                </div>
                                                {/* ------------------------- end of price handling filter */}
                                            </form>
                                        </div>
                                        <div className='close_icon mx-10 mt-5 text-white'>
                                            <AiOutlineCloseCircle className='text-4xl cursor-pointer'
                                                onClick={() => setisMobilfilter(!isMobilfilter)} />
                                        </div>
                                    </aside>
                                </article>
                            </aside>

                            {/*  ------------------- facet search large screen -------------------- */}
                            <aside className={` bg-white px-3 z-2 filter-aside hidden md:block rounded-md pb-5 `}>
                                <h3 className='filter-text flex  border-b pb-3 border-gray-400 font-[500] text-xl 
                                justify-between items-center'>
                                    <span className='pr-2'> Filter</span>
                                </h3>
                                <form className='filter-form my-4'>

                                    {/*  ---------------------- category facet------------------- */}
                                    <div className='category border-b border-gray-400 pb-2'>
                                        <Typography>This filter is under development.</Typography>
                                        <h3 className='Category-text flex w-full  justify-between items-center'><span> Category</span>{!categoryOpen ? < BsPlus fontSize={'22px'} onClick={() => { setcategoryOpen(!categoryOpen) }} /> : <AiOutlineMinus fontSize={'22px'} onClick={() => { setcategoryOpen(!categoryOpen) }} />} </h3>
                                        <ul className={`${categoryOpen ? 'block' : 'hidden'} category-list-filter px-3 my-2`}>
                                            <li className='text-sm flex items-center justify-between'><span className='category-list-item'>Jhumka</span> <input type={'checkbox'} className="accent-indigo-800 w-6 h-4" /></li>
                                            <li className='text-sm flex items-center justify-between'><span className='category-list-item'>Bali</span> <input type={'checkbox'} className="accent-indigo-800 w-6 h-4" /></li>
                                            <li className='text-sm flex items-center justify-between'><span className='category-list-item'>Necklace</span> <input type={'checkbox'} className="accent-indigo-800 w-6 h-4" /></li>
                                            <li className='text-sm flex items-center justify-between'><span className='category-list-item'>Tops</span> <input type={'checkbox'} className="accent-indigo-800 w-6 h-4" /></li>
                                        </ul>
                                    </div>

                                    {/*  ------------------ color facet -------------------- */}
                                    <div className='Colour my-3 border-b border-gray-400 pb-2'>
                                        <Typography>This filter is under development.</Typography>
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


                                    {/*  ------------------------- size facet --------------------- */}
                                    <div className='Size my-3 border-b border-gray-400 pb-2'>
                                        <Typography>This filter is under development.</Typography>
                                        <h3 className='Size-text flex w-full  justify-between items-center'><span>Size</span> {!SizeOpen ? <BsPlus fontSize={'22px'} onClick={() => { setSizeOpen(!SizeOpen) }} /> : <AiOutlineMinus fontSize={'22px'} onClick={() => { setSizeOpen(!SizeOpen) }} />} </h3>
                                        <ul className={`${SizeOpen ? 'block' : 'hidden'} Size-list-filter px-3 my-2`}>
                                            <li className='text-sm flex items-center justify-between'><span className='category-list-item'>Small</span> <input type={'checkbox'} className="accent-indigo-800 w-6 h-4" /></li>
                                            <li className='text-sm flex items-center justify-between'><span className='category-list-item'>Medium</span> <input type={'checkbox'} className="accent-indigo-800 w-6 h-4" /></li>
                                            <li className='text-sm flex items-center justify-between'><span className='category-list-item'>Large</span> <input type={'checkbox'} className="accent-indigo-800 w-6 h-4" /></li>
                                        </ul>
                                    </div>

                                    {/* -------------------- reviews facet ----------------- */}
                                    <div className='start my-3 border-b border-gray-300 pb-2'>
                                        <h3 className='Size-text flex w-full pb-3  justify-between items-center'>
                                            <span>Ratings</span>
                                            {!RatingOpen ?
                                                <BsPlus
                                                    fontSize={'22px'}
                                                    onClick={() => { setRatingOpen(!RatingOpen) }} /> :
                                                <AiOutlineMinus
                                                    fontSize={'22px'}
                                                    onClick={() => { setRatingOpen(!SizeOpen) }} />
                                            }
                                        </h3>
                                        <div className='rating_2_above flex items-center space-x-3'>
                                            <Rating
                                                value={Star4}
                                                onClick={() => setStar(Star4)}
                                                size="medium"
                                            />
                                            <span>4 and above</span>
                                        </div>
                                        <div className='rating_3_above flex items-center space-x-3'>
                                            <Rating
                                                value={Star3}
                                                onClick={() => setStar(Star3)}
                                                size="medium"
                                            />
                                            <span>3 and above</span>
                                        </div>
                                        <div className='rating_2_above flex items-center space-x-3'>
                                            <Rating
                                                value={Star2}
                                                onClick={() => setStar(Star2)}
                                                size="medium"
                                            />
                                            <span>2 and above</span>
                                        </div>
                                        <div className='rating_1_above flex items-center space-x-3'>
                                            <Rating
                                                value={Star1}
                                                onClick={() => setStar(Star1)}
                                                size="medium"
                                            />
                                            <span>1 and above</span>
                                        </div>

                                    </div>


                                    {/* ------------------ price handling filter ------------------ */}
                                    <div className='Price my-3 border-b border-gray-400 pb-2'>
                                        <h3 className='Price-text flex w-full  justify-between items-center'><span>Price</span> {!PriceOpne ? <BsPlus fontSize={'22px'} onClick={() => { setPriceOpen(!PriceOpne) }} /> : <AiOutlineMinus fontSize={'22px'} onClick={() => { setPriceOpen(!setPriceOpen) }} />} </h3>
                                        <div className={`${PriceOpne ? 'block' : 'hidden'}
                                        Price-list-filter px-3 my-10`}>
                                            <Slider
                                                aria-label="Always visible"
                                                value={price}
                                                onChange={priceHander}
                                                aria-lableledby="range-slider"
                                                max={2000}
                                                min={10}
                                                step={20}
                                                valueLabelDisplay="on"
                                            />
                                        </div>
                                    </div>
                                    {/* ------------------------- end of price handling filter */}
                                </form>
                            </aside>
                        </section >

                        {/*  -------------------------- product show ------------------- */}
                        <section className='md:col-span-3 mx-5  lg:col-span-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                            {
                                !noProduct || products.length > 0 ? products.map(item => (

                                    <div key={item._id} className="cursor-pointer">
                                        <figure className='overflow-hidden rounded-md'>
                                            <img src={item.assets.images[0]} alt="product-pic"
                                                className='w-full h-56 rounded-md hover:scale-125  transition ease-in-out duration-500' />
                                        </figure>
                                        <div className='product_details my-2' onClick={() => {
                                            navigate(`/V2/shop/product/${item._id}/${item.name}/${item.category}`)
                                        }}>
                                            <p className='product_name capitalize w-full 
                                    text-[17px] font-extrabold hover:text-indigo-700'>
                                                {item.name}
                                            </p>
                                            <p className='product_description'>
                                                {item.description.length > 80 ? `${item.description.slice(0, 60)} ...` : item.description}
                                            </p>
                                            <Rating value={item.average_rating} />
                                            <p className='product_price text-xl'>
                                                <span className='currency_symbol'> Rs </span>
                                                {item.price}
                                            </p>
                                        </div>
                                    </div>

                                )) : <Fragment>
                                    {/*  ----------------------- no result found------------------ */}
                                    <div className='w-full h-screen col-span-5 md:mx-40 my-20 '>
                                        <div className="no-serach-result md:flex md:items-center md:space-x-10 ">
                                            <figure className='no-search-result-image-container mx-32 md:mx-0 '>
                                                <img src={NoResult} alt="not found pic"
                                                    className="cursor-pointer md:w-full " />
                                            </figure>
                                            <div className="no_result_text_box text-center">
                                                <div className='no_result_found'>
                                                    <h1 className='font-bold text-3xl my-5'>Results not found</h1>
                                                    <p className='my-5'>Sorry!  we could not found the information
                                                        at that moment which you want.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </Fragment>
                            }
                        </section>


                    </main >

                    {/*  -------------------- pagination container -------------------- */}
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
                    {/* ----------------------- end of pagination contianer ------------------- */}

                    {/* ---------------------------- footer -------------- */}
                    <Suspense fallback={<p>loading...</p>}>
                        <Footer />
                    </Suspense>
                </Fragment>}


        </Fragment >
    )
}
