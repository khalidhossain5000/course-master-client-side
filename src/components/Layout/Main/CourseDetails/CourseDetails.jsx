'use client'

import useAxiosSecure from '@/hooks/AxiosSecureHooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Users,
  BookOpen,
  FileText,
  HelpCircle,
  DollarSign,
  Tag,
  User,
  Award,
  CheckCircle,
  Lock,
  PlayCircle,
  Download,
  ChevronDown,
  ChevronUp,
  Star,
  BarChart3,
  Target,
  FolderOpen,
  MessageSquare,
  Zap,
  Shield,
  Globe,
  Video,
  FileQuestion,
  Briefcase,
  Clock3,
  BookMarked
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useAuth from '@/hooks/AuthHooks/useAuth';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

const CourseDetails = ({ courseId }) => {
    const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview'); 
  const [isEnrolled,setIsEnrolled]=useState(false)
  const axiosSecure = useAxiosSecure();
  const {user} =useAuth()
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["all-courses", courseId],
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

  const singleData = data?.find((c) => c._id === courseId);
  
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
    description,
    category,
    batchName,
    thumbnail,
    isFree,
    price,
    lessons = [],
    assignments = [],
    quizzes = [],
    enrolledStudents = [],
    instructor,
    createdAt,
    updatedAt
  } = singleData;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BookOpen size={18} /> },
    { id: 'curriculum', label: 'Curriculum', icon: <FolderOpen size={18} /> },
    { id: 'assignments', label: 'Assignments', icon: <Briefcase size={18} /> },
    { id: 'quizzes', label: 'Quizzes', icon: <FileQuestion size={18} /> },
  ];



  //handle enroll here start function is wriiten
//    const handleFreeEnroll = async () => {
//     const freeEnrollData = {
//       studentEmail: user?.email,
//       role: user?.role,
//       courseId,
//       courseName :title,
//       batchName,
//       isEnrolled: true,
//     };
// console.log('free enroll data clicked here has been')
//     if(!isFree){
//         try {
//       const res = await axiosSecure.post(
//         "/api/enrollment/enroll",
//         freeEnrollData
//       );
// console.log(res)
//       if (res) {
//         await Swal.fire({
//           title: "Enrollment Successful!",
//           text: "You have been successfully enrolled in this course.",
//           icon: "success",
//           confirmButtonText: "OK",
//           timer: 2000,
//           showConfirmButton: false,
//         });

//         Swal.fire({
//           title: "Redirecting...",
//           text: "Please wait, we are taking you to your dashboard.",
//           allowOutsideClick: false,
//           allowEscapeKey: false,
//           didOpen: () => Swal.showLoading(),
//           timer: 2000,
//           timerProgressBar: true,
//         });

//         // setTimeout(() => {
//         //   router.push(`/free-enrolled-course-dashboard/${courseId}`);
//         // }, 2000);
//       }
//     } catch (error) {
//         console.log(error,'enrollment eror');
//       Swal.fire({
//         icon: "error",
//         title: "Already Enrolled!",
//         text: "You have already enrolled in this course.",
//         confirmButtonColor: "#d33",
//         confirmButtonText: "OK",
//       });
//     }
//     }
//     else{
//             router.push(`/payment/${courseId}`);
//     }
//   };






