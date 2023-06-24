import React, { Fragment, useState, useEffect, lazy, Suspense } from "react";
import { BASE_URL } from "../global/Base_URL";
const Navbar = lazy(() => import("../layout/Nav/Navbar"));
const Footer = lazy(() => import("../layout/Footer"));
import NavbarSkeleton from "../Skeleton/NavbarSkeleton";
import { useSearchParams } from "react-router-dom";
import ProductList from "../layout/ProductSearch/ProductList";
import ShowHeaderInfo from "../layout/ProductSearch/ShowHeaderInfo";
import SortFilter from "../layout/ProductSearch/SortFilter";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FiFilter } from "react-icons/fi";
import PriceFilter from "../layout/ProductSearch/PriceFilter";
import StarFilter from "../layout/ProductSearch/StarFilter";
import Pagination from "../Components/Pagination";
import { Typography } from "@mui/material";
import SampleProductSkeleton from "../Skeleton/SampleProductSkeleton";


const MemoNavbarSkeleton = React.memo(NavbarSkeleton);
const MemoNavbar = React.memo(Navbar);
const MemoFooter = React.memo(Footer);
const MemoProductList = React.memo(ProductList);
const MemoSampleProductSkeleton = React.memo(SampleProductSkeleton);

export default function ProductSrch() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noProduct, setNoProduct] = useState(false);
  const [totalProduct, setTotalProduct] = useState();
  const [showProductPerPage, setShowProductPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [RatingOpen, setRatingOpen] = useState(true);
  const [PriceOpen, setPriceOpen] = useState(true);
  const [isMobilfilter, setisMobilfilter] = useState(false);
  const [sort, setsort] = useState("name");
  const [Star, setStar] = useState(1);
  const [price, setprice] = useState([0, 8000]);
  const [searchParams] = useSearchParams();
  const searchvalue = searchParams.get("keyword");
  const category = searchParams.get('category')


  // Move the API request logic to a separate function
  async function fetchProducts(searchvalue, price, sort, currentPage, Star, category) {
    setIsLoading(true);
    const search_text = `search=${searchvalue}`;
    const category_search = `category=${category}`;
    let query = `${category ? category_search : search_text}&price[gte]=${price[0]}&price[lte]=${price[1]}&page=${currentPage}&Star=${Star}&sort=${sort === "sortPriceLowToHigh"
      ? "price"
      : sort === "sortPriceHighToLow"
        ? "price"
        : sort}${sort === "sortPriceHighToLow" ? "&orderby=desc" : ""}`;
    const link = `${BASE_URL}/v4/api/get_all/product?${query}`;

    try {
      const response = await fetch(link, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.status !== 200) {
        setNoProduct(true);
        setProducts([]);
        setTotalProduct(0);
        return;
      }

      const { data } = await response.json();
      const { result, total_result } = data[0];
      setProducts(result);
      setTotalProduct(Number(total_result[0].count));
    } catch (error) {
      console.error("Error fetching products:", error);
      setNoProduct(true);
      setProducts([]);
      setTotalProduct(0);
    } finally {
      setIsLoading(false);
    }
  }

  // Update the useEffect dependency array to only include necessary variables
  useEffect(() => {
    fetchProducts(searchvalue, price, sort, currentPage, Star, category);
  }, [searchvalue, price, sort, currentPage, Star, category]);


  if (totalProduct > 20) {
    var numberofPages = Math.ceil(totalProduct / 20);
    var page_number = [...Array(numberofPages + 1).keys()].slice(1);
  }

  // --- starting product
  const startingProductNumber = (currentPage - 1) * showProductPerPage + 1;

  // --- ending product
  var lastProductNumber;
  if (totalProduct < showProductPerPage) {
    lastProductNumber = totalProduct;
  } else {
    lastProductNumber = showProductPerPage * currentPage;
  }

  const nextPage = () => {
    if (currentPage !== numberofPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const previousPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const priceHander = (event, newprice) => {
    setprice(newprice);
    setCurrentPage(1);
  };

  return (
    <Fragment>
      <Suspense fallback={<MemoNavbarSkeleton />}>
        <MemoNavbar />
      </Suspense>
      <main className="grid row-span-2 gap-10">
        {!noProduct || products.length > 1 ? (
          <section
            className="search_info product_search_total_value_show border-b 
            shadow-md h-10 md:h-12  w-full px-5 flex items-center justify-between 
            border-gray-400"
          >
            <ShowHeaderInfo
              startingProductNumber={startingProductNumber}
              lastProductNumber={lastProductNumber}
              totalProduct={totalProduct}
            />
            <div className="sort_box md:flex w-fit rounded-md items-center justify-between px-2 border hidden  border-gray-300">
              <h4>Sort:</h4>
              <SortFilter paddingX={4} sort={sort} setsort={setsort} />
            </div>
          </section>
        ) : null}

        <section className="md:grid grid-cols-10">
          {/* for small screen */}
          {!noProduct || products.length > 1 ? (
            <aside className="md:hidden filter-sort-for-mobile-only pb-5 grid grid-cols-2 px-5">
              <div className="border flex w-fit items-center py-1 px-2 rounded-md border-gray-300">
                <h4 >Sort:</h4>
                <SortFilter sort={sort} setsort={setsort} />
              </div>
              <article className="filter">
                <h3
                  className="flex items-center md:hidden space-x-3  md:float-left float-right font-[500]"
                  onClick={() => setisMobilfilter(!isMobilfilter)}>
                  <span className="filter_text">Filter</span>
                  <FiFilter
                    className="focus:text-indigo-800 text-xl"
                  />
                </h3>
                <aside
                  className={`${isMobilfilter ? "flex" : "hidden"
                    } w-full h-full 
                flex fixed  bg-black inset-0 bg-opacity-30 opacity-100 space-x-10 z-50`}
                >
                  <div className="filter_box bg-white w-[72%] h-full px-5 py-10">
                    <Typography>Add your Filters </Typography>
                    <form className="filter-form my-4">
                      <StarFilter
                        setRatingOpen={setRatingOpen}
                        RatingOpen={RatingOpen}
                        setStar={setStar}
                      />
                      <PriceFilter
                        price={price}
                        priceHander={priceHander}
                        setPriceOpen={setPriceOpen}
                        PriceOpen={PriceOpen}
                      />
                    </form>
                  </div>
                  <div className="close_icon mx-10 mt-5 text-white">
                    <AiOutlineCloseCircle
                      className="text-4xl cursor-pointer"
                      onClick={() => setisMobilfilter(!isMobilfilter)}
                    />
                  </div>
                </aside>
              </article>
            </aside>
          ) : null}

          {/* for large screen */}
          <aside className="px-2 hidden md:block md:col-span-3 lg:col-span-2 py-5">
            <h3
              className="filter-text flex  border-b pb-3 border-gray-400 font-[500]
             text-xl justify-between items-center"
            >
              <span className="pr-2"> Filter</span>
            </h3>
            <form className="filter-form my-4">
              <StarFilter
                setRatingOpen={setRatingOpen}
                RatingOpen={RatingOpen}
                setStar={setStar}
              />
              <PriceFilter
                price={price}
                priceHander={priceHander}
                setPriceOpen={setPriceOpen}
                PriceOpen={PriceOpen}
              />
            </form>
          </aside>
          <div className="col-span-7 lg:col-span-8 mx-2 md:mx-4 mb-5">
            {isLoading ? <MemoSampleProductSkeleton /> :
              <MemoProductList ProductsData={products} noProduct={noProduct} />}
          </div>
        </section>
        {totalProduct > 20 ? (
          <Pagination
            previousPage={previousPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            page_number={page_number}
            nextPage={nextPage}
          />
        ) : null}
      </main>
      <div className="mt-5">
        <MemoFooter />
      </div>
    </Fragment>
  );
}
