"use client";

import useAxiosSecure from "@/hooks/AxiosSecureHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { LuBookOpen, LuCheck } from "react-icons/lu";

const AddAssignmentForm = () => {
  const axiosSecure = useAxiosSecure();

  // fetching courses data
  const { data: dropdownCourse = [], isLoading } = useQuery({
    queryKey: ["course-title-id-for-dropwon"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/courses/course-dropdown");
      return res.data.data;
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const selectedCourse = dropdownCourse.find(
      (course) => course._id === data.courseId
    );
    const assignmentData = {
      ...data,
      courseName: selectedCourse?.title,
    };
    console.log(assignmentData, "this is assignment data here");
    try {
      const res = await axiosSecure.post(
        "/api/assignments/create-assignment",
        assignmentData
      );
      if (res.data.success) {
        Swal.fire("Success", "Assignment created successfully", "success");
        reset();
      }
    } catch (err) {
      console.log(err);
      Swal.fire(
        "Error",
        err.response?.data?.message || "Something went wrong",
        "error"
      );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fcfff2] dark:bg-[#192335] py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <p className="text-center mt-4 text-gray-600 dark:text-gray-300">
              Loading courses...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfff2] dark:bg-[#192335] py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#192335] dark:text-[#fcfff2] mb-2">
            Add New Assignment
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Create assignments for your students
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Form Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-[#4a02d5]/10 dark:bg-[#4a02d5]/20">
                <LuBookOpen className="w-6 h-6 text-[#4a02d5] dark:text-[#71f9a3]" />
              </div>
              <h2 className="text-xl font-semibold text-[#192335] dark:text-[#fcfff2]">
                Assignment Details
              </h2>
            </div>

            <div className="space-y-6">
              {/* TITLE */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Assignment Title *
                </label>
                <input
                  {...register("title", { required: "Title is required" })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                                             bg-white dark:bg-gray-700 
                                             text-[#192335] dark:text-[#fcfff2]
                                             focus:outline-none focus:border-[#4a02d5] focus:shadow-[0_0_0_3px_rgba(74,2,213,0.1)]
                                             dark:focus:border-[#71f9a3] dark:focus:shadow-[0_0_0_3px_rgba(113,249,163,0.2)]
                                             transition-all duration-200"
                  placeholder="Enter assignment title"
                />
                {errors.title && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>
              {/* Total Marks */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Total Marks *
                </label>
                <input
                  type="number"
                  {...register("totalMarks", {
                    required: "Total marks are required",
                    min: 1,
                  })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                 bg-white dark:bg-gray-700 
                 text-[#192335] dark:text-[#fcfff2]
                 focus:outline-none focus:border-[#4a02d5] focus:shadow-[0_0_0_3px_rgba(74,2,213,0.1)]
                 dark:focus:border-[#71f9a3] dark:focus:shadow-[0_0_0_3px_rgba(113,249,163,0.2)]
                 transition-all duration-200"
                  placeholder="Enter total marks"
                />
                {errors.totalMarks && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.totalMarks.message}
                  </p>
                )}
              </div>
              {/* DESCRIPTION */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                  })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                                             bg-white dark:bg-gray-700 
                                             text-[#192335] dark:text-[#fcfff2]
                                             focus:outline-none focus:border-[#4a02d5] focus:shadow-[0_0_0_3px_rgba(74,2,213,0.1)]
                                             dark:focus:border-[#71f9a3] dark:focus:shadow-[0_0_0_3px_rgba(113,249,163,0.2)]
                                             transition-all duration-200"
                  rows={4}
                  placeholder="Enter assignment description and requirements..."
                />
                {errors.description && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* COURSE DROPDOWN */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Course *
                </label>
                <select
                  {...register("courseId", { required: "Course is required" })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                                             bg-white dark:bg-gray-700 
                                             text-[#192335] dark:text-[#fcfff2]
                                             focus:outline-none focus:border-[#4a02d5] focus:shadow-[0_0_0_3px_rgba(74,2,213,0.1)]
                                             dark:focus:border-[#71f9a3] dark:focus:shadow-[0_0_0_3px_rgba(113,249,163,0.2)]
                                             appearance-none cursor-pointer transition-all duration-200"
                >
                  <option value="">Select Course</option>
                  {dropdownCourse.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.title}
                    </option>
                  ))}
                </select>
                {errors.courseId && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.courseId.message}
                  </p>
                )}
              </div>

              {/* DUE DATE */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Due Date *
                </label>
                <input
                  type="date"
                  {...register("dueDate", { required: "Due date is required" })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                                             bg-white dark:bg-gray-700 
                                             text-[#192335] dark:text-[#fcfff2]
                                             focus:outline-none focus:border-[#4a02d5] focus:shadow-[0_0_0_3px_rgba(74,2,213,0.1)]
                                             dark:focus:border-[#71f9a3] dark:focus:shadow-[0_0_0_3px_rgba(113,249,163,0.2)]
                                             transition-all duration-200"
                />
                {errors.dueDate && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.dueDate.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={() => reset()}
              className="px-8 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                                     text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700
                                     hover:border-[#4a02d5] dark:hover:border-[#71f9a3]
                                     transition-all duration-200 font-medium"
            >
              Clear Form
            </button>
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#4a02d5] to-[#71f9a3]
                                     text-white font-semibold hover:opacity-90 
                                     transform hover:-translate-y-0.5 transition-all duration-200 
                                     shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#4a02d5] focus:ring-offset-2"
            >
              <div className="flex items-center justify-center gap-2">
                <LuCheck className="w-5 h-5" />
                Add Assignment
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAssignmentForm;
