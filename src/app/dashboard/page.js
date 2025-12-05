'use client'
import MyCourses from '@/components/Layout/Dashboard/Student/StudentEnrolledCourse/MyCourses';
import useAuth from '@/hooks/AuthHooks/useAuth';
import React from 'react';

const DashboardHome = () => {
    const {userRole}=useAuth()
    console.log(userRole ,'her eis user role herehr');
    return (
        <div>
            <h2>Dashboard Home</h2>
            {
                userRole === 'student' && <div>

                    <MyCourses/>
                </div>
            }
          
        </div>
    );
};

export default DashboardHome;