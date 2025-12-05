import React from 'react';
import { 
  BookOpen, 
  Users, 
  FileText, 
  HelpCircle, 
  Eye,
  User,
  Calendar,
  Tag
} from 'lucide-react';

const AllCoursesSection = ({ course }) => {
    const {
        title,
        description,
        category,
        batchName,
        thumbnail,
        isFree,
        price,
        lessons,
        enrolledStudents,
        instructor,
        assignments,
        quizzes
    } = course;

    return (
        <div className="max-w-full w-full bg-[#fcfff2] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:bg-[#192335] dark:border-gray-800">
            {/* Thumbnail Section */}
            <div className="relative overflow-hidden">
                <img 
                    src={thumbnail} 
                    alt={title}
                    className="w-full h-56 object-cover transform hover:scale-105 transition-transform duration-500"
                />
                
                {/* Premium Badge */}
                {!isFree && (
                    <div className="absolute top-4 right-4">
                        <span className="bg-gradient-to-r from-[#4a02d5] to-purple-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2">
                            <Tag size={14} />
                            PREMIUM
                        </span>
                    </div>
                )}
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                    <span className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-[#192335] dark:text-[#fcfff2] px-3 py-1 rounded-lg text-xs font-medium shadow flex items-center gap-1">
                        <BookOpen size={12} />
                        {category}
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
                {/* Batch Info */}
                <div className="mb-3 flex items-center gap-2">
                    <Calendar size={16} className="text-[#4a02d5] dark:text-[#71f9a3]" />
                    <span className="text-[#4a02d5] dark:text-[#71f9a3] text-sm font-semibold tracking-wide">
                        {batchName}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#192335] dark:text-[#fcfff2] mb-3 line-clamp-2">
                    {title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 line-clamp-2">
                    {description}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    {/* Lessons */}
                    <div className="flex items-center bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg">
                        <div className="flex items-center justify-center w-10 h-10 bg-[#4a02d5]/10 dark:bg-[#71f9a3]/10 rounded-lg mr-3">
                            <BookOpen size={20} className="text-[#4a02d5] dark:text-[#71f9a3]" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-[#192335] dark:text-[#fcfff2]">{lessons.length}</p>
                            <p className="text-xs text-gray-500">Lessons</p>
                        </div>
                    </div>

                    {/* Enrolled Students */}
                    <div className="flex items-center bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg">
                        <div className="flex items-center justify-center w-10 h-10 bg-[#4a02d5]/10 dark:bg-[#71f9a3]/10 rounded-lg mr-3">
                            <Users size={20} className="text-[#4a02d5] dark:text-[#71f9a3]" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-[#192335] dark:text-[#fcfff2]">{enrolledStudents.length}</p>
                            <p className="text-xs text-gray-500">Enrolled</p>
                        </div>
                    </div>

                    {/* Assignments */}
                    <div className="flex items-center bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg">
                        <div className="flex items-center justify-center w-10 h-10 bg-[#4a02d5]/10 dark:bg-[#71f9a3]/10 rounded-lg mr-3">
                            <FileText size={20} className="text-[#4a02d5] dark:text-[#71f9a3]" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-[#192335] dark:text-[#fcfff2]">{assignments.length}</p>
                            <p className="text-xs text-gray-500">Assignments</p>
                        </div>
                    </div>

                    {/* Quizzes */}
                    <div className="flex items-center bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg">
                        <div className="flex items-center justify-center w-10 h-10 bg-[#4a02d5]/10 dark:bg-[#71f9a3]/10 rounded-lg mr-3">
                            <HelpCircle size={20} className="text-[#4a02d5] dark:text-[#71f9a3]" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-[#192335] dark:text-[#fcfff2]">{quizzes.length}</p>
                            <p className="text-xs text-gray-500">Quizzes</p>
                        </div>
                    </div>
                </div>

                {/* Price & Instructor Row */}
                <div className="flex items-center justify-between mb-6 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                    {/* Price */}
                    <div className="text-center">
                        {isFree ? (
                            <div>
                                <span className="text-2xl font-bold text-green-600">FREE</span>
                                <div className="text-xs text-gray-500 mt-1">Lifetime Access</div>
                            </div>
                        ) : (
                            <div>
                                <span className="text-2xl font-bold text-[#192335] dark:text-[#fcfff2]">₹{price}</span>
                                <div className="text-xs text-gray-500 mt-1">one-time payment</div>
                            </div>
                        )}
                    </div>

                    {/* Divider */}
                    <div className="w-px h-8 bg-gray-300 dark:bg-gray-700"></div>

                    {/* Instructor Info */}
                    <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#4a02d5] to-purple-500 rounded-full flex items-center justify-center mr-3">
                            <User size={20} className="text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-[#192335] dark:text-gray-200">Instructor</p>
                            <p className="text-xs text-gray-500 truncate max-w-[120px]">
                                {instructor || 'Unknown Instructor'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Buttons Section */}
                <div className="flex space-x-3">
                    {/* View Course Button - Always Visible */}
                    <button className="flex-1 bg-transparent border-2 border-[#4a02d5] dark:border-[#71f9a3] text-[#4a02d5] dark:text-[#71f9a3] py-3 rounded-lg font-semibold hover:bg-[#4a02d5] dark:hover:bg-[#71f9a3] hover:text-[#fcfff2] dark:hover:text-[#192335] transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow hover:shadow-lg cursor-pointer flex items-center justify-center gap-2">
                        <Eye size={18} />
                        View Course
                    </button>
                    
                    {/* Enroll Now Button - Only for Premium */}
                    {!isFree && (
                        <button className="flex-1 bg-gradient-to-r from-[#4a02d5] to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-[#71f9a3] hover:to-emerald-400 hover:text-[#192335] transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl relative overflow-hidden group cursor-pointer">
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                <BookOpen size={18} />
                                Enroll Now
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#71f9a3] to-emerald-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        </button>
                    )}
                </div>
                
                {/* Course Status */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Calendar size={12} />
                            Updated:
                        </span>
                        <span className="text-xs font-medium text-[#4a02d5] dark:text-[#71f9a3]">
                            {new Date(course.updatedAt).toLocaleDateString('en-US', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                            })}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllCoursesSection;