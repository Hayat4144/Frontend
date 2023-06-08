import React, { Fragment } from "react";
import { ImLocation } from "react-icons/im";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { AiOutlineCopyrightCircle } from 'react-icons/ai'
import { MdPermPhoneMsg } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <Fragment>
            <footer className="footer pt-10 pb-5 bg-slate-800 text-white w-full">
                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-10 lg:gap-16 px-5 sm:px-8 md:px-10 lg:px-16">
                    <div className="Contact_Section">
                        <div className="Contact space-y-5">
                            <h2 className="text-xl">Contact info</h2>

                            <div className="address flex items-center">
                                <div className="address-logo ">
                                    <span>
                                        <ImLocation fontSize={"25px"} />
                                    </span>
                                </div>
                                <div className="address-info mx-5">
                                    <h4 className="addess-title translate-y-1">Address:</h4>
                                    <span className="text-sm address-description">
                                        Canning street ,Bara Bazar Kolkata
                                    </span>
                                </div>
                            </div>

                            <div className="phone flex items-center">
                                <div className="phone-logo ">
                                    <span>
                                        <MdPermPhoneMsg fontSize={"25px"} />
                                    </span>
                                </div>
                                <div className="phone-info mx-5">
                                    <h4 className="phone-title translate-y-1">Phone:</h4>
                                    <span className="text-sm address-description">
                                        (+91 09876789343)
                                    </span>
                                </div>
                            </div>
                            <div className="email flex items-center pb-5">
                                <div className="email-logo ">
                                    <span>
                                        <MdEmail fontSize={"25px"} />
                                    </span>
                                </div>
                                <div className="email-info mx-5">
                                    <h4 className="email-title translate-y-1">Email:</h4>
                                    <span className="text-sm email-description">
                                        ihayat4144@gmail.com
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="User_Links">
                        <h2 className="font-bold mb-4 text-xl">User's Link</h2>
                        <ul className="text-[15px] my-3 space-y-3">
                            <li className="hover:text-slate-500 cursor-pointer hover:translate-x-2">
                                <Link
                                    to="/V2/user/account"
                                    className="flex items-center space-x-2"
                                >
                                    <AiOutlineDoubleRight />
                                    My Account
                                </Link>
                            </li>
                            <li className="hover:text-slate-500 cursor-pointer hover:translate-x-2">
                                <Link
                                    to="/V2/user/account/order/history"
                                    className="flex items-center space-x-2"
                                >
                                    <AiOutlineDoubleRight />
                                    My Order
                                </Link>
                            </li>
                            <li className="hover:text-slate-500 cursor-pointer hover:translate-x-2">
                                <Link
                                    to="/V2/user/cart"
                                    className="flex items-center space-x-2"
                                >
                                    <AiOutlineDoubleRight />
                                    My Cart
                                </Link>
                            </li>
                            <li className="hover:text-slate-500 cursor-pointer hover:translate-x-2">
                                <Link to="/V2/account/address" className="flex items-center space-x-2">
                                    <AiOutlineDoubleRight />
                                    My Address
                                </Link>
                            </li>
                            <li className="hover:text-slate-500 cursor-pointer hover:translate-x-2">
                                <Link to="/V2/account/change/Password" className="flex items-center space-x-2">
                                    <AiOutlineDoubleRight />
                                    Change Password
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="feature_Products">
                        <h2 className="mb-4 text-xl font-bold">Featured Products</h2>
                        <ul className='ffollow-us-link text-[15px] mt-3 space-y-5'>
                            <li className='flex items-center hover:text-slate-500 cursor-pointer hover:translate-x-2'><AiOutlineDoubleRight />Jhumka</li>
                            <li className='flex items-center hover:text-slate-500 cursor-pointer hover:translate-x-2'><AiOutlineDoubleRight />Bali</li>
                            <li className='flex items-center hover:text-slate-500 cursor-pointer hover:translate-x-2'><AiOutlineDoubleRight />Topas</li>
                            <li className='flex items-center hover:text-slate-500 cursor-pointer hover:translate-x-2'><AiOutlineDoubleRight />Necklace</li>
                            <li className='flex items-center hover:text-slate-500 cursor-pointer hover:translate-x-2'><AiOutlineDoubleRight />Earings</li>
                        </ul>
                    </div>

                    <div className="follow_us">
                        <h2 className="mb-4 font-bold text-xl">Follow us</h2>
                        <ul className='ffollow-us-link text-[15px] mt-3 space-y-5'>
                            <li className='flex items-center hover:text-slate-500 cursor-pointer hover:translate-x-2'><AiOutlineDoubleRight />Instagram</li>
                            <li className='flex items-center hover:text-slate-500 cursor-pointer hover:translate-x-2'><AiOutlineDoubleRight />Linkedin</li>
                            <li className='flex items-center hover:text-slate-500 cursor-pointer hover:translate-x-2'><AiOutlineDoubleRight />Facebook</li>
                            <li className='flex items-center hover:text-slate-500 cursor-pointer hover:translate-x-2'><AiOutlineDoubleRight />Youtube</li>
                        </ul>
                    </div>

                    <div className="Consumer_Policy">
                        <h2 className="mb-4 text-xl font-bold">Consumer Policy</h2>
                        <ul className="text-[15px] my-3 space-y-3">
                            <li className="hover:text-slate-500 cursor-pointer hover:translate-x-2">
                                <Link
                                    to="/terms-and-conditions"
                                    className="flex items-center space-x-2"
                                >
                                    <AiOutlineDoubleRight />
                                    Terms of use
                                </Link>
                            </li>
                            <li className="hover:text-slate-500 cursor-pointer hover:translate-x-2">
                                <Link
                                    to="/v2/privacy/policy"
                                    className="flex items-center space-x-2"
                                >
                                    <AiOutlineDoubleRight />
                                    Privary Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                </section>
                <h3 className="border-t border-gray-600 pt-2 items-center space-x-2 flex justify-center"><AiOutlineCopyrightCircle className="text-xl " /> <span> 2023 FeatureFlex. All rights reserved.</span></h3>
            </footer>
        </Fragment>
    );
}