const handleCourseEnroll = async () => {
  if (isFree) {
    // Free course enroll
    try {
      const res = await axiosSecure.post("/api/enrollment/enroll/free", {
        courseId,
      });
      console.log(res,'this is res');
      Swal.fire({
        title: "Enrollment Successful!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Error",
        text: err.response?.data?.message || "Something went wrong",
        icon: "error",
      });
    }
  } else {
    // Paid course → redirect to payment page
    router.push(`/payment/${courseId}`);
  }
};









  return (
    <div className="min-h-screen bg-[#fcfff2] dark:bg-[#192335]">
      {/* Course Hero Section */}
      <div className="relative bg-gradient-to-r from-[#4a02d5] to-purple-600 dark:from-[#192335] dark:to-gray-900">
        <div className="absolute inset-0 bg-black/20 dark:bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
            <div className="lg:w-2/3">
              <div className="mb-4">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                  <Tag size={14} />
                  {category}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                {title}
              </h1>
              <p className="text-lg text-white/90 mb-6 max-w-3xl">
                {description}
              </p>
              <div className="flex flex-wrap gap-4 text-white/80">
                <div className="flex items-center gap-2">
                  <User size={18} />
                  <span>Instructor: {instructor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={18} />
                  <span>{enrolledStudents.length} Students Enrolled</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  <span>Last Updated: {new Date(updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            
            {/* Enroll Button Section - Top Right */}
            <div className="lg:w-1/4">
              <div className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                {/* Thumbnail Image */}
                <div className="mb-4">
                  <div className="relative h-40 w-full overflow-hidden rounded-xl mb-4">
                    <img
                      src={thumbnail}
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    {!isFree && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-gradient-to-r from-[#4a02d5] to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                          PREMIUM
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Price Section */}
                <div className="mb-6 text-center">
                  {isFree ? (
                    <div>
                      <span className="text-3xl font-bold text-white">FREE</span>
                      <p className="text-white/80 mt-1">Lifetime Access</p>
                    </div>
                  ) : (
                    <div>
                      <span className="text-3xl font-bold text-white">
                        ₹{price}
                      </span>
                      <p className="text-white/80 mt-1">One-time payment</p>
                    </div>
                  )}
                </div>
                
                {/* Enroll Status */}
                {isEnrolled ? (
                  <div className="text-center">
                    <div className="mb-4">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-300 rounded-full mb-2">
                        <CheckCircle size={16} />
                        <span className="font-medium">Enrolled</span>
                      </div>
                      <p className="text-white/80 text-sm">You have access to all content</p>
                    </div>
                    <button className="w-full bg-gradient-to-r from-[#71f9a3] to-emerald-400 text-[#192335] py-3.5 rounded-xl font-semibold hover:from-emerald-300 hover:to-[#71f9a3] transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl">
                      Continue Learning
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleCourseEnroll}
                    className="w-full bg-gradient-to-r from-[#71f9a3] to-emerald-400 text-[#192335] py-3.5 rounded-xl font-semibold hover:from-emerald-300 hover:to-[#71f9a3] transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl cursor-pointer"
                  >
                    {isFree ? 'Enroll for Free' : 'Buy Now'}
                  </button>
                )}
                
                {/* Quick Stats */}
                <div className="mt-6 pt-6 border-t border-white/20">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 text-white/80 mb-1">
                        <Video size={16} />
                        <span className="text-sm">Lessons</span>
                      </div>
                      <p className="text-xl font-bold text-white">{lessons.length}</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 text-white/80 mb-1">
                        <Clock3 size={16} />
                        <span className="text-sm">Duration</span>
                      </div>
                      <p className="text-xl font-bold text-white">{lessons.length * 45} min</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Content - 2/3 width */}
          <div className="lg:w-2/3">
            {/* Tabs Navigation */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg mb-6 overflow-hidden">
              <div className="flex overflow-x-auto border-b border-gray-200 dark:border-gray-700">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-all ${
                      activeTab === tab.id
                        ? 'text-[#4a02d5] dark:text-[#71f9a3] border-b-2 border-[#4a02d5] dark:border-[#71f9a3]'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div>
                    <h3 className="text-2xl font-bold text-[#192335] dark:text-[#fcfff2] mb-4">
                      Course Overview
                    </h3>
                    <div className="prose dark:prose-invert max-w-none">
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        {description}
                      </p>
                      
                      {/* What You'll Learn */}
                      <div className="bg-gradient-to-r from-[#4a02d5]/5 to-[#71f9a3]/5 dark:from-[#4a02d5]/10 dark:to-[#71f9a3]/10 rounded-2xl p-6 mb-6">
                        <h4 className="text-xl font-bold text-[#192335] dark:text-[#fcfff2] mb-4 flex items-center gap-2">
                          <Target size={20} />
                          What You wll Learn
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {lessons.slice(0, 6).map((lesson, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <CheckCircle className="text-[#4a02d5] dark:text-[#71f9a3] mt-1 flex-shrink-0" size={18} />
                              <span className="text-gray-700 dark:text-gray-300">{lesson.title}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Course Requirements */}
                      <div className="mb-6">
                        <h4 className="text-xl font-bold text-[#192335] dark:text-[#fcfff2] mb-4 flex items-center gap-2">
                          <Shield size={20} />
                          Requirements
                        </h4>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                            <CheckCircle size={16} className="text-green-500" />
                            Basic computer knowledge
                          </li>
                          <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                            <CheckCircle size={16} className="text-green-500" />
                            Internet connection
                          </li>
                          <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                            <CheckCircle size={16} className="text-green-500" />
                            Willingness to learn
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Curriculum Tab */}
                {activeTab === 'curriculum' && (
                  <div>
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-[#192335] dark:text-[#fcfff2] mb-2">
                        Course Curriculum
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {lessons.length} lessons • {assignments.length} assignments • {quizzes.length} quizzes
                      </p>
                    </div>

                    {/* Syllabus Accordion */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                      <Accordion type="single" collapsible className="w-full">
                        {/* Lessons Accordion */}
                        <AccordionItem value="lessons" className="border-b border-gray-200 dark:border-gray-700">
                          <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-[#4a02d5]/10 dark:bg-[#71f9a3]/10 rounded-lg">
                                <Video className="text-[#4a02d5] dark:text-[#71f9a3]" size={20} />
                              </div>
                              <div className="text-left">
                                <h4 className="font-semibold text-[#192335] dark:text-[#fcfff2]">Lessons</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {lessons.length} video lessons
                                </p>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-6 pb-4">
                            <div className="space-y-3">
                              {lessons.map((lesson, index) => (
                                <div
                                  key={lesson._id}
                                  className={`flex items-center justify-between p-4 ${isEnrolled ? 'bg-green-50 dark:bg-green-900/10' : 'bg-gray-50 dark:bg-gray-700/30'} rounded-lg`}
                                >
                                  <div className="flex items-center gap-3">
                                    <div className={`flex items-center justify-center w-8 h-8 ${isEnrolled ? 'bg-green-200 dark:bg-green-800' : 'bg-gray-200 dark:bg-gray-600'} rounded-full`}>
                                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {index + 1}
                                      </span>
                                    </div>
                                    <div>
                                      <h5 className="font-medium text-[#192335] dark:text-[#fcfff2]">
                                        {lesson.title}
                                      </h5>
                                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                        <PlayCircle size={14} />
                                        <span>Video Lesson</span>
                                      </div>
                                    </div>
                                  </div>
                                  {isEnrolled ? (
                                    <button className="flex items-center gap-2 px-3 py-1.5 bg-[#4a02d5] dark:bg-[#71f9a3] text-white text-sm font-medium rounded-lg hover:bg-[#4a02d5]/90 dark:hover:bg-[#71f9a3]/90 transition-colors">
                                      <PlayCircle size={14} />
                                      Watch
                                    </button>
                                  ) : (
                                    <Lock size={18} className="text-gray-400" />
                                  )}
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        {/* Assignments Accordion */}
                        <AccordionItem value="assignments" className="border-b border-gray-200 dark:border-gray-700">
                          <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-[#4a02d5]/10 dark:bg-[#71f9a3]/10 rounded-lg">
                                <Briefcase className="text-[#4a02d5] dark:text-[#71f9a3]" size={20} />
                              </div>
                              <div className="text-left">
                                <h4 className="font-semibold text-[#192335] dark:text-[#fcfff2]">Assignments</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {assignments.length} practical assignments
                                </p>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-6 pb-4">
                            <div className="space-y-3">
                              {assignments.map((assignment, index) => (
                                <div
                                  key={assignment._id}
                                  className={`p-4 ${isEnrolled ? 'bg-green-50 dark:bg-green-900/10' : 'bg-gray-50 dark:bg-gray-700/30'} rounded-lg`}
                                >
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                      <div className={`flex items-center justify-center w-8 h-8 ${isEnrolled ? 'bg-green-200 dark:bg-green-800' : 'bg-gray-200 dark:bg-gray-600'} rounded-full`}>
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                          {index + 1}
                                        </span>
                                      </div>
                                      <h5 className="font-medium text-[#192335] dark:text-[#fcfff2]">
                                        {assignment.title}
                                      </h5>
                                    </div>
                                    <span className="px-3 py-1 bg-[#4a02d5]/10 dark:bg-[#71f9a3]/10 text-[#4a02d5] dark:text-[#71f9a3] text-sm font-medium rounded-full">
                                      {assignment.totalMarks} marks
                                    </span>
                                  </div>
                                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                                    {assignment.description}
                                  </p>
                                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                    <div className="flex items-center gap-1">
                                      <Calendar size={14} />
                                      <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                                    </div>
                                    {isEnrolled ? (
                                      <button className="ml-auto flex items-center gap-2 px-3 py-1.5 bg-[#4a02d5] dark:bg-[#71f9a3] text-white text-sm font-medium rounded-lg hover:bg-[#4a02d5]/90 dark:hover:bg-[#71f9a3]/90 transition-colors">
                                        <Download size={14} />
                                        Download
                                      </button>
                                    ) : (
                                      <Lock size={14} className="ml-auto" />
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        {/* Quizzes Accordion */}
                        <AccordionItem value="quizzes">
                          <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-[#4a02d5]/10 dark:bg-[#71f9a3]/10 rounded-lg">
                                <FileQuestion className="text-[#4a02d5] dark:text-[#71f9a3]" size={20} />
                              </div>
                              <div className="text-left">
                                <h4 className="font-semibold text-[#192335] dark:text-[#fcfff2]">Quizzes</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {quizzes.length} assessment quizzes
                                </p>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-6 pb-4">
                            <div className="space-y-3">
                              {quizzes.map((quiz, index) => (
                                <div
                                  key={quiz._id}
                                  className={`p-4 ${isEnrolled ? 'bg-green-50 dark:bg-green-900/10' : 'bg-gray-50 dark:bg-gray-700/30'} rounded-lg`}
                                >
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                      <div className={`flex items-center justify-center w-8 h-8 ${isEnrolled ? 'bg-green-200 dark:bg-green-800' : 'bg-gray-200 dark:bg-gray-600'} rounded-full`}>
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                          {index + 1}
                                        </span>
                                      </div>
                                      <h5 className="font-medium text-[#192335] dark:text-[#fcfff2]">
                                        {quiz.title}
                                      </h5>
                                    </div>
                                    <span className="px-3 py-1 bg-[#4a02d5]/10 dark:bg-[#71f9a3]/10 text-[#4a02d5] dark:text-[#71f9a3] text-sm font-medium rounded-full">
                                      {quiz.questions?.length || 0} questions
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                    <div className="flex items-center gap-1">
                                      <Calendar size={14} />
                                      <span>Due: {new Date(quiz.dueDate).toLocaleDateString()}</span>
                                    </div>
                                    {isEnrolled ? (
                                      <button className="ml-auto flex items-center gap-2 px-3 py-1.5 bg-[#4a02d5] dark:bg-[#71f9a3] text-white text-sm font-medium rounded-lg hover:bg-[#4a02d5]/90 dark:hover:bg-[#71f9a3]/90 transition-colors">
                                        <HelpCircle size={14} />
                                        Start Quiz
                                      </button>
                                    ) : (
                                      <Lock size={14} className="ml-auto" />
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>
                )}

                {/* Assignments Tab */}
                {activeTab === 'assignments' && (
                  <div>
                    <h3 className="text-2xl font-bold text-[#192335] dark:text-[#fcfff2] mb-6">
                      Course Assignments
                    </h3>
                    {assignments.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="h-16 w-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Briefcase className="text-gray-400" size={24} />
                        </div>
                        <p className="text-gray-500 dark:text-gray-400">
                          No assignments available for this course yet.
                        </p>
                      </div>
                    ) : (
                      <div className="grid gap-4">
                        {assignments.map((assignment) => (
                          <div
                            key={assignment._id}
                            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow"
                          >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div>
                                <h4 className="text-xl font-bold text-[#192335] dark:text-[#fcfff2] mb-2">
                                  {assignment.title}
                                </h4>
                                <p className="text-gray-600 dark:text-gray-400 mb-3">
                                  {assignment.description}
                                </p>
                                <div className="flex flex-wrap gap-4">
                                  <div className="flex items-center gap-2 text-sm">
                                    <Calendar size={16} className="text-[#4a02d5] dark:text-[#71f9a3]" />
                                    <span className="text-gray-600 dark:text-gray-400">
                                      Due: {new Date(assignment.dueDate).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <Award size={16} className="text-[#4a02d5] dark:text-[#71f9a3]" />
                                    <span className="text-gray-600 dark:text-gray-400">
                                      Total Marks: {assignment.totalMarks}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                {isEnrolled ? (
                                  <button className="px-4 py-2 bg-[#4a02d5] dark:bg-[#71f9a3] text-white rounded-lg hover:bg-[#4a02d5]/90 dark:hover:bg-[#71f9a3]/90 transition-colors flex items-center gap-2">
                                    <Download size={16} />
                                    Download Assignment
                                  </button>
                                ) : (
                                  <div className="text-center">
                                    <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg cursor-not-allowed">
                                      Start Assignment
                                    </button>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 block mt-1">
                                      Locked until enrollment
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Quizzes Tab */}
                {activeTab === 'quizzes' && (
                  <div>
                    <h3 className="text-2xl font-bold text-[#192335] dark:text-[#fcfff2] mb-6">
                      Course Quizzes
                    </h3>
                    {quizzes.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="h-16 w-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                          <FileQuestion className="text-gray-400" size={24} />
                        </div>
                        <p className="text-gray-500 dark:text-gray-400">
                          No quizzes available for this course yet.
                        </p>
                      </div>
                    ) : (
                      <div className="grid gap-4">
                        {quizzes.map((quiz) => (
                          <div
                            key={quiz._id}
                            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow"
                          >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div>
                                <h4 className="text-xl font-bold text-[#192335] dark:text-[#fcfff2] mb-2">
                                  {quiz.title}
                                </h4>
                                <div className="flex flex-wrap gap-4 mb-3">
                                  <div className="flex items-center gap-2 text-sm">
                                    <Calendar size={16} className="text-[#4a02d5] dark:text-[#71f9a3]" />
                                    <span className="text-gray-600 dark:text-gray-400">
                                      Due: {new Date(quiz.dueDate).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <HelpCircle size={16} className="text-[#4a02d5] dark:text-[#71f9a3]" />
                                    <span className="text-gray-600 dark:text-gray-400">
                                      {quiz.questions?.length || 0} Questions
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                {isEnrolled ? (
                                  <button className="px-4 py-2 bg-[#4a02d5] dark:bg-[#71f9a3] text-white rounded-lg hover:bg-[#4a02d5]/90 dark:hover:bg-[#71f9a3]/90 transition-colors flex items-center gap-2">
                                    <HelpCircle size={16} />
                                    Start Quiz
                                  </button>
                                ) : (
                                  <div className="text-center">
                                    <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg cursor-not-allowed">
                                      Start Quiz
                                    </button>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 block mt-1">
                                      Locked until enrollment
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar - 1/3 width */}
          <div className="lg:w-1/3">
            <div className="sticky top-6 space-y-6">
              {/* Course Stats Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-[#192335] dark:text-[#fcfff2] mb-4">
                  Course Statistics
                </h3>
                
                {/* Course Stats */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#4a02d5]/10 dark:bg-[#71f9a3]/10 rounded-lg">
                        <Video className="text-[#4a02d5] dark:text-[#71f9a3]" size={18} />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">Lessons</span>
                    </div>
                    <span className="font-semibold text-[#192335] dark:text-[#fcfff2]">{lessons.length}</span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#4a02d5]/10 dark:bg-[#71f9a3]/10 rounded-lg">
                        <Briefcase className="text-[#4a02d5] dark:text-[#71f9a3]" size={18} />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">Assignments</span>
                    </div>
                    <span className="font-semibold text-[#192335] dark:text-[#fcfff2]">{assignments.length}</span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#4a02d5]/10 dark:bg-[#71f9a3]/10 rounded-lg">
                        <FileQuestion className="text-[#4a02d5] dark:text-[#71f9a3]" size={18} />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">Quizzes</span>
                    </div>
                    <span className="font-semibold text-[#192335] dark:text-[#fcfff2]">{quizzes.length}</span>
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#4a02d5]/10 dark:bg-[#71f9a3]/10 rounded-lg">
                        <Users className="text-[#4a02d5] dark:text-[#71f9a3]" size={18} />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">Enrolled</span>
                    </div>
                    <span className="font-semibold text-[#192335] dark:text-[#fcfff2]">{enrolledStudents.length}</span>
                  </div>
                </div>
              </div>

              {/* Instructor Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-[#192335] dark:text-[#fcfff2] mb-4 flex items-center gap-2">
                  <User size={20} />
                  Instructor
                </h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#4a02d5] to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {instructor?.charAt(0) || 'I'}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#192335] dark:text-[#fcfff2]">{instructor}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Course Instructor</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Experienced instructor with expertise in {category}. Dedicated to providing quality education and hands-on learning experiences.
                </p>
              </div>

              {/* Course Features */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-[#192335] dark:text-[#fcfff2] mb-4">
                  This course includes:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <Video className="text-[#4a02d5] dark:text-[#71f9a3]" size={18} />
                    <span>{lessons.length} hours on-demand video</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <Download className="text-[#4a02d5] dark:text-[#71f9a3]" size={18} />
                    <span>Downloadable resources</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <Award className="text-[#4a02d5] dark:text-[#71f9a3]" size={18} />
                    <span>Certificate of completion</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <Globe className="text-[#4a02d5] dark:text-[#71f9a3]" size={18} />
                    <span>Full lifetime access</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <MessageSquare className="text-[#4a02d5] dark:text-[#71f9a3]" size={18} />
                    <span>Q&A support</span>
                  </li>
                </ul>
              </div>

              {/* Batch Information */}
              <div className="bg-gradient-to-r from-[#4a02d5]/10 to-[#71f9a3]/10 dark:from-[#4a02d5]/20 dark:to-[#71f9a3]/20 rounded-2xl shadow-lg p-6 border border-[#4a02d5]/20 dark:border-[#71f9a3]/20">
                <h3 className="text-xl font-bold text-[#192335] dark:text-[#fcfff2] mb-4 flex items-center gap-2">
                  <Calendar size={20} />
                  Batch Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Batch Name</p>
                    <p className="font-semibold text-[#192335] dark:text-[#fcfff2]">{batchName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Course Created</p>
                    <p className="font-semibold text-[#192335] dark:text-[#fcfff2]">
                      {new Date(createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Last Updated</p>
                    <p className="font-semibold text-[#192335] dark:text-[#fcfff2]">
                      {new Date(updatedAt).toLocaleDateString()}
                    </p>
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

export default CourseDetails;