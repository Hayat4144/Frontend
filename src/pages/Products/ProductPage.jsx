import React, { Fragment, useState, useEffect, lazy, Suspense } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavbarSkeleton from "../../Skeleton/NavbarSkeleton";
import {
  ADD_TO_CART_ACTION,
} from "../../Context/Actions/CartActions";
import ProductPageSkeleton from "../../Skeleton/ProductPageSkeleton";
import { Toast_Config_Option } from "../../global/Toast_Config";
import { BASE_URL } from "../../global/Base_URL";
import { GetHeaders } from "../../global/GetHeaders";
const Navbar = lazy(() => import("../../layout/Nav/Navbar"));
const Footer = lazy(() => import("../../layout/Footer"));
const SimilarProducts = lazy(() => import("../../shop/SimilarProducts"));
const UserReview = lazy(() => import("../../shop/Review/UserReview"));
const CreateUserReview = lazy(() =>
  import("../../shop/Review/CreateUserReview")
);
import LargeScreenImages from "../../layout/ShowProduct/LargeScreenImages";
import SmallScreenImages from "../../layout/ShowProduct/SmallScreenImages";
import ProductIncrementDecrement from "../../layout/ShowProduct/ProductIncrementDecrement";
import ProductDetails from "../../layout/ShowProduct/ProductDetails";
import { SendCartItemBackend } from "../../utils/SendCartItemBackend";
import { UPDATE_CART_ITEM } from "../../Context/Actions/ActionType";

