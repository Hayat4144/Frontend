import React, { Fragment } from 'react'
import Address from './Address'
import ChangePassword from './ChangePassword'

export default function Profile() {
    return (
        <Fragment>

            <div className='profile_container'>
                <h3 className='personal_information text-2xl'>Personal Information</h3>
                <form>
                    <div className='form_container'>
                        <div className='name_field'>
                            <label className='name_label text-sm font-medium text-slate-800 block'>
                                Name
                            </label>
                            <input type={'text'}
                                className="border border-gray-300 rounded-md my-2 py-[6px] w-full focus:border-indigo-600 focus:ring-indigo-700 bg-inherit focus:border  px-2 outline-none text-sm text-gray-700 placeholder:text-gray-500"
                                placeholder="Enter your name" />
                        </div>

                        <div className='mobile_field'>
                            <label className='mobile_label text-sm font-medium text-slate-800 block'>
                                Mobile No.
                            </label>
                            <input type={'text'}
                                className="border border-gray-300 rounded-md my-2 py-[6px] w-full focus:border-indigo-600 focus:ring-indigo-700 bg-inherit focus:border  px-2 outline-none text-sm text-gray-700 placeholder:text-gray-500"
                                placeholder="Enter your mobile" />
                        </div>
                        <div className='submit_btn'>
                            <button className='h-10 text-center text-white outline-none text-bold bg-indigo-800 rounded-md hover:bg-indigo-700 px-4'>Submit</button>
                        </div>


                    </div>
                </form>
            </div>
        </Fragment>
    )
}
