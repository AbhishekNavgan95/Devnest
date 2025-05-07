import Container from '@/components/common/Container'
import React, { useState } from 'react'
import logo from '../assets/logo/logo.png'
import { useNavigate, useParams } from 'react-router-dom'
import HilightText from '@/components/common/HilightText'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { BASE_API_URL } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'

const VerifyAccount = () => {

    const [loading, setLoading] = useState(false)
    const { token } = useParams();
    const { toast } = useToast();
    const navigate = useNavigate();

    const verifyAccount = async () => {
        try {
            setLoading(true)
            const response = await axios.post(BASE_API_URL + '/auth/verifyaccount', { token })
            console.log(response.data)
            if (response.data.success) {
                toast({
                    title: 'Account verified successfully',
                    description: 'You can now login to your account',
                })
                navigate('/login')
            } else {
                toast({
                    title: 'Account verification failed',
                    description: response.data.message,
                    variant: 'destructive'
                })
            }
        }
        catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container>
            <div className='py-24'>
                <div className='flex my-14 flex-col items-center'>
                    <img src={logo} className='w-[180px] mb-8' alt="devnest" />
                    <h2 className='text-3xl font-medium text-center'>Verify Your <HilightText>DevNest</HilightText> Account</h2>
                    <p>
                        Click the button below to verify your account and start your journey with us.
                    </p>
                    <Button onClick={verifyAccount} disabled={loading} className='my-8 w-[440px]'>
                        Verify Account
                    </Button>
                    <p>
                        If you have already verified your account,
                    </p>
                    <p>
                        you can <button onClick={() => navigate('/login')} className='text-main-400 font-semibold'>Login</button> to your account.
                    </p>
                </div>
            </div>
        </Container>
    )
}

export default VerifyAccount