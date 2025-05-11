import { useToast } from '@/hooks/use-toast';
import React from 'react'
import Logo from '@/assets/logo/logo.png'
import { api } from '@/lib/utils';
import { Button } from '../ui/button';
import { useUserStore } from '@/stores/useUserStore';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '@/stores/useCartStore';

const varifyPayment = async (data, courses, toast) => {
    try {
        const response = await api.post('/payment/verifyPayment', {
            razorpay_order_id: data.razorpay_order_id,
            razorpay_payment_id: data.razorpay_payment_id,
            razorpay_signature: data.razorpay_signature,
            courses: courses
        })

        // console.log("verify payment response : ", response)

        if (!response?.data?.success) {
            throw new Error(response?.data.message);
        }

        return true
    } catch (error) {
        console.log(error)
        toast({
            title: "Something went wrong",
            description: "The payment verification failed",
            variant: "destructive"
        })
    }
    return false
}

const sendSuccessEmail = async (data, amount) => {
    try {
        const response = await api.post('/payment/sendPaymentSuccessEmail', {
            orderId: data.razorpay_order_id,
            paymentId: data.razorpay_payment_id,
            amount
        })

        // console.log("send mail response : ", response)

        if (!response?.data.success) {
            throw new Error(response?.data.message);
        }
    } catch (error) {
        console.log(error)
    }
}

const BuyCourseButton = ({
    course
}) => {

    const { removeFromCart } = useCartStore()
    const { user, setUser } = useUserStore()
    const { toast } = useToast()
    const navigate = useNavigate();

    const buyCourse = async () => {
        try {
            const orderResponse = await api.post('/payment/capturePayment', { courses: [course?._id] })

            if (!orderResponse?.data?.success) {
                throw new Error(orderResponse?.data?.message);
            }

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY,
                currency: orderResponse?.data?.message?.currency,
                amount: `${orderResponse?.data?.message?.amount}`,
                order_id: orderResponse?.data?.message?.id,
                name: "Devnest",
                description: "Thank you for purchasing the course",
                image: Logo,
                prefill: {
                    name: `${user?.firstName} ${user?.lastName}`,
                    email: user?.email,
                },
                handler: (res) => {
                    // verify paymemt
                    const paymentSuccess = varifyPayment(res, [course?._id], toast)
                    if (paymentSuccess) {
                        toast({
                            title: "Payment successful",
                            description: "You have successfully enrolled in the course",
                        })

                        navigate('/dashboard/enrolled-courses')

                        removeFromCart(course?._id)

                        setUser({
                            ...user,
                            courses: [
                                ...user?.courses,
                                course
                            ]
                        })

                        // send email response
                        sendSuccessEmail(res, orderResponse?.data?.message?.amount)
                    }
                },
            };

            const paymentObject = new window.Razorpay(options)
            paymentObject.open();
            paymentObject.on("payment.failed", (response) => {
                toast({
                    title: "Oops, payment failed",
                    description: "Please try again later",
                    variant: "destructive"
                })
            })

        } catch (error) {
            console.log(error)
            toast({
                title: "Something went wrong",
                description: "Please try again later",
                variant: "error"
            })
        }
    }

    return (
        <Button onClick={buyCourse} size='lg'>
            Enroll Now
        </Button>
    )
}

export default BuyCourseButton