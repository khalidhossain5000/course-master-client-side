import CourseDetails from '@/components/Layout/Main/CourseDetails/CourseDetails';
import React, { use } from 'react';

const CourseDetailsPage = ({params}) => {
     const {id}=use(params)
    return (
        <div>
            <CourseDetails courseId={id}/>
        </div>
    );
};

export default CourseDetailsPage;