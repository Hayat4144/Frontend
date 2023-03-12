import React, { Fragment, useRef, useState } from 'react'
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { REMOVE_ALL_ITEM_FROM_CART } from '../../Context/Actions/ActionType';

export default function CashOnDelivary() {
    const recaptchaRef = useRef(null)
    const submitButtonRef = useRef(null);
    const [isLoading, setisLoading] = useState(false)
    const SITE_KEY = import.meta.env.VITE_GOOGLE_SITE_KEY;
    const { productItems } = useSelector((state) => state.Cart);
    const [payment_type, setPayment_type] = useState('CASHONDELIVARY')
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const products = [];
    productItems.forEach((element) => {
        products.push({
            varientId: element._id,
            quantity: element.quantity,
        });
    });

    console.log(products)

    // validate the captcha 
    const handleRecaptchaChange = (value) => {
        console.log(value)
        value ? submitButtonRef.current.disabled = false : submitButtonRef.current.disabled = true;
    }

    // Call Google's API to get score
    // const res = await axios.post(
    //     `https://www.google.com/recaptcha/api/siteverify?secret=${YOUR_PRIVATE_KEY}&response=${captchaToken}`
    //   );


    const submitHandler = async () => {
        setisLoading(true)
        const captchaToken = await recaptchaRef.current.getValue();
        if (!captchaToken) {
            recaptchaRef.current.reset();
            setisLoading(false)
            return;
        }

        await fetch(`${import.meta.env.DEV ? import.meta.env.VITE_BACKEND_DEV_URL : import.meta.env.VITE_BACKEND_URL}/v3/api/user/shop/confirm/payment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                products,
                captchaToken,
                payment_type
            }),
            credentials: 'include'
        }).then(async res => {
            const { error, data } = await res.json();
            if (res.status !== 200) {
                setisLoading(false)
                toast.error(error, {
                    position: 'bottom-center',
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
                return;
            }
            dispatch({ type: REMOVE_ALL_ITEM_FROM_CART })
            setisLoading(false)
            toast.success(data, {
                position: 'bottom-center',
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
            navigate('/V2/user/account/order/history')

        })


    }
    return (
        <Fragment>
            <form
                className=""
                onSubmit={(e) => {
                    e.preventDefault();
                    submitHandler()
                }}
            >
                <ReCAPTCHA
                    onChange={handleRecaptchaChange}
                    ref={recaptchaRef}
                    sitekey={SITE_KEY}
                    execute={() => recaptchaRef.current.execute()}
                />
                <div className="sumbit-btn my-5">
                    {!isLoading ? (
                        <button
                            ref={submitButtonRef}
                            type="submit"
                            className="w-72 h-14 text-center
                             text-white outline-none text-bold bg-indigo-800 rounded-md
                              hover:bg-indigo-700"
                            disabled
                        >
                            Submit
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="inline-flex items-center justify-center py-2  leading-4 
                              text-sm shadow rounded-md text-white bg-indigo-800 hover:bg-indigo-900
                               w-72 text-center transition ease-in-out duration-150 cursor-not-allowed"
                            disabled=""
                        >
                            <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-500"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="pacity-25 text-white"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 
                                    018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 
                                    3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Processing ...
                        </button>
                    )}
                </div>
            </form>
        </Fragment>
    )
}
