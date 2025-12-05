'use client'

import useAuth from '@/hooks/AuthHooks/useAuth';
import useAxiosSecure from '@/hooks/AxiosSecureHooks/useAxiosSecure';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { 
  Shield, 
  Lock, 
  CreditCard, 
  Smartphone, 
  CheckCircle, 
  AlertCircle,
  Banknote,
  Receipt,
  SmartphoneIcon,
  Key,
  Wallet,
  ShieldCheck,
  Zap,
  Sparkles,
  Fingerprint,
  HelpCircle
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

const paymentInstructions = {
  bkash: {
    instructions: `💰 Bkash Payment Instructions:
1. Go to your Bkash app.
2. Select "Send Money".
3. Enter merchant number: 01788986500
4. Enter the course amount and confirm.
5. Copy the transaction ID and paste it below.`,
    icon: <Smartphone className="text-green-500" size={20} />
  },
  rocket: {
    instructions: `💰 Rocket Payment Instructions:
1. Open Rocket app.
2. Choose "Send Money".
3. Send to number: 01788986500
4. Enter amount and confirm.
5. Copy transaction ID and paste here.`,
    icon: <Wallet className="text-purple-500" size={20} />
  },
  upay: {
    instructions: `💰 Upay Payment Instructions:
1. Open Upay app.
2. Select "Send Money".
3. Send to number: 01293844590
4. Enter the amount and confirm.
5. Copy transaction ID and paste here.`,
    icon: <Zap className="text-blue-500" size={20} />
  },
  nagad: {
    instructions: `💰 Nagad Payment Instructions:
1. Open Nagad app.
2. Choose "Send Money".
3. Send to number: 01834690500
4. Enter the course amount and confirm.
5. Copy transaction ID and paste here.`,
    icon: <Banknote className="text-red-500" size={20} />
  },
};

const PaymentForm = ({ paidCourseId, coursePrice, courseTitle }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["all-courses", paidCourseId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/courses`);

       console.log(res.data);
      return res.data.data;
    },
    keepPreviousData: true,
  });

  

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-[#fcfff2] dark:bg-[#192335] rounded-2xl">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-[#4a02d5] mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-[#fcfff2] dark:bg-[#192335] rounded-2xl">
        <div className="text-center">
          <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-xl">!</span>
          </div>
          <p className="text-red-500 text-lg font-medium">
            Error fetching course details
          </p>
          <button
            onClick={() => refetch()}
            className="mt-4 px-4 py-2 bg-[#4a02d5] dark:bg-[#71f9a3] text-white rounded-lg hover:bg-[#4a02d5]/90 dark:hover:bg-[#71f9a3]/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const singleData = data?.find((c) => c._id === paidCourseId);
  
  
  if (!singleData) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-[#fcfff2] dark:bg-[#192335] rounded-2xl">
        <div className="text-center">
          <div className="h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="text-yellow-500" size={24} />
          </div>
          <p className="text-yellow-500 text-lg font-medium">
            Course not found!
          </p>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            The course you re looking for doesnt exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  const {
    title,
    category,
    batchName,
    isFree,
    price,
  
  } = singleData;

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
console.log(paymentMethod,mobileNumber,transactionId,'inof hhdkgjhksjghjksdg');
    if (!paymentMethod || !mobileNumber || !transactionId ) {
      Swal.fire({
        icon: 'error',
        title: 'All fields are required',
        text: 'Please fill in all payment details',
        timer: 2000,
        showConfirmButton: false
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await axiosSecure.post('/api/enrollment/enroll/paid', {
        courseId: paidCourseId,
        transactionId,
        method: paymentMethod,
        amount:price,
        mobileNumber,
        courseTitle
      });
console.log(res,'this is ires');
      Swal.fire({
        icon: 'success',
        title: 'Payment Successful!',
        text: 'You have been enrolled in this course.',
        timer: 2500,
        showConfirmButton: false
      });
    } catch (err) {
        console.log(err,'errp');
      Swal.fire({
        icon: 'error',
        title: 'Payment Failed',
        text: err.response?.data?.message || 'Something went wrong. Please try again.',
        timer: 2500,
        showConfirmButton: false
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfff2] dark:bg-[#192335] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Attractive Secure Payment Banner */}
        <div className="relative overflow-hidden bg-gradient-to-r from-[#4a02d5] via-purple-600 to-[#71f9a3] dark:from-[#192335] dark:via-purple-800 dark:to-[#71f9a3] rounded-3xl shadow-2xl mb-8 p-8 md:p-12">
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="md:w-2/3">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-2xl">
                    <ShieldCheck size={32} className="text-white" />
                  </div>
                  <span className="text-white/90 text-sm font-medium px-4 py-2 bg-white/10 dark:bg-black/20 rounded-full">
                    🔒 100% Secure Payment
                  </span>
                </div>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                  Secure Course Enrollment
                </h1>
                
                <p className="text-lg text-white/90 mb-6 max-w-2xl">
                  Your payment information is encrypted and protected with bank-level security. 
                  Complete your enrollment in just a few simple steps.
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="flex items-center gap-2 text-white/90">
                    <CheckCircle size={18} className="text-[#71f9a3]" />
                    <span className="text-sm"> Encrypted</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/90">
                    <CheckCircle size={18} className="text-[#71f9a3]" />
                    <span className="text-sm">Instant Access</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/90">
                    <CheckCircle size={18} className="text-[#71f9a3]" />
                    <span className="text-sm">Money Back Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/90">
                    <CheckCircle size={18} className="text-[#71f9a3]" />
                    <span className="text-sm">24/7 Support</span>
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/3">
                <div className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white/80 text-sm">Enrolling in {title}</span>
                    <span className="text-[#71f9a3] text-sm font-medium">Step 2/2</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{title || "Premium Course"}</h3>
                  <div className="text-3xl font-bold text-white mb-4">₹{price || "0"}</div>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <Lock size={14} />
                    <span>Secure payment gateway</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#71f9a3]/20 to-transparent rounded-full -translate-x-24 translate-y-24"></div>
          <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/3 w-6 h-6 bg-[#71f9a3]/20 rounded-full animate-pulse"></div>
        </div>

        {/* Payment Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Payment Methods */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 md:p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[#4a02d5]/10 dark:bg-[#71f9a3]/10 rounded-xl">
                  <CreditCard className="text-[#4a02d5] dark:text-[#71f9a3]" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#192335] dark:text-[#fcfff2]">
                    Complete Your Payment
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Fill in your payment details below
                  </p>
                </div>
              </div>

              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                {/* Payment Method Selection */}
                <div>
                  <label className="block text-lg font-semibold text-[#192335] dark:text-[#fcfff2] mb-3">
                    <span className="flex items-center gap-2">
                      <Wallet size={20} />
                      Select Payment Method
                    </span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    {[
                      { value: 'bkash', label: 'Bkash', color: 'bg-green-500' },
                      { value: 'nagad', label: 'Nagad', color: 'bg-red-500' },
                      { value: 'rocket', label: 'Rocket', color: 'bg-purple-500' },
                      { value: 'upay', label: 'Upay', color: 'bg-blue-500' },
                    ].map((method) => (
                      <button
                        key={method.value}
                        type="button"
                        onClick={() => setPaymentMethod(method.value)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-[1.02] ${paymentMethod === method.value 
                          ? `border-[#4a02d5] dark:border-[#71f9a3] bg-gradient-to-r from-[#4a02d5]/10 to-[#71f9a3]/10 dark:from-[#4a02d5]/20 dark:to-[#71f9a3]/20` 
                          : 'border-gray-300 dark:border-gray-700 hover:border-[#4a02d5] dark:hover:border-[#71f9a3]'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <div className={`w-12 h-12 ${method.color} rounded-full flex items-center justify-center`}>
                            {paymentInstructions[method.value]?.icon}
                          </div>
                          <span className="font-medium text-[#192335] dark:text-[#fcfff2]">
                            {method.label}
                          </span>
                          {paymentMethod === method.value && (
                            <CheckCircle size={16} className="text-green-500" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Payment Instructions */}
                {paymentMethod && (
                  <div className="bg-gradient-to-r from-[#4a02d5]/5 to-[#71f9a3]/5 dark:from-[#4a02d5]/10 dark:to-[#71f9a3]/10 rounded-2xl p-6 border border-[#4a02d5]/20 dark:border-[#71f9a3]/20">
                    <div className="flex items-center gap-3 mb-4">
                      <AlertCircle className="text-[#4a02d5] dark:text-[#71f9a3]" size={24} />
                      <h3 className="text-xl font-bold text-[#192335] dark:text-[#fcfff2]">
                        Payment Instructions
                      </h3>
                    </div>
                    <div className="bg-white dark:bg-gray-900/50 rounded-xl p-4">
                      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line font-medium">
                        {paymentInstructions[paymentMethod]?.instructions}
                      </p>
                    </div>
                  </div>
                )}

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Mobile Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <span className="flex items-center gap-2">
                        <SmartphoneIcon size={16} />
                        Mobile Number
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter the number you paid from"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4a02d5] dark:focus:ring-[#71f9a3] focus:border-transparent text-[#192335] dark:text-[#fcfff2] placeholder-gray-500 dark:placeholder-gray-400"
                    />
                  </div>

                  {/* Transaction ID */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <span className="flex items-center gap-2">
                        <Key size={16} />
                        Transaction ID
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter transaction ID"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4a02d5] dark:focus:ring-[#71f9a3] focus:border-transparent text-[#192335] dark:text-[#fcfff2] placeholder-gray-500 dark:placeholder-gray-400"
                    />
                  </div>

                  {/* Amount Paid */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <span className="flex items-center gap-2 ">
                        <Receipt size={16} />
                        Amount Need Pay 
                      </span>
                    </label>
                    <input
                      type="number"
                      placeholder={price}
                      value={price}
                      onChange={(e) => setAmount(e.target.value)}
                      className="disabled cursor-not-allowed w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4a02d5] dark:focus:ring-[#71f9a3] focus:border-transparent text-[#192335] dark:text-[#fcfff2] placeholder-gray-500 dark:placeholder-gray-400"
                    />
                  </div>

                  {/* Course ID (Read Only) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <span className="flex items-center gap-2">
                        <Fingerprint size={16} />
                        Course ID
                      </span>
                    </label>
                    <input
                      type="text"
                      value={paidCourseId}
                      readOnly
                      className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-600 dark:text-gray-400 cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-[#4a02d5] to-purple-600 dark:from-[#71f9a3] dark:to-emerald-400 text-white dark:text-[#192335] hover:from-[#71f9a3] hover:to-emerald-400 hover:text-[#192335] dark:hover:from-[#4a02d5] dark:hover:to-purple-600 dark:hover:text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white dark:border-[#192335]"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={20} />
                      Pay With Secure Payment System
                    </>
                  )}
                </button>

                {/* Security Note */}
                <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
                    <Lock size={14} />
                    Your payment details are encrypted and secure
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column - Security Features */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Security Features Card */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-[#192335] dark:text-[#fcfff2] mb-6 flex items-center gap-2">
                  <ShieldCheck size={24} className="text-[#4a02d5] dark:text-[#71f9a3]" />
                  Security Features
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                      <Lock size={18} className="text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#192335] dark:text-[#fcfff2]">256-bit SSL Encryption</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Bank-level security for all transactions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      <Shield size={18} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#192335] dark:text-[#fcfff2]">Fraud Protection</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Advanced fraud detection systems</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                      <Sparkles size={18} className="text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#192335] dark:text-[#fcfff2]">Instant Verification</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Real-time transaction verification</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                      <CheckCircle size={18} className="text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#192335] dark:text-[#fcfff2]">Money-Back Guarantee</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">30-day refund policy</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Steps */}
              <div className="bg-gradient-to-r from-[#4a02d5]/10 to-[#71f9a3]/10 dark:from-[#4a02d5]/20 dark:to-[#71f9a3]/20 rounded-3xl shadow-xl p-6 border border-[#4a02d5]/20 dark:border-[#71f9a3]/20">
                <h3 className="text-xl font-bold text-[#192335] dark:text-[#fcfff2] mb-6">
                  Payment Process
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-[#4a02d5] dark:bg-[#71f9a3] text-white rounded-full font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#192335] dark:text-[#fcfff2]">Choose Payment Method</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Select your preferred payment gateway</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-[#4a02d5] dark:bg-[#71f9a3] text-white rounded-full font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#192335] dark:text-[#fcfff2]">Complete Payment</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Follow the instructions for payment</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-[#4a02d5] dark:bg-[#71f9a3] text-white rounded-full font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#192335] dark:text-[#fcfff2]">Verify Details</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Enter transaction ID and amount</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-[#4a02d5] dark:bg-[#71f9a3] text-white rounded-full font-bold">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#192335] dark:text-[#fcfff2]">Get Instant Access</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Immediate course enrollment</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Support */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-[#192335] dark:text-[#fcfff2] mb-4">
                  Need Help?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Our support team is available 24/7 to assist you with any payment issues.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#4a02d5] dark:text-[#71f9a3]">
                    <span className="font-medium">Email:</span>
                    <span>support@coursehub.com</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#4a02d5] dark:text-[#71f9a3]">
                    <span className="font-medium">Phone:</span>
                    <span>+880 1234 567890</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;