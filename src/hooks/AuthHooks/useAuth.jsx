import { AuthContext } from '@/context/AuthProvider';
import React, { use } from 'react';

const useAuth = () => {
    const authInfo=use(AuthContext)
  
    return authInfo
};

export default useAuth;