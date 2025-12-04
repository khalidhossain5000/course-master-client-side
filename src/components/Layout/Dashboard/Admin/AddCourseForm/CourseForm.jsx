/* eslint-disable react-hooks/incompatible-library */
"use client";
import { useForm, useFieldArray } from "react-hook-form";
import ImageUpload from "@/components/Shared/HandleImageUpload/ImageUploader";
import {
  LuPlus,
  LuTrash2,
  LuVideo,
  LuBookOpen,
  LuUser,
  LuDollarSign,
  LuTag,
  LuCheck,
  LuCalendar,
  LuChevronDown,
} from "react-icons/lu";
import { FiUpload } from "react-icons/fi";
import useAxiosSecure from "@/hooks/AxiosSecureHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const CourseForm = ({ instructors }) => {
  const axiosSecure=useAxiosSecure()
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      isFree: false,
      price: "",
      instructor: "",
      category: "",
      batchName: "",
      lessons: [{ title: "", videoUrl: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "lessons",
  });

  const isFree = watch("isFree");

  // Categories for dropdown
  const categories = [
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Machine Learning",
    "UI/UX Design",
    "Digital Marketing",
  ];

  const onSubmit = (data) => {
    console.log("FORM SUBMITTED:", data);
    axiosSecure.post('/api/courses/create',data)
    .then((res)=>{
      console.log(res,'this is res');
      alert("course created")
    })
    .catch((error)=>{
      console.log(error)
      alert('course error occured')
    })
  };


  //fetching instrucotrs data
   const { data: allInstructors = [], isLoading } = useQuery({
    queryKey: ["allInstructors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/instructors");
      return res.data.data;
    },
  });

  if(isLoading) return <p>instrucotrs loadinggggggggg........</p>


  return (
    <div className="min-h-screen bg-[#fcfff2] dark:bg-[#192335] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Card 1: Course Details */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-[#4a02d5]/10 dark:bg-[#4a02d5]/20">
                <LuBookOpen className="w-6 h-6 text-[#4a02d5] dark:text-[#71f9a3]" />
              </div>
              <h2 className="text-xl font-semibold text-[#192335] dark:text-[#fcfff2]">
                Course Details
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* TITLE */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Course Title *
                  </label>
                  <div className="relative">
                    <input
                      {...register("title", {
                        required: "Course title is required",
                      })}
                      className="w-full px-4 py-3 pl-11 rounded-xl border border-gray-300 dark:border-gray-600 
                               bg-white dark:bg-gray-700 
                               text-[#192335] dark:text-[#fcfff2]
                               focus:outline-none focus:border-[#4a02d5] focus:shadow-[0_0_0_3px_rgba(74,2,213,0.1)]
                               dark:focus:border-[#71f9a3] dark:focus:shadow-[0_0_0_3px_rgba(113,249,163,0.2)]
                               transition-all duration-200"
                      placeholder="Advanced React Masterclass"
                    />
                    <LuBookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                {/* CATEGORY DROPDOWN */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category *
                  </label>
                  <div className="relative">
                    <select
                      {...register("category", {
                        required: "Category is required",
                      })}
                      className="w-full px-4 py-3 pl-11 rounded-xl border border-gray-300 dark:border-gray-600 
                               bg-white dark:bg-gray-700 
                               text-[#192335] dark:text-[#fcfff2]
                               focus:outline-none focus:border-[#4a02d5] focus:shadow-[0_0_0_3px_rgba(74,2,213,0.1)]
                               dark:focus:border-[#71f9a3] dark:focus:shadow-[0_0_0_3px_rgba(113,249,163,0.2)]
                               appearance-none cursor-pointer transition-all duration-200"
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    <LuTag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <LuChevronDown className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                {/* BATCH NAME */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Batch Name
                  </label>
                  <div className="relative">
                    <input
                      {...register("batchName")}
                      className="w-full px-4 py-3 pl-11 rounded-xl border border-gray-300 dark:border-gray-600 
                               bg-white dark:bg-gray-700 
                               text-[#192335] dark:text-[#fcfff2]
                               focus:outline-none focus:border-[#4a02d5] focus:shadow-[0_0_0_3px_rgba(74,2,213,0.1)]
                               dark:focus:border-[#71f9a3] dark:focus:shadow-[0_0_0_3px_rgba(113,249,163,0.2)]
                               transition-all duration-200"
                      placeholder="e.g., Batch 1 - January 2024"
                    />
                    <LuCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* IMAGE UPLOAD */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Course Thumbnail *
                  </label>
                  <div className="mt-1">
                    <ImageUpload
                      onUpload={(url) => setValue("thumbnail", url)}
                      imageUrl={watch("thumbnail")}
                    />
                  </div>
                </div>

                {/* INSTRUCTOR DROPDOWN */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Instructor *
                  </label>
                  <div className="relative">
                    <select
                      {...register("instructor", {
                        required: "Instructor is required",
                      })}
                      className="w-full px-4 py-3 pl-11 rounded-xl border border-gray-300 dark:border-gray-600 
                               bg-white dark:bg-gray-700 
                               text-[#192335] dark:text-[#fcfff2]
                               focus:outline-none focus:border-[#4a02d5] focus:shadow-[0_0_0_3px_rgba(74,2,213,0.1)]
                               dark:focus:border-[#71f9a3] dark:focus:shadow-[0_0_0_3px_rgba(113,249,163,0.2)]
                               appearance-none cursor-pointer transition-all duration-200"
                    >
                      <option value="">Select Instructor</option>
                      {allInstructors?.map((ins) => (
                        <option key={ins._id} value={ins._id}>
                          {ins.name}

                        </option>

                      ))}
                      <option value="hh">heloh</option>
                    </select>
                    <LuUser className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <LuChevronDown className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  {errors.instructor && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.instructor.message}
                    </p>
                  )}
                </div>

                {/* PRICE & FREE TOGGLE */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Pricing
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Free Course
                      </span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          {...register("isFree")}
                          className="sr-only peer"
                        />
                        <div
                          className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer 
                                      peer-checked:after:translate-x-full peer-checked:after:border-white 
                                      after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                                      after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all
                                      peer-checked:bg-[#4a02d5]"
                        ></div>
                      </label>
                    </div>
                  </div>

                  {!isFree && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Price (BDT) *
                      </label>
                      <div className="relative">
                        <input
                          {...register("price", {
                            required:
                              !isFree && "Price is required for paid courses",
                            min: {
                              value: 0,
                              message: "Price must be positive",
                            },
                          })}
                          type="number"
                          className="w-full px-4 py-3 pl-11 rounded-xl border border-gray-300 dark:border-gray-600 
                                   bg-white dark:bg-gray-700 
                                   text-[#192335] dark:text-[#fcfff2]
                                   focus:outline-none focus:border-[#4a02d5] focus:shadow-[0_0_0_3px_rgba(74,2,213,0.1)]
                                   dark:focus:border-[#71f9a3] dark:focus:shadow-[0_0_0_3px_rgba(113,249,163,0.2)]
                                   transition-all duration-200"
                          placeholder="1999"
                        />
                        <LuDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                      {errors.price && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.price.message}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* DESCRIPTION - Full Width */}
            <div className="mt-6">
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
                placeholder="Describe what students will learn in this course..."
              ></textarea>
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          {/* Card 2: Lessons */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#4a02d5]/10 dark:bg-[#4a02d5]/20">
                  <LuVideo className="w-6 h-6 text-[#4a02d5] dark:text-[#71f9a3]" />
                </div>
                <h2 className="text-xl font-semibold text-[#192335] dark:text-[#fcfff2]">
                  Course Lessons
                </h2>
              </div>
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm">
                {fields.length} {fields.length === 1 ? "Lesson" : "Lessons"}
              </span>
            </div>

            <div className="space-y-4">
              {fields.map((item, index) => (
                <div
                  key={item.id}
                  className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 
                           bg-gray-50 dark:bg-gray-900 transition-all duration-200 hover:border-[#4a02d5]/30"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div
                      className="flex-shrink-0 w-8 h-8 flex items-center justify-center 
                                  rounded-full bg-[#4a02d5] text-white text-sm font-semibold"
                    >
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Lesson Title *
                          </label>
                          <input
                            {...register(`lessons.${index}.title`, {
                              required: "Lesson title is required",
                            })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                                     bg-white dark:bg-gray-700 
                                     text-[#192335] dark:text-[#fcfff2]
                                     focus:outline-none focus:border-[#4a02d5] focus:shadow-[0_0_0_3px_rgba(74,2,213,0.1)]
                                     dark:focus:border-[#71f9a3] dark:focus:shadow-[0_0_0_3px_rgba(113,249,163,0.2)]
                                     transition-all duration-200"
                            placeholder="Introduction to React"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Video URL *
                          </label>
                          <input
                            {...register(`lessons.${index}.videoUrl`, {
                              required: "Video URL is required",
                            })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                                     bg-white dark:bg-gray-700 
                                     text-[#192335] dark:text-[#fcfff2]
                                     focus:outline-none focus:border-[#4a02d5] focus:shadow-[0_0_0_3px_rgba(74,2,213,0.1)]
                                     dark:focus:border-[#71f9a3] dark:focus:shadow-[0_0_0_3px_rgba(113,249,163,0.2)]
                                     transition-all duration-200"
                            placeholder="https://example.com/video"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* REMOVE BUTTON */}
                  {fields.length > 1 && (
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="flex items-center gap-2 px-4 py-2 text-sm 
                                 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300
                                 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <LuTrash2 className="w-4 h-4" />
                        Remove Lesson
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* ADD NEW LESSON BUTTON */}
            <button
              type="button"
              onClick={() => append({ title: "", videoUrl: "" })}
              className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 
                       border-2 border-dashed border-gray-300 dark:border-gray-600 
                       rounded-xl hover:border-[#4a02d5] hover:bg-[#4a02d5]/5
                       dark:hover:border-[#71f9a3] dark:hover:bg-[#71f9a3]/5
                       text-gray-600 dark:text-gray-400 hover:text-[#4a02d5] 
                       dark:hover:text-[#71f9a3] transition-all duration-200"
            >
              <LuPlus className="w-5 h-5" />
              Add New Lesson
            </button>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              className="px-8 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                       text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700
                       hover:border-[#4a02d5] dark:hover:border-[#71f9a3]
                       transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#4a02d5] to-[#71f9a3]
                       text-white font-semibold hover:opacity-90 
                       transform hover:-translate-y-0.5 transition-all duration-200 
                       shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#4a02d5] focus:ring-offset-2 cursor-pointer"
            >
              <div className="flex items-center justify-center gap-2">
                <LuCheck className="w-5 h-5" />
                Create Course
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseForm;