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

export default function ProductSrch() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noProduct, setNoProduct] = useState(false);
  const [totalProduct, setTotalProduct] = useState();
  const [showProductPerPage, setShowProductPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [RatingOpen, setRatingOpen] = useState(true);
  const [PriceOpen, setPriceOpen] = useState(true);
  const [isMobilfilter, setisMobilfilter] = useState(false);
  const [sort, setsort] = useState("name");
  const [Star, setStar] = useState(1);
  const [price, setprice] = useState([0, 8000]);
  const [searchParams] = useSearchParams();
  const searchvalue = searchParams.get("keyword");

  // fetch products from backend api
  useEffect(() => {
    const query = `search=${searchvalue}&price[gte]=${price[0]}&price[lte]=${
      price[1]
    }&page=${currentPage}&Star=${Star}&sort=${
      sort === "sortPriceLowToHigh"
        ? "price"
        : sort === "sortPriceHighToLow"
        ? "price"
        : sort
    }${sort === "sortPriceHighToLow" ? "&orderby=desc" : ""}`;
    const link = `${BASE_URL}/v4/api/get_all/product?${query}`;
    async function fetchProduct() {
      setIsLoading(!isLoading);
      await fetch(link, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }).then(async (res) => {
        if (res.status !== 200) {
          setNoProduct(true);
          setIsLoading(false);
          setProducts([]);
          return;
        }
        const { data } = await res.json();
        setIsLoading(false);
        const { result, total_result } = data[0];
        setProducts(result);
        setTotalProduct(Number(total_result[0].count));
      });
    }
    fetchProduct();
  }, [searchvalue, price, sort, currentPage, Star]);

  if (totalProduct > 10) {
    var numberofPages = Math.ceil(totalProduct / 10);
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
      <Suspense fallback={<NavbarSkeleton />}>
        <Navbar />
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
            <div className="sort_box md:flex items-center justify-between px-2 border hidden  border-gray-300">
              <h4>Sort:</h4>
              <SortFilter paddingX={4} sort={sort} setsort={setsort} />
            </div>
          </section>
        ) : null}

        <section className="md:grid grid-cols-10">
          {/* for small screen */}
          {!noProduct || products.length > 1 ? (
            <aside className="md:hidden filter-sort-for-mobile-only  grid grid-cols-2 px-5">
              <div className="sort_box flex items-center justify-between px-2 overflow-hidden border border-gray-300">
                <h4>Sort:</h4>
                <SortFilter paddingX={4} sort={sort} setsort={setsort} />
              </div>
              <article className="filter">
                <h3 className="flex items-center md:hidden space-x-3  md:float-left float-right font-[500]">
                  <span className="filter_text">Filter</span>
                  <FiFilter
                    className="focus:text-indigo-800 text-xl"
                    onClick={() => setisMobilfilter(!isMobilfilter)}
                  />
                </h3>
                <aside
                  className={`${
                    isMobilfilter ? "flex" : "hidden"
                  } w-full h-full 
                flex fixed  bg-black inset-0 bg-opacity-30 opacity-100 space-x-10 z-50`}
                >
                  <div className="filter_box bg-white w-4/6 h-full px-5 py-10">
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
          <div className="col-span-7 lg:col-span-8 mx-2 md:mx-4">
            <ProductList ProductsData={products} noProduct={noProduct} />
          </div>
        </section>
        {totalProduct > 10 ? (
          <Pagination
            previousPage={previousPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            page_number={page_number}
            nextPage={nextPage}
          />
        ) : null}
      </main>
    </Fragment>
  );
}