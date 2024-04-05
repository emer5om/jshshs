// useRouter.js
import Router from 'next/router';
import { logout } from "@/events/actions";

const useRouterWithInterceptor = () => {


  const handleLogout = () => {
    // Perform logout logic here
    logout()
    Router.push('/');
  };

  return {  handleLogout };
};

export default useRouterWithInterceptor;