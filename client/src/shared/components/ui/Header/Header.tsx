import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { Link } from 'react-router-dom';

import { getEnvs } from '@/shared/utils';
import { useAuthStore } from '@/store/auth';
import { useCartStore } from '@/store/cart';
import { DarkModeToggle, MobileNavbar, ProductSearcher } from './components';

const { VITE_API_URL } = getEnvs();

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const isAuth = useAuthStore(s => s.isAuth);
  const isAdmin = useAuthStore(s => s.isAdmin);
  const logout = useAuthStore(s => s.logout);
  const cart = useCartStore(s => s.cart);

  ///* handlers
  const onLogout = () => {
    logout();
  };

  const classNames = (...classes: any) => {
    return classes.filter(Boolean).join(' ');
  };

  return (
    <Disclosure as="nav" className="bg-grey dark:bg-gray-800">
      {/* open is passed by Disclosure */}
      {({ open }) => (
        <>
          {/* ========== Desktop Navbar ========== */}
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {/* ====== Haburber btn for mobile navbar ====== */}
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:text-gray-900 dark:text-slate-200 dark:hover:text-slate-50">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              {/* ====== start and middle menu ====== */}
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                {/* --- Logo --- */}
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/">
                    <img
                      className="hidden h-8 w-auto lg:block"
                      src="/logo.png"
                      alt="Logo"
                    />
                  </Link>
                </div>

                {/* --- NavItems --- */}
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {isAuth ? (
                      // Authenticated NavItems
                      <>
                        <Link
                          to={'/'}
                          className="bg-slate-400 p-2 px-4 rounded-lg text-black dark:bg-gray-900 dark:text-white"
                        >
                          Home
                        </Link>

                        <Link
                          to={'/categories'}
                          className="text-black p-2 px-4 rounded-lg hover:bg-slate-400 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                          Categories
                        </Link>
                      </>
                    ) : (
                      <>
                        {/* Not Auth NavItems */}
                        <Link
                          to={'/auth/login'}
                          className="bg-slate-400 p-2 px-4 rounded-lg text-black dark:bg-gray-900 dark:text-white"
                        >
                          Log in
                        </Link>

                        <Link
                          to={'/auth/register'}
                          className="text-black p-2 px-4 rounded-lg hover:bg-slate-400 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                          Sign up
                        </Link>
                      </>
                    )}

                    {isAuth && isAdmin && (
                      <Link
                        to={'/admin'}
                        className="text-black p-2 px-4 rounded-lg hover:bg-slate-400 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        Admin Panel
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* ====== Searcher ====== */}
              <div className="relative hidden md:block">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Search icon</span>
                </div>

                {/* --- input searcher --- */}
                <ProductSearcher />
                {/* <input
                  type="text"
                  // onChange={handleInputChange}
                  className="block w-full md:w-[200px] lg:w-[400px] xl:w-[600px] p-2
                  pl-10 text-sm text-gray-900 border border-gray-300 rounded-full 
                  bg-gray-50 dark:bg-gray-700 outline-none
                  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                  "
                  placeholder="Search..."
                /> */}
              </div>

              {/* ====== end nav ====== */}
              <div className="absolute space-x-2 inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* --- Toggle Dark Mode --- */}
                <DarkModeToggle />

                {/* ------ Cart ------ */}
                <Link
                  to={'/cart'}
                  className="text-slate-900 hover:text-black dark:text-slate-200 dark:hover:text-white"
                >
                  <HiOutlineShoppingBag size={23} />
                </Link>
                <span className="text-slate-900 dark:text-slate-200">
                  {cart.length}
                </span>

                {/* ------ User Menu ------ */}
                {isAuth && (
                  <Menu as="div" className="relative ml-2">
                    {/* --- user menu btn --- */}
                    <Menu.Button className="flex rounded-full ml-8 text-sm focus:outline-none ">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full object-cover"
                        // src={`${VITE_API_URL}/${'avatar'}`}
                        src="/avatar-1.jpeg"
                        alt="avatar"
                      />
                    </Menu.Button>

                    {/* --- MenubarContent --- */}
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      {/* profile */}
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right bg-white dark:bg-slate-950 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/profile"
                              className={classNames(
                                active ? 'bg-gray-100 dark:bg-slate-700' : '',
                                'block px-4 py-2 text-sm text-gray-700 dark:text-slate-200'
                              )}
                            >
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item>

                        {/* logout */}
                        <Menu.Item>
                          {({ active }) => (
                            <span
                              onClick={onLogout}
                              className={classNames(
                                active ? 'bg-gray-100 dark:bg-slate-700' : '',
                                'block px-4 py-2 text-sm text-gray-700 cursor-pointer dark:text-slate-200'
                              )}
                            >
                              Sign out
                            </span>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )}
              </div>
            </div>
          </div>

          {/* ========== Mobile Navbar ========== */}
          <MobileNavbar isAuth={isAuth} isAdmin={isAdmin} />
        </>
      )}
    </Disclosure>
  );
};

export default Header;
