'use client';
import React from 'react'
import { toast } from 'sonner'
import Cookies from 'js-cookie';

function ToastProvider() {
  
  const toastData = Cookies.get('n_toast');

  React.useEffect(()=>{
    

    if (toastData) {
      
      try {
        const { description, type } = JSON.parse(toastData);
        if ( description && type) {
          switch (type) {
            case 'success':
              toast.success( description );
              break;
            case 'error':
              toast.error( description );
              break;
            case 'info':
              toast.info( description );
              break;
            case 'warning':
              toast.warning( description );
              break;
            default:
              toast.info( description );
          }
        }
      } catch {
        toast.error('There was an error processing the toast notification.');
      }

      Cookies.remove('n_toast');
    }
  }, [toastData]);

  return null;
}

export default ToastProvider