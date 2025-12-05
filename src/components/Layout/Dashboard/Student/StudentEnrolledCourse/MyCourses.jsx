'use client'

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '@/hooks/AxiosSecureHooks/useAxiosSecure';
import { 
  BookOpen, 
  User, 
  Tag, 
  Calendar, 
  Clock, 
  Award, 
  BarChart3, 
  ChevronLeft, 
  ChevronRight,
  CheckCircle,
  PlayCircle,
  FolderOpen,
  AlertCircle,
  RefreshCw
} from 'lucide-react';

const MyCourses = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1); 
  const limit = 5;

  // Fetch enrolled courses
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['my-courses', page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/enrollment/my-courses?page=${page}&limit=${limit}`);
      return res.data;
    },
    keepPreviousData: true,
  });
console.log(data);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-[#fcfff2] dark:bg-[#192335] rounded-2xl">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-[#4a02d5] mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading your courses...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-[#fcfff2] dark:bg-[#192335] rounded-2xl">
        <div className="text-center">
          <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={24} className="text-red-500" />
          </div>
          <p className="text-red-500 text-lg font-medium mb-2">
            Error loading courses
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Please try again later
          </p>
          <button
            onClick={refetch}
            className="px-4 py-2 bg-[#4a02d5] dark:bg-[#71f9a3] text-white rounded-lg hover:bg-[#4a02d5]/90 dark:hover:bg-[#71f9a3]/90 transition-colors flex items-center gap-2 mx-auto"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const enrollments = data?.enrollments || [];
  const totalPages = data?.totalPages || 1;
  const currentPage = page;

  return (
    <div className="min-h-screen bg-[#fcfff2] dark:bg-[#192335] p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#192335] dark:text-[#fcfff2] mb-2 flex items-center gap-3">
            <BookOpen size={32} className="text-[#4a02d5] dark:text-[#71f9a3]" />
            My Enrolled Courses
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and continue your learning journey
          </p>
        </div>

        {/* No Courses State */}
        {enrollments.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="h-20 w-20 bg-gradient-to-r from-[#4a02d5]/10 to-[#71f9a3]/10 dark:from-[#4a02d5]/20 dark:to-[#71f9a3]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen size={32} className="text-[#4a02d5] dark:text-[#71f9a3]" />
              </div>
              <h3 className="text-2xl font-bold text-[#192335] dark:text-[#fcfff2] mb-2">
                No Courses Enrolled Yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Start your learning journey by enrolling in courses from our catalog
              </p>
              <button className="px-6 py-3 bg-gradient-to-r from-[#4a02d5] to-purple-600 dark:from-[#71f9a3] dark:to-emerald-400 text-white rounded-xl font-medium hover:opacity-90 transition-all duration-200 shadow-lg">
                Browse Courses
              </button>
            </div>
          </div>
        )}

        {/* Courses List */}
        {enrollments.length > 0 && (
          <>
            <div className="grid gap-6 mb-8">
              {enrollments.map((enrollment) => {
                const course = enrollment.course;
                const progress = enrollment.progress || 0;
                
                return (
                  <div 
                    key={enrollment._id} 
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden"
                  >
                    {/* Course Header */}
                    <div className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                        {/* Left Section - Course Info */}
                        <div className="lg:w-2/3">
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#4a02d5]/10 dark:bg-[#71f9a3]/10 text-[#4a02d5] dark:text-[#71f9a3] rounded-full text-sm font-medium">
                              <Tag size={12} />
                              {course.category}
                            </span>
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                              enrollment.paymentStatus === 'paid' 
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                                : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                            }`}>
                              <Award size={12} />
                              {enrollment.paymentStatus.charAt(0).toUpperCase() + enrollment.paymentStatus.slice(1)}
                            </span>
                          </div>
                          
                          <h3 className="text-xl font-bold text-[#192335] dark:text-[#fcfff2] mb-2">
                            {course.title}
                          </h3>
                          
                          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                            {course.description}
                          </p>
                          
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-2">
                              <User size={14} />
                              <span>Instructor: {course.instructor}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FolderOpen size={14} />
                              <span>{course.lessons?.length || 0} Lessons</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar size={14} />
                              <span>Enrolled: {new Date(enrollment.enrolledAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Right Section - Progress & Actions */}
                        <div className="lg:w-1/3">
                          <div className="space-y-4">
                            {/* Progress Bar */}
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium text-[#192335] dark:text-[#fcfff2]">Progress</span>
                                <span className="text-sm font-bold text-[#4a02d5] dark:text-[#71f9a3]">{progress}%</span>
                              </div>
                              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-[#4a02d5] to-[#71f9a3] rounded-full transition-all duration-500"
                                  style={{ width: `${progress}%` }}
                                />
                              </div>
                            </div>
                            
                            {/* Action Button */}
                            <button className="w-full py-3 bg-gradient-to-r from-[#4a02d5] to-purple-600 dark:from-[#71f9a3] dark:to-emerald-400 text-white rounded-xl font-medium hover:opacity-90 transition-all duration-200 shadow-lg flex items-center justify-center gap-2">
                              <PlayCircle size={18} />
                              {progress === 100 ? 'Review Course' : 'Continue Learning'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Stats Footer */}
                    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/30 border-t border-gray-200 dark:border-gray-700">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-2 mb-1">
                            <BarChart3 size={16} className="text-[#4a02d5] dark:text-[#71f9a3]" />
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Assignments</span>
                          </div>
                          <p className="text-lg font-bold text-[#192335] dark:text-[#fcfff2]">{course.assignments?.length || 0}</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-2 mb-1">
                            <Award size={16} className="text-[#4a02d5] dark:text-[#71f9a3]" />
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Quizzes</span>
                          </div>
                          <p className="text-lg font-bold text-[#192335] dark:text-[#fcfff2]">{course.quizzes?.length || 0}</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-2 mb-1">
                            <Clock size={16} className="text-[#4a02d5] dark:text-[#71f9a3]" />
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</span>
                          </div>
                          <p className="text-lg font-bold text-[#192335] dark:text-[#fcfff2]">{Math.round((course.lessons?.length || 0) * (progress / 100))}/{course.lessons?.length || 0}</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-2 mb-1">
                            <CheckCircle size={16} className="text-[#4a02d5] dark:text-[#71f9a3]" />
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Status</span>
                          </div>
                          <p className={`text-lg font-bold ${
                            enrollment.isCompleted 
                              ? 'text-green-600 dark:text-green-400' 
                              : 'text-[#4a02d5] dark:text-[#71f9a3]'
                          }`}>
                            {enrollment.isCompleted ? 'Completed' : 'In Progress'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
           
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 md:p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  {/* Page Info */}
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Showing page{' '}
                    <span className="font-semibold text-[#192335] dark:text-[#fcfff2]">
                      {currentPage}
                    </span>{' '}
                    of{' '}
                    <span className="font-semibold text-[#192335] dark:text-[#fcfff2]">
                      {totalPages}
                    </span>
                  </div>

                  {/* Pagination Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPage((prev) => prev - 1)}
                      disabled={page <= 1}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 
                               text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700
                               hover:border-[#4a02d5] dark:hover:border-[#71f9a3]
                               disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent
                               transition-all duration-200 font-medium"
                    >
                      <ChevronLeft size={18} />
                      Previous
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }

                        if (pageNum > totalPages) return null;

                        return (
                          <button
                            key={pageNum}
                            onClick={() => setPage(pageNum)}
                            className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-all duration-200 cursor-pointer ${
                              currentPage === pageNum
                                ? "bg-gradient-to-r from-[#4a02d5] to-[#71f9a3] text-white shadow-lg"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => setPage((prev) => prev + 1)}
                      disabled={page >= totalPages}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 
                               text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700
                               hover:border-[#4a02d5] dark:hover:border-[#71f9a3]
                               disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent
                               transition-all duration-200 font-medium cursor-pointer"
                    >
                      Next
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
        
          </>
        )}
      </div>
    </div>
  );
};

export default MyCourses;