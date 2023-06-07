import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { BiPlus } from "react-icons/bi";
import { AiOutlineMinus } from "react-icons/ai"
import { toast } from 'react-toastify';
import { Toast_Config_Option } from '../../global/Toast_Config';

export default function CheckoutProduct({ productDetails, variantDetails }) {
    const searchParams = new URLSearchParams(location.search)
    const [quantity, setQuantity] = useState(0)
    const navigate = useNavigate();

    useEffect(() => {
        const newQuantity = parseInt(searchParams.get('quantity')) || 0;
        setQuantity(newQuantity);
    }, [searchParams]);

    return (
        <Fragment>
            {
                productDetails.map(product => (
                    <div
                        key={product._id}
                        className="product-image&detailst px-2 my-5"
                    >
                        <div className="product-details flex space-x-2">
                            <figure className="product-imaga-contianer overflow-hidden w-[20%] rounded-md">
                                <img
                                    src={product.assets.images[0].url}
                                    className="h-28 w-full hover:scale-125 rounded-md "
                                />
                            </figure>
                            <div className="product-name&quantity px-2 w-[60%] grid grid-cols-1 md:grid-cols-2 ">
                                <div className="product-info">
                                    <div className="name-info-container lg:px-5">
                                        <h2 className="product-name text-xl capitalize">
                                            {product.name}
                                        </h2>
                                        {variantDetails.length > 0 ?
                                            <Fragment>
                                                {variantDetails[0].attribute.map((attr) => (
                                                    <Fragment key={attr._id}>
                                                        <h2 className="attribute_name_value">
                                                            {attr.name}
                                                            <span className="mx-2 capitalize text-gray-700">
                                                                {attr.value}
                                                            </span>
                                                        </h2>
                                                    </Fragment>
                                                ))}
                                            </Fragment> : null
                                        }
                                    </div>
                                </div>

                                {/*  ---- Quantitty */}
                                <div
                                    className="product-quantity-show my-2 bg-gray-100 flex 
                                    items-center justify-between px-2 h-8 rounded-md "
                                >
                                    <button
                                        className="decrease-btn bg-indigo-800 rounded-full text-white"
                                        disabled={
                                            quantity == 10 || quantity < 10 ? true : false
                                        }

                                    >
                                        <AiOutlineMinus fontSize={"22px"} onClick={() => {
                                            const newQuantity = quantity - 1;
                                            setQuantity(newQuantity);
                                            searchParams.set('quantity', newQuantity)
                                            searchParams.toString();
                                            navigate({
                                                pathname: location.pathname,
                                                search: `?${searchParams}`
                                            }, { replace: true })
                                        }} />
                                    </button>
                                    <input
                                        type={'number'}
                                        className="w-10 border border-indigo-800 outline-none bg-transparent text-black px-1 text-center"
                                        value={quantity}
                                        readOnly
                                    />
                                    <button className="increase-button text-white bg-indigo-800 rounded-full">
                                        <BiPlus
                                            fontSize={"22px"}
                                            onClick={() => {
                                                const limitedquantity = variantDetails.length > 0 ? variantDetails[0].stock : productDetails[0].stock;
                                                if (quantity === limitedquantity) {
                                                    return toast.info(
                                                        `Sorry for inconvenience, there is no more stock than ${limitedquantity}`,
                                                        Toast_Config_Option
                                                    );
                                                }
                                                const newQuantity = quantity + 1;
                                                setQuantity(newQuantity);
                                                searchParams.set('quantity', newQuantity)
                                                searchParams.toString();
                                                navigate({
                                                    pathname: location.pathname,
                                                    search: `?${searchParams}`
                                                }, { replace: true })
                                            }}
                                        />
                                    </button>
                                </div>
                            </div>
                            <div className="each-price text-end ml-32 sm:w-[23%]">
                                <h2 className="price">
                                    Rs{" "}
                                    <span className="price-vlaue">
                                        {variantDetails.length > 0 ? variantDetails[0].price : product.price}
                                    </span>
                                </h2>
                            </div>
                        </div>
                        {/*  ----- Total price of particular item */}
                        <div
                            className="total-price-of-individual-product flex items-center my-2 
                            border-b border-gray-300 pb-5 justify-between"
                        >
                            <h2 className="product-subtotal-text text-xl">Total</h2>
                            <h2 className="product-total-price">
                                <span className="total-price-value font-bold text-xl">
                                    Rs{" "}
                                    {(variantDetails.length > 0 && variantDetails[0].price
                                        ? variantDetails[0].price
                                        : product
                                            ? product.price
                                            : 0) * quantity}
                                </span>
                            </h2>
                        </div>
                    </div>
                ))
            }

        </Fragment>
    )
}
