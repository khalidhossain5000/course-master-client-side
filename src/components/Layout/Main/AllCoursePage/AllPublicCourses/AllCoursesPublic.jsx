"use client";

import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Search, Filter, X, Sparkles } from "lucide-react";
import useAxios from "@/hooks/AxiosApiCallHooks/useAxios";
import AllCourseCard from "../AllCourseCard/AllCourseCard";

const AllCoursesPublic = () => {
  const axiosInstance = useAxios();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Categories based on your courses
  const categories = [
    "Web Development",
    "Mobile Development", 
    "Data Science",
    "Machine Learning",
    "UI/UX Design",
    "Digital Marketing",
  ];

  // Sort options mapping
  const sortOptions = [
    { value: "", label: "Default" },
    { value: "price_low", label: "Price: Low to High" },
    { value: "price_high", label: "Price: High to Low" },
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
  ];

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1); // Reset to first page on search
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Build query parameters based on your API structure
  const buildQueryString = () => {
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('limit', limit);
    
    if (debouncedSearch) {
      params.append('search', debouncedSearch);
    }
    
    if (selectedCategory) {
      params.append('category', selectedCategory);
    }
    
    if (sortOption) {
      params.append('sort', sortOption);
    }
    
    return params.toString();
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["all-courses", page, limit, debouncedSearch, selectedCategory, sortOption],
    queryFn: async () => {
      const queryString = buildQueryString();
      const res = await axiosInstance.get(`/api/courses?${queryString}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSortOption("");
    setPage(1);
  };

  const hasActiveFilters = searchTerm || selectedCategory || sortOption;

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
          <p className="text-red-500 text-lg font-medium">
            Error fetching courses
          </p>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Please try again later
          </p>
        </div>
      </div>
    );
  }

  const courses = data.data || [];
  const totalPages = data.pagination?.totalPages || 1;
  const currentPage = data.pagination?.page || 1;
  const totalCourses = data.pagination?.total || 0;

  return (
    <div className="min-h-screen bg-[#fcfff2] dark:bg-[#192335] p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section with Search Bar */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#192335] dark:text-[#fcfff2] mb-2">
                Explore Courses
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Discover {totalCourses} courses to advance your career
              </p>
            </div>
            
            {/* Desktop Search Bar */}
            <div className="relative lg:w-1/3">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search courses by name or instructor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 
                         focus:outline-none focus:ring-2 focus:ring-[#4a02d5] focus:border-transparent
                         placeholder-gray-500 dark:placeholder-gray-400 shadow-sm"
              />
            </div>
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="lg:hidden flex items-center justify-center gap-2 px-4 py-3 w-full rounded-xl 
                     bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 
                     text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 
                     transition-all duration-200 font-medium mb-4"
          >
            <Filter size={20} />
            {isFilterOpen ? "Hide Filters" : "Show Filters & Sorting"}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar */}
          <div className={`lg:w-1/4 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 md:p-6 mb-6 lg:mb-0">
              {/* Filter Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#192335] dark:text-[#fcfff2] flex items-center gap-2">
                  <Filter size={20} />
                  Filters
                </h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-[#4a02d5] dark:text-[#71f9a3] hover:underline flex items-center gap-1"
                  >
                    <X size={16} />
                    Clear All
                  </button>
                )}
              </div>

              {/* Mobile Search Bar */}
              <div className="lg:hidden mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 
                             bg-transparent text-gray-700 dark:text-gray-300 
                             focus:outline-none focus:ring-2 focus:ring-[#4a02d5] focus:border-transparent
                             placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#192335] dark:text-[#fcfff2] mb-3">
                  Category
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setSelectedCategory("");
                      setPage(1);
                    }}
                    className={`w-full text-left px-4 py-2.5 rounded-lg transition-all duration-200 
                             ${!selectedCategory
                               ? "bg-gradient-to-r from-[#4a02d5] to-[#71f9a3] text-white"
                               : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                             }`}
                  >
                    All Categories
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setPage(1);
                      }}
                      className={`w-full text-left px-4 py-2.5 rounded-lg transition-all duration-200 
                               ${selectedCategory === category
                                 ? "bg-gradient-to-r from-[#4a02d5] to-[#71f9a3] text-white"
                                 : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                               }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sorting Options */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#192335] dark:text-[#fcfff2] mb-3">
                  Sort By
                </h3>
                <div className="space-y-2">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortOption(option.value);
                        setPage(1);
                      }}
                      className={`w-full text-left px-4 py-2.5 rounded-lg transition-all duration-200 
                               ${sortOption === option.value
                                 ? "bg-gradient-to-r from-[#4a02d5] to-[#71f9a3] text-white"
                                 : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                               }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Filters */}
              {hasActiveFilters && (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-[#192335] dark:text-[#fcfff2] mb-2">
                    Active Filters
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {searchTerm && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full 
                                     bg-gradient-to-r from-[#4a02d5]/10 to-[#71f9a3]/10 
                                     text-[#4a02d5] dark:text-[#71f9a3] text-sm">
                        Search: {searchTerm}
                        <button 
                          onClick={() => setSearchTerm("")}
                          className="hover:opacity-70"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    )}
                    {selectedCategory && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full 
                                     bg-gradient-to-r from-[#4a02d5]/10 to-[#71f9a3]/10 
                                     text-[#4a02d5] dark:text-[#71f9a3] text-sm">
                        Category: {selectedCategory}
                        <button 
                          onClick={() => setSelectedCategory("")}
                          className="hover:opacity-70"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    )}
                    {sortOption && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full 
                                     bg-gradient-to-r from-[#4a02d5]/10 to-[#71f9a3]/10 
                                     text-[#4a02d5] dark:text-[#71f9a3] text-sm">
                        {sortOptions.find(o => o.value === sortOption)?.label}
                        <button 
                          onClick={() => setSortOption("")}
                          className="hover:opacity-70"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:w-3/4">
            {/* Results Summary with Top Pagination */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 md:p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-[#192335] dark:text-[#fcfff2] mb-1">
                    Available Courses
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Found {totalCourses} course{totalCourses !== 1 ? 's' : ''}
                    {hasActiveFilters && ' matching your criteria'}
                  </p>
                </div>
                
                {/* Top Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center gap-2">
                    <div className="hidden sm:flex items-center gap-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Page {currentPage} of {totalPages}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
                      <button
                        onClick={() => setPage((old) => Math.max(old - 1, 1))}
                        disabled={page === 1}
                        className="p-2 rounded-lg hover:bg-white dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                      >
                        <ChevronLeft size={18} className="text-gray-700 dark:text-gray-300" />
                      </button>
                      
                      <div className="flex items-center gap-1 px-2">
                        <span className="text-sm font-medium text-[#4a02d5] dark:text-[#71f9a3]">
                          {currentPage}
                        </span>
                        <span className="text-gray-400">/</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {totalPages}
                        </span>
                      </div>
                      
                      <button
                        onClick={() => setPage((old) => Math.min(old + 1, totalPages))}
                        disabled={page === totalPages}
                        className="p-2 rounded-lg hover:bg-white dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                      >
                        <ChevronRight size={18} className="text-gray-700 dark:text-gray-300" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Items Per Page Selector */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <Sparkles className="text-[#4a02d5] dark:text-[#71f9a3]" size={18} />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Showing {(currentPage - 1) * limit + 1} to {Math.min(currentPage * limit, totalCourses)} of {totalCourses} courses
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                    Courses per page:
                  </span>
                  <select
                    value={limit}
                    onChange={(e) => {
                      setLimit(Number(e.target.value));
                      setPage(1);
                    }}
                    className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 
                             bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 
                             focus:outline-none focus:ring-2 focus:ring-[#4a02d5] focus:border-transparent
                             transition-all duration-200 cursor-pointer"
                  >
                    {[5, 10, 15, 20, 25].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Courses Grid */}
            {courses.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {courses.map((course) => (
                  <AllCourseCard key={course?._id} course={course} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                <div className="h-20 w-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#4a02d5]/10 to-[#71f9a3]/10 
                              flex items-center justify-center">
                  <Search className="text-[#4a02d5] dark:text-[#71f9a3]" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-[#192335] dark:text-[#fcfff2] mb-3">
                  No courses found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                  {hasActiveFilters 
                    ? "Try adjusting your filters or search term to find what you're looking for."
                    : "No courses are currently available. Please check back later."
                  }
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#4a02d5] to-[#71f9a3] 
                             text-white font-medium hover:opacity-90 transition-all duration-200
                             shadow-lg hover:shadow-xl"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            )}

            {/* Bottom Pagination */}
            {courses.length > 0 && totalPages > 1 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 md:p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  {/* Page Info */}
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Showing{" "}
                    <span className="font-semibold text-[#192335] dark:text-[#fcfff2]">
                      {(currentPage - 1) * limit + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-semibold text-[#192335] dark:text-[#fcfff2]">
                      {Math.min(currentPage * limit, totalCourses)}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-[#192335] dark:text-[#fcfff2]">
                      {totalCourses}
                    </span>{" "}
                    courses
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
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
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
                               transition-all duration-200 font-medium cursor-pointer"
                    >
                      Next
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCoursesPublic;