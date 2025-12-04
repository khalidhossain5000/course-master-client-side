"use client";
import useAxiosSecure from "@/hooks/AxiosSecureHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import AllCoursesCard from "../AllCoursesCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Swal from "sweetalert2";

const AdminAllCourses = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading, isError,refetch } = useQuery({
    queryKey: ["all-courses", page, limit],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/courses?page=${page}&limit=${limit}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-[#fcfff2] dark:bg-[#192335] rounded-2xl">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-[#4a02d5] mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading courses...</p>
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
          <p className="text-red-500 text-lg font-medium">Error fetching courses</p>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Please try again later</p>
        </div>
      </div>
    );
  }

  const courses = data.data;
  const totalPages = data.pagination.totalPages;
  const currentPage = data.pagination.page;
  const totalCourses = data.pagination.total || 0;

  // Dummy handlers for edit/delete
  const handleEdit = (course) => console.log("Edit course:", course);
const handleDelete = async (id) => {
  try {
    // Confirmation using SweetAlert2
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      await axiosSecure.delete(`/api/courses/${id}`);

      // Refetch to update the UI instantly
      refetch();

      // Success alert
      Swal.fire(
        'Deleted!',
        'The course has been deleted.',
        'success'
      );
    }
  } catch (err) {
    console.error("Failed to delete course:", err);
    Swal.fire(
      'Error!',
      'Failed to delete the course.',
      'error'
    );
  }
};

  return (
    <div className="min-h-screen bg-[#fcfff2] dark:bg-[#192335] p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#192335] dark:text-[#fcfff2] mb-2">
            All Courses
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage and overview of all courses in the system
          </p>
          
          {/* Stats Card */}
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Courses</p>
                <p className="text-2xl font-bold text-[#192335] dark:text-[#fcfff2]">{totalCourses}</p>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
                <p className="text-sm text-gray-600 dark:text-gray-400">Current Page</p>
                <p className="text-2xl font-bold text-[#192335] dark:text-[#fcfff2]">{currentPage}</p>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
                <p className="text-sm text-gray-600 dark:text-gray-400">Items Per Page</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-[#192335] dark:text-[#fcfff2]">{limit}</p>
                  <select
                    value={limit}
                    onChange={(e) => setLimit(Number(e.target.value))}
                    className="text-sm bg-transparent border-none text-gray-600 dark:text-gray-300 focus:outline-none"
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {courses.map((course) => (
            <AllCoursesCard
              key={course._id}
              course={course}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 md:p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Page Info */}
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing <span className="font-semibold text-[#192335] dark:text-[#fcfff2]">{(currentPage - 1) * limit + 1}</span> to{" "}
              <span className="font-semibold text-[#192335] dark:text-[#fcfff2]">{Math.min(currentPage * limit, totalCourses)}</span> of{" "}
              <span className="font-semibold text-[#192335] dark:text-[#fcfff2]">{totalCourses}</span> courses
            </div>

            {/* Pagination Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((old) => Math.max(old - 1, 1))}
                disabled={page === 1}
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
                      className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-all duration-200 ${
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
                onClick={() => setPage((old) => Math.min(old + 1, totalPages))}
                disabled={page === totalPages}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 
                         text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700
                         hover:border-[#4a02d5] dark:hover:border-[#71f9a3]
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent
                         transition-all duration-200 font-medium"
              >
                Next
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAllCourses;