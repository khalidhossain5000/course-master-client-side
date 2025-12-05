'use client';
import React from 'react';
import { Trash2, Edit3, FileText, ClipboardCheck, Users, Calendar } from 'lucide-react';
import Image from 'next/image';

const AllCoursesCard = ({ course, onDelete, onEdit }) => {
  return (
    <div className="bg-white dark:bg-[#1e2a47] rounded-2xl shadow-lg overflow-hidden 
                    hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700
                    group hover:-translate-y-1">
      
      {/* Thumbnail with Gradient Overlay */}
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={course.thumbnail || 'https://i.ibb.co/JFdJJ5F6/ndefault.jpg'}
          alt={course.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 
                        group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Price Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1.5 rounded-full text-sm font-semibold 
                          ${course.isFree 
                            ? 'bg-gradient-to-r from-[#71f9a3] to-emerald-400 text-gray-900' 
                            : 'bg-gradient-to-r from-[#4a02d5] to-purple-600 text-white'
                          } shadow-lg`}>
            {course.isFree ? 'FREE' : `৳${course.price.toLocaleString()}`}
          </span>
        </div>

        {/* Content Stats Badge */}
        <div className="absolute top-4 right-4 flex gap-2">
          {/* Lessons Badge */}
          <div className="px-3 py-1.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm 
                         rounded-full text-sm font-medium text-[#192335] dark:text-[#fcfff2] shadow-lg
                         flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            {course.lessons?.length || 0}
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6">
        {/* Category Tag */}
        <div className="mb-3 flex items-center justify-between">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium 
                         bg-[#4a02d5]/10 dark:bg-[#4a02d5]/20 text-[#4a02d5] dark:text-[#71f9a3]">
            {course.category}
          </span>
          
          {/* Updated Date */}
          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <Calendar size={12} />
            Updated: {new Date(course.updatedAt).toLocaleDateString()}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-[#192335] dark:text-[#fcfff2] mb-2 
                       line-clamp-2 group-hover:text-[#4a02d5] dark:group-hover:text-[#71f9a3] 
                       transition-colors duration-200">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {course.description || "No description available"}
        </p>

        {/* Content Stats */}
        <div className="mb-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
          <div className="grid grid-cols-3 gap-4">
            {/* Lessons */}
            <div className="text-center">
              <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 
                           flex items-center justify-center text-blue-600 dark:text-blue-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <p className="text-2xl font-bold text-[#192335] dark:text-[#fcfff2]">
                {course.lessons?.length || 0}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Lessons</p>
            </div>

            {/* Assignments */}
            <div className="text-center">
              <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-green-100 dark:bg-green-900/30 
                           flex items-center justify-center text-green-600 dark:text-green-400">
                <FileText size={20} />
              </div>
              <p className="text-2xl font-bold text-[#192335] dark:text-[#fcfff2]">
                {course.assignments?.length || 0}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Assignments</p>
            </div>

            {/* Quizzes */}
            <div className="text-center">
              <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 
                           flex items-center justify-center text-purple-600 dark:text-purple-400">
                <ClipboardCheck size={20} />
              </div>
              <p className="text-2xl font-bold text-[#192335] dark:text-[#fcfff2]">
                {course.quizzes?.length || 0}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Quizzes</p>
            </div>
          </div>
        </div>

        {/* Course Details Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {/* Instructor */}
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Instructor
            </span>
            <span className="text-sm font-medium text-[#192335] dark:text-gray-200 truncate">
              {course.instructor}
            </span>
          </div>

          {/* Batch */}
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">Batch</span>
            <span className="text-sm font-medium text-[#192335] dark:text-gray-200 truncate">
              {course.batchName || 'Not specified'}
            </span>
          </div>

          {/* Students */}
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1">
              <Users size={12} />
              Students
            </span>
            <span className="text-sm font-medium text-[#192335] dark:text-gray-200">
              {course.enrolledStudents?.length || 0}
            </span>
          </div>

          {/* Created Date */}
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">Created</span>
            <span className="text-sm font-medium text-[#192335] dark:text-gray-200">
              {new Date(course.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
          <button
            onClick={() => onEdit(course)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 
                       rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 
                       hover:from-blue-600 hover:to-blue-700 
                       text-white font-medium transition-all duration-200 
                       transform hover:-translate-y-0.5 shadow-md hover:shadow-lg cursor-pointer"
          >
            <Edit3 size={18} />
            Edit Course
          </button>
          
          <button
            onClick={() => onDelete(course._id)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 
                       rounded-xl bg-gradient-to-r from-red-500 to-red-600 
                       hover:from-red-600 hover:to-red-700 
                       text-white font-medium transition-all duration-200 
                       transform hover:-translate-y-0.5 shadow-md hover:shadow-lg cursor-pointer"
          >
            <Trash2 size={18} />
            Delete
          </button>
        </div>
      </div>

      {/* Hover Indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4a02d5] to-[#71f9a3] 
                      transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
    </div>
  );
};

export default AllCoursesCard;