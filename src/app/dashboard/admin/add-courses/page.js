import CourseForm from '@/components/Layout/Dashboard/Admin/AddCourseForm/CourseForm';
import React from 'react';

const AddCourses = () => {
    return (
        <div>
              {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#192335] dark:text-[#fcfff2] mb-2">
            Create New Course
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Fill in the details to create your course
          </p>
        </div>
            <CourseForm/>
        </div>
    );
};

export default AddCourses;