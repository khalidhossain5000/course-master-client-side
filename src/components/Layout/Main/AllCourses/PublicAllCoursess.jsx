"use client";
import useAxiosSecure from "@/hooks/AxiosSecureHooks/useAxiosSecure";
import React from "react";
import AllCoursesSection from "../Home/AllCoursesSection/AllCoursesSection";
import { useQuery } from "@tanstack/react-query";

const PublicAllCoursess = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["all-courses"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/courses`);
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

  const categories = [
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Machine Learning",
    "UI/UX Design",
    "Digital Marketing",
  ];
  const courses = data.data;
  return <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 container mx-auto px-3 py-24 xl:px-0">
    {courses.slice(0, 6).map((course) => (
      <AllCoursesSection key={course._id} course={course} />
    ))}
  </div>



  {/*  */}
  </div>;
};

export default PublicAllCoursess;