export default function ProductPage() {
  const { id } = useParams();
  const [quantity, setquantity] = useState(10);
  const [image_value, setimage_value] = useState(0);
  const [slideindex, setslidindex] = useState(1);
  const [product_detail, setProduct_detail] = useState([]);
  const [product_varient, setProduct_varient] = useState([]);
  const [selectedSize, setSelectedSize] = useState("Choose a size");
  const [selectedColor, setSelectedColor] = useState("Choose a color");
  const [ratingModal, setRatingModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [originalprice, setoriginalprice] = useState("");
  const { IsLogdin } = useSelector((state) => state.Signin);
  const navigate = useNavigate();
  const [UniqueVarients, setUniqueVarients] = useState([])

  useEffect(() => {
    setIsLoading(true);
    const controller = new AbortController();
    const signal = controller.signal;
    const GetProduct_Varients = async () => {
      const Response = await fetch(
        `${BASE_URL}/v4/api/product/${id}`,
        GetHeaders,
        signal
      );
      const { Products, Varients, error } = await Response.json();
      setIsLoading(false);
      if (Response.status !== 200) return console.log(error);
      if (Varients.length > 0) setUniqueVarients(removeDuplicateAttributesNameValue(Varients))
      setoriginalprice(Products.price);
      setProduct_detail([Products]);
      setProduct_varient(Varients);
    };
    GetProduct_Varients();
    return () => {
      controller.abort();
    };
  }, [id]);


  const removeDuplicateAttributesNameValue = (variants) => {
    const uniqueAttributes = {};

    variants.forEach((variant) => {
      variant.attribute.forEach((attribute) => {
        const { name, value } = attribute;

        if (!uniqueAttributes[name]) {
          uniqueAttributes[name] = new Set();
        }

        uniqueAttributes[name].add(value);
      });
    });

    const uniqueAttributeArray = Object.entries(uniqueAttributes).map(
      ([name, values]) => ({
        name,
        values: Array.from(values),
      })
    );

    return uniqueAttributeArray;
  };

  // const UniqueVarients = removeDuplicateAttributesNameValue(product_varient);

  const handleAttributeChange = (name, value) => {
    setSelectedAttributes((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const findVariantsByAttributes = (variants, selectedAttributes) => {
    return variants.filter((variant) => {
      const matchingAttributes = variant.attribute.filter((attribute) => {
        const { name, value } = attribute;
        return selectedAttributes[name] === value;
      });
      return matchingAttributes.length === variant.attribute.length;
    });
  };

  const selectedvarients = findVariantsByAttributes(
    product_varient,
    selectedAttributes
  );

  useEffect(() => {
    if (selectedvarients.length > 0) {
      const updateState = product_detail.map((obj) => {
        setoriginalprice(obj.price);
        return {
          ...obj,
          price: selectedvarients[0].price,
        };
      });
      setProduct_detail(updateState);
    } else {
      const updateState = product_detail.map((product) => {
        return { ...product, price: originalprice };
      });
      setProduct_detail(updateState);
    }
  }, [selectedAttributes]);

  const AddCartItemVarient = () => {
    if (selectedvarients.length > 0) {
      let data = {
        ProductId: selectedvarients[0].productid,
        ProductvarientId: selectedvarients[0]._id,
        quantity,
        image: product_detail[0].assets.images[0],
      };
      dispatch(ADD_TO_CART_ACTION(data));
      toast.success(
        `${product_detail[0].name} has been successfully added to your cart.`,
        Toast_Config_Option
      );
      return data;
    } else {
      toast.error("Please select a product varient", Toast_Config_Option);
    }
  };

  const AddCartItemProduct = () => {
    let data = {
      ProductId: product_detail[0]._id,
      quantity,
      image: product_detail[0].assets.images[0],
    };
    dispatch(ADD_TO_CART_ACTION(data));
    toast.success(
      `${product_detail[0].name.charAt(0).toUpperCase() +
      product_detail[0].name.slice(1)
      } has been successfully added to your cart.`,
      Toast_Config_Option
    );
    return data;
  };

  const Add_TO_CART_FUNC = async () => {
    if (product_varient.length > 0) {
      const CartData = AddCartItemVarient();
      if (IsLogdin) {
        const updatedItem = await SendCartItemBackend({ ...CartData });
        dispatch({ type: UPDATE_CART_ITEM, payload: updatedItem });
      }
    } else {
      const CartData = AddCartItemProduct();
      if (IsLogdin) {
        const updatedItem = await SendCartItemBackend({ ...CartData });
        dispatch({ type: UPDATE_CART_ITEM, payload: updatedItem });
      }
    }
  };





  // next slide
  const nextSlide = (product_image) => {
    if (slideindex !== product_image.length) {
      setslidindex(slideindex + 1);
    } else if (slideindex === product_image.length) {
      setslidindex(1);
    }
  };

  //  ----- back slide ----- //
  const backslide = (product_image) => {
    if (slideindex !== 1) {
      setslidindex(slideindex - 1);
    } else if (slideindex === 1) {
      setslidindex(product_image.length);
    }
  };

  const IncreaseQuantity = () => {
    const limitQuantity =
      selectedvarients.length > 0
        ? selectedvarients[0].stock
        : product_detail[0].stock;
    if (quantity === limitQuantity) {
      toast.info(
        `Sorry for inconvenience, there is no more stock than ${limitQuantity}`,
        Toast_Config_Option
      );
      return;
    }
    setquantity(quantity + 1);
  };

  const DicreaseQuantity = () => {
    setquantity(quantity - 1);
  };

  const ManualQuantityChange = (e) => {
    const limitQuantity =
      selectedvarients.length > 0
        ? selectedvarients[0].stock
        : product_detail[0].stock;
    if (Number(e.target.value) >= limitQuantity) {
      toast.info(
        `Sorry for inconvenience, there is no more stock than ${limitQuantity}`,
        Toast_Config_Option
      );
      setquantity(limitQuantity);
      return;
    }
    setquantity(Number(e.target.value));
  };

  const RatingModalToggle = (state) => {
    setRatingModal(!state);
  };

  const handleBuyButton = () => {
    const queryParams = new URLSearchParams({
      quantity: quantity,
    })
    if (product_varient.length > 0 && selectedvarients.length < 1) {
      return toast.info('Select a product varient', Toast_Config_Option)
    }
    if (product_varient.length > 0 && selectedvarients.length > 0) {
      queryParams.append('varientId', selectedvarients[0]._id)
    }
    queryParams.append('ProductId', product_detail[0]._id)
    queryParams.toString();
    const updated_url = `/V2/shop/checkout?${queryParams}`
    sessionStorage.setItem('checkOutSession', 'active')
    navigate(updated_url)
  }

  return (
    <Fragment>
      <Suspense fallback={<NavbarSkeleton />}>
        <Navbar />
      </Suspense>

      {isLoading ? (
        <ProductPageSkeleton />
      ) : (
        product_detail.map((item) => (
          <section
            key={item._id}
            className="proudct-parent my-16 px-2 grid
            grid-cols-1 md:grid-cols-7 md:gap-5 "
          >
            <div className="col-span-4 sticky">
              <SmallScreenImages
                images={item.assets.images}
                nextSlide={nextSlide}
                backslide={backslide}
                slideindex={slideindex}
              />
              <LargeScreenImages
                images={item.assets.images}
                setimage_value={setimage_value}
                image_value={image_value}
              />
            </div>

            <div className="col-span-3 proudct-info  mx-2 md:mx-5">
              <ProductDetails product={item} />
              {/* ----- product varients ----- */}

              {UniqueVarients.length > 0 &&

                UniqueVarients.map((varient, index) => (
                  <Fragment key={index}>
                    <div
                      className="attribute flex items-center space-x-5 my-5"
                      key={index}
                    >
                      <h2 className="product_attribute_name  capitalize">
                        {varient.name}
                      </h2>
                      <div className="w-full">
                        <form className="size_form">
                          <select
                            value={selectedAttributes[varient.name] || ""}
                            onChange={(e) =>
                              handleAttributeChange(varient.name, e.target.value)
                            }
                            className="px-5 py-2 rounded-md w-full focus:border-2
                         focus:border-indigo-700 focus:outline-none focus:ring-indigo-700 
                        border border-gray-500"
                          >
                            <option defaultValue={selectedColor}>
                              Choose the {varient.name}{" "}
                            </option>
                            {varient.values.map((value, index) => (
                              <option key={index} value={value}>
                                {value}
                              </option>
                            ))}
                          </select>
                        </form>
                      </div>
                    </div>
                  </Fragment>
                ))}

              <ProductIncrementDecrement
                IncreaseQuantity={IncreaseQuantity}
                DicreaseQuantity={DicreaseQuantity}
                quantity={quantity}
                ManualQuantityChange={ManualQuantityChange}
              />
              <div className="group-btn lg:flex lg:items-center ">
                <button
                  disabled={quantity < 10 ? true : false}
                  onClick={Add_TO_CART_FUNC}
                  className="focus:outline-none focus:shadow-lg w-full lg:py-4  my-2
                 bg-indigo-700 text-white px-3 lg:mr-3 rounded-lg  hover:bg-indigo-800 
                    cursor-pointer py-3 disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyButton}
                  className="focus:outline-none focus:shadow-lg w-full lg:py-4 py-3 
                   border border-gray-300 focus:text-white focus:bg-indigo-700 
                   focus:border-none hover:text-white hover:border-none px-3 rounded-lg 
                    hover:bg-indigo-700 cursor-pointer"
                >
                  Buy Now
                </button>
              </div>
              <div className="product_rating_reviews my-10">
                <div className="ratings flex item-center justify-between ">
                  <h3 className="font-bold text-xl mb-5">
                    Ratings and Reviews
                  </h3>
                  <button
                    className="bg-indigo-700 hover:bg-indigo8900 text-white
                    rounded-md focus:outline-none focus:bg-transparent focus:text-black focus:border  focus:border-gray-500 
                    px-2"
                    onClick={() => setRatingModal(true)}
                  >
                    Rate Product
                  </button>
                </div>

                <Suspense fallback={<p>loading...</p>}>
                  <UserReview
                    rating_review={item.ratings_review}
                    averge_rating={item.averge_rating}
                  />
                </Suspense>
              </div>
            </div>
          </section>
        ))
      )}

      <Suspense fallback={<p>loading...</p>}>
        <CreateUserReview
          isModalOpen={ratingModal}
          RatingModalToggle={RatingModalToggle}
        />
      </Suspense>

      <Suspense fallback={<p>loading....</p>}>
        <SimilarProducts />
      </Suspense>

      <Suspense fallback={<p>loading....</p>}>
        <Footer />
      </Suspense>
    </Fragment>
  );
}
