import { useUserStore } from '@/stores/useUserStore'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const PublicRoutes = ({
    children
}) => {

    const { isLoggedIn } = useUserStore()
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/')
        }
    }, [isLoggedIn, navigate])

    if(isLoggedIn) {
        return null
    }

    return children
}

export default PublicRoutes