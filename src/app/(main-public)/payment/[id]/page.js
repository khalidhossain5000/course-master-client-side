import PaymentForm from '@/components/Layout/Main/Home/PaidCourseEnrollPaymentPage/PaymentForm';
import React, { use } from 'react';

const MakePayment = ({params}) => {
    const {id} =use(params)
   
    return (
        <div>
            <PaymentForm paidCourseId={id}></PaymentForm>
        </div>
    );
};

export default MakePayment;