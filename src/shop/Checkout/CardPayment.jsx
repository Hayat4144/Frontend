import React, { Fragment ,useState ,useEffect  } from 'react'

export default function CardPayment() {
    //  all state goes here 
    const [isLoading, setIsLoading] = useState(false)


    // submit Handler for form 
    const SubmitHandler = ()=>{
        console.log('submit handler');
    }
  return (
    <Fragment>
              <form action="" onSubmit={(e) => {
                                    e.preventDefault();
                                    // submitHandler()
                                }} className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                                    <div className='card_number_field'>
                                        <label className='text-sm font-medium block'>Card Number</label>
                                        <input type="number" required
                                            placeholder='Enter your card number'
                                            max={'16'}
                                            className='border border-gray-500 
                                            rounded-md my-2 py-3  focus:border-indigo-600
                                             focus:ring-indigo-700 bg-inherit focus:border  px-3 w-full outline-none 
                                             text-sm text-gray-700 placeholder:text-gray-500 ' />
                                    </div>
                                    <div className="account_holder_name">
                                        <label className='text-sm font-medium block'>Account Holder name</label>
                                        <input type="text" required
                                            placeholder='Enter Account holder name'
                                            className='border border-gray-500 
                                            rounded-md my-2 py-3 focus:border-indigo-600
                                             focus:ring-indigo-700 bg-inherit focus:border w-full px-3 outline-none 
                                             text-sm text-gray-700 placeholder:text-gray-500' />
                                    </div>
                                    <div className="valid_thru">
                                        <label className='text-sm font-medium block '>Valid thru</label>
                                        <input type="date" required
                                            placeholder='valid thru'
                                            className='border border-gray-500 
                                            rounded-md my-2 py-3 focus:border-indigo-600
                                             focus:ring-indigo-700 bg-inherit focus:border w-full px-3 outline-none 
                                             text-sm text-gray-700 placeholder:text-gray-500' />
                                    </div>
                                    <div className="CVV">
                                        <label className='text-sm font-medium block '>CVV</label>
                                        <input type="number" required
                                            placeholder='Enter your cvv number'
                                            className='border border-gray-500 
                                            rounded-md my-2 py-3 focus:border-indigo-600
                                             focus:ring-indigo-700 bg-inherit focus:border w-full px-3 outline-none 
                                             text-sm text-gray-700 placeholder:text-gray-500' />
                                    </div>
                                    <div className='sumbit-btn my-2'>
                                        {!isLoading ? <button type='submit' className='w-full h-10 py-2 text-center
                             text-white outline-none text-bold bg-indigo-800 rounded-md
                              hover:bg-indigo-700'>Pay</button> : <button type="button"
                                            className="inline-flex items-center justify-center py-2  leading-4 
                              text-sm shadow rounded-md text-white bg-indigo-800 hover:bg-indigo-900
                               w-full text-center transition ease-in-out duration-150 cursor-not-allowed"
                                            disabled="">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-500"
                                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="pacity-25 text-white" cx="12" cy="12" r="10"
                                                    stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 
                                    018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 
                                    3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Processing ...
                                        </button>
                                        }
                                    </div>
                                </form>
    </Fragment>
  )
}
