import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-200">404</h1>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button 
            onClick={handleGoHome}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
          >
            Go Back Home
          </Button>
          
          <div className="text-sm text-gray-500">
            <p>Or try navigating using the sidebar menu</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 