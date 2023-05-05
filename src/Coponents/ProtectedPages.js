import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { GetCurrentUser } from '../apicalls/userApi';

const useGetCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await GetCurrentUser();
        if (response.success) {
          message.success(response.message);
          setCurrentUser(response.data);
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        message.error(error.message);
      }
    };

    getCurrentUser();
  }, []);

  return currentUser;
};

const ProtectedPages = ({ children }) => {
  const currentUser = useGetCurrentUser();

  return (
    <div>
      {currentUser && <h1>Welcome{currentUser?.name}</h1>}
      {children}
    </div>
  );
};

export default ProtectedPages;
