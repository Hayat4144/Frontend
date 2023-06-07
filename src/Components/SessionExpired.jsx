import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

export default function SessionExpired() {
    return (
        <Fragment>
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="bg-white p-8 rounded shadow-lg max-w-sm">
                    <svg
                        className="mx-auto mb-6 w-16 h-16 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                    <h1 className="text-3xl font-bold text-center mb-4">Session Expired</h1>
                    <p className="text-gray-700 mb-6 text-center">
                        Your session has expired. You cannot go back to the checkout process once it is completed.
                    </p>
                    <Link to="/">
                        <button
                            className="bg-indigo-700 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded w-full"
                        >
                            Go to Home
                        </button>
                    </Link>
                </div>
            </div>
        </Fragment>
    )
}
