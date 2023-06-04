import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom'

export default function ProtectedRoutes() {
    const { IsLogdin } = useSelector(state => state.Signin)
    const searchParams = new URLSearchParams(location.search);

    // Add existing search parameters to the URLSearchParams object
    const existingSearchParams = searchParams.toString();

    // Append the existing search parameters along with the next parameter
    const nextParam = encodeURIComponent(`${location.pathname}${existingSearchParams ? `?${existingSearchParams}` : ''}`);
    return (
        IsLogdin ? <Outlet /> : <Navigate to={`/V2/auth/sign_in?next=${nextParam}`} />
    )
}
