/* eslint-disable @next/next/no-img-element */
"use client";
import { useForm } from "react-hook-form";
import ImageUpload from "@/components/Shared/HandleImageUpload/ImageUploader";
import {
  LuUser,
  LuBriefcase,
  LuFileText,
  LuCheck,
  LuUpload,
} from "react-icons/lu";
import useAxiosSecure from "@/hooks/AxiosSecureHooks/useAxiosSecure";

const AddInstructorForm = () => {
    const axiosSecure=useAxiosSecure()
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      designation: "",
      bio: "",
      profileImage: "",
    },
  });

  const onSubmit = (data) => {
    
    axiosSecure.post('/api/instructors/create',data)
    .then((res)=>{
        console.log(res);
        alert("instructor created")
    })
    .catch((err)=>{
        console.log(err);
        alert("error occured while instrucotr creating")
    })
    // Handle form submission here
  };

  return (
    <div className="min-h-screen bg-[#fcfff2] dark:bg-[#192335] py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#192335] dark:text-[#fcfff2] mb-2">
            Add New Instructor
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Fill in the details to add a new instructor to your platform
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Card: Instructor Details */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-[#4a02d5]/10 dark:bg-[#4a02d5]/20">
                <LuUser className="w-6 h-6 text-[#4a02d5] dark:text-[#71f9a3]" />
              </div>
              <h2 className="text-xl font-semibold text-[#192335] dark:text-[#fcfff2]">
                Instructor Information
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* NAME */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <input
                      {...register("name", {
                        required: "Instructor name is required",
                        minLength: {
                          value: 3,
                          message: "Name must be at least 3 characters",
                        },
                      })}
                      className="w-full px-4 py-3 pl-11 rounded-xl border border-gray-300 dark:border-gray-600 
                               bg-white dark:bg-gray-700 
                               text-[#192335] dark:text-[#fcfff2]
                               focus:outline-none focus:border-[#4a02d5] focus:shadow-[0_0_0_3px_rgba(74,2,213,0.1)]
                               dark:focus:border-[#71f9a3] dark:focus:shadow-[0_0_0_3px_rgba(113,249,163,0.2)]
                               transition-all duration-200"
                      placeholder="John Doe"
                    />
                    <LuUser className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* DESIGNATION */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Designation *
                  </label>
                  <div className="relative">
                    <input
                      {...register("designation", {
                        required: "Designation is required",
                        minLength: {
                          value: 3,
                          message: "Designation must be at least 3 characters",
                        },
                      })}
                      className="w-full px-4 py-3 pl-11 rounded-xl border border-gray-300 dark:border-gray-600 
                               bg-white dark:bg-gray-700 
                               text-[#192335] dark:text-[#fcfff2]
                               focus:outline-none focus:border-[#4a02d5] focus:shadow-[0_0_0_3px_rgba(74,2,213,0.1)]
                               dark:focus:border-[#71f9a3] dark:focus:shadow-[0_0_0_3px_rgba(113,249,163,0.2)]
                               transition-all duration-200"
                      placeholder="Senior Web Developer"
                    />
                    <LuBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  {errors.designation && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.designation.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column - Profile Image Upload */}
              <div className="space-y-6">
                {/* PROFILE IMAGE UPLOAD */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Profile Image *
                  </label>
                  <div className="mt-1">
                    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-900/50 hover:border-[#4a02d5] dark:hover:border-[#71f9a3] transition-colors duration-200">
                      <LuUpload className="w-12 h-12 text-gray-400 mb-3" />
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Upload instructor profile photo
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mb-4">
                        PNG, JPG, WEBP up to 5MB
                      </p>
                      <ImageUpload
                        onUpload={(url) => setValue("profileImage", url)}
                        imageUrl={watch("profileImage")}
                      />
                    </div>
                  </div>
                  {errors.profileImage && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.profileImage.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* BIO - Full Width */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Biography *
              </label>
              <div className="relative">
                <textarea
                  {...register("bio", {
                    required: "Biography is required",
                    minLength: {
                      value: 15,
                      message: "Biography must be at least 15 characters",
                    },
                    maxLength: {
                      value: 1000,
                      message: "Biography must not exceed 1000 characters",
                    },
                  })}
                  className="w-full px-4 py-3 pl-11 rounded-xl border border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-gray-700 
                           text-[#192335] dark:text-[#fcfff2]
                           focus:outline-none focus:border-[#4a02d5] focus:shadow-[0_0_0_3px_rgba(74,2,213,0.1)]
                           dark:focus:border-[#71f9a3] dark:focus:shadow-[0_0_0_3px_rgba(113,249,163,0.2)]
                           transition-all duration-200"
                  rows={6}
                  placeholder="Tell us about the instructor's experience, expertise, and background..."
                ></textarea>
                <LuFileText className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
                <div className="absolute right-3 bottom-3 text-xs text-gray-500 dark:text-gray-400">
                  {watch("bio")?.length || 0}/1000
                </div>
              </div>
              {errors.bio && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.bio.message}
                </p>
              )}
            </div>

            {/* Preview Section */}
            {watch("profileImage") && (
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Profile Preview
                </h3>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <img
                      src={watch("profileImage")}
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#192335] dark:text-[#fcfff2]">
                      {watch("name") || "Instructor Name"}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {watch("designation") || "Instructor Designation"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={() => {
                // Reset form or navigate back
                console.log("Cancelled");
              }}
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
                       shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#4a02d5] focus:ring-offset-2"
            >
              <div className="flex items-center justify-center gap-2">
                <LuCheck className="w-5 h-5" />
                Add Instructor
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInstructorForm;
