'use client';
import React from 'react';
import { Trash2, Edit3 } from 'lucide-react';
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
            {course.isFree ? 'FREE' : `৳${course.price}`}
          </span>
        </div>

        {/* Lessons Count Badge */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm 
                         rounded-full text-sm font-medium text-[#192335] dark:text-[#fcfff2] shadow-lg">
            {course.lessons?.length || 0} Lessons
          </span>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6">
        {/* Category Tag */}
        <div className="mb-3">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium 
                         bg-[#4a02d5]/10 dark:bg-[#4a02d5]/20 text-[#4a02d5] dark:text-[#71f9a3]">
            {course.category}
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

        {/* Course Details Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {/* Instructor */}
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">Instructor</span>
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
            <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">Students</span>
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
                       transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
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
                       transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
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