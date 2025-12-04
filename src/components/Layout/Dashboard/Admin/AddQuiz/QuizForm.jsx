"use client";
import useAxiosSecure from '@/hooks/AxiosSecureHooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import Swal from 'sweetalert2';

const AddQuizForm = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch dropdown courses
  const { data: dropdownCourse = [], isLoading } = useQuery({
    queryKey: ["course-title-id-for-dropwon"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/courses/course-dropdown");
      return res.data.data;
    },
  });

  
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      title: "",
      description: "",
      dueDate: "",
      courseId: "",   // only courseId should exist
      questions: [
        { questionText: "", options: ["", ""], correctAnswer: "" }
      ]
    }
  });


  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions"
  });

  const onSubmit = async (data) => {

    const selectedCourse = dropdownCourse.find(
      (course) => course._id === data.courseId
    );

    const quizData = {
      ...data,
      courseName: selectedCourse?.title,
    };

    console.log("FINAL SUBMIT:", quizData);

    try {
      const res = await axiosSecure.post("/api/quizzes/create", quizData);
      console.log("Quiz created:", res.data);

      if(res.data){
        Swal.fire({
          title:'quiz added'
        })
      }
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fcfff2] dark:bg-[#192335] py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-[#4a02d5]"></div>
            </div>
            <p className="text-center mt-4 text-gray-600 dark:text-gray-300">Loading courses...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfff2] dark:bg-[#192335] py-8 px-4">
      <div className="max-w-2xl mx-auto">

        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#192335] dark:text-[#fcfff2] mb-2">
            Create New Quiz
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Set up quizzes for your students
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 space-y-6">

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Quiz Title *
              </label>
              <input
                type="text"
                {...register("title", { required: "Quiz title is required" })}
                className="w-full px-4 py-3 rounded-xl border"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>

            {/* Course */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Course *
              </label>

              {/* -------------------- FIXED NAME HERE -------------------- */}
              <select
                {...register("courseId", { required: "Course selection is required" })}
                className="w-full px-4 py-3 rounded-xl border"
              >
                <option value="">Select Course</option>
                {dropdownCourse.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.title}
                  </option>
                ))}
              </select>

              {errors.courseId && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.courseId.message}
                </p>
              )}
              {/* ----------------------------------------------------------- */}
            </div>

            {/* Due Date */}
            <div>
              <label className="block mb-2">Due Date *</label>
              <input
                type="date"
                {...register("dueDate", { required: "Due date is required" })}
                className="w-full px-4 py-3 rounded-xl border"
              />
              {errors.dueDate && <p className="text-red-500">{errors.dueDate.message}</p>}
            </div>

            {/* Questions */}
            <div>
              <h2 className="text-xl font-semibold mb-2">Questions</h2>

              {fields.map((field, index) => (
                <div key={field.id} className="border p-4 rounded-xl mb-4 space-y-2">

                  <input
                    type="text"
                    placeholder={`Question ${index + 1}`}
                    {...register(`questions.${index}.questionText`, { required: "Question text required" })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />

                  {Array(2).fill("").map((_, optIndex) => (
                    <input
                      key={optIndex}
                      type="text"
                      placeholder={`Option ${optIndex + 1}`}
                      {...register(`questions.${index}.options.${optIndex}`, { required: "Option required" })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  ))}

                  <input
                    type="text"
                    placeholder="Correct Answer"
                    {...register(`questions.${index}.correctAnswer`, { required: "Correct answer required" })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />

                  <button type="button" onClick={() => remove(index)} className="text-red-500 mt-2">
                    Remove Question
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => append({ questionText: "", options: ["", ""], correctAnswer: "" })}
                className="px-4 py-2 bg-[#4a02d5] text-white rounded-lg"
              >
                Add Question
              </button>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-4 pt-6">
            <button type="button" onClick={() => reset()} className="px-8 py-3 border rounded-xl">
              Clear Form
            </button>

            <button type="submit" className="px-8 py-3 bg-gradient-to-r from-[#4a02d5] to-[#71f9a3] text-white rounded-xl">
              Create Quiz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddQuizForm;
