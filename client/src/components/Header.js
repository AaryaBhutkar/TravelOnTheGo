import "./Header.css";
import { Fragment } from "react";
import Find from "./Find";
import travelonthego from '../images/logo_nav_white.png';
import { Link, useNavigate} from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import ToastContext from "./ToastContext";
import { useEffect, useRef, useState } from 'react';
import { useContext } from "react";
// import SideBar from "./SideBar";
// import DropDown from './ThedropDown'
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = (props) => {
    const {toast}=useContext(ToastContext);
    const navigate = useNavigate();
    // We're keeping the location reference for future use
    const [, ] = props.functions;
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user:detail')));
    const { setQuery, searchQuery } = props;
    const searchBarRef = useRef(null);
    const mobileSearchRef = useRef(null);

    // Handle clicks outside the search bars to close results
    useEffect(() => {
      const handleClickOutside = (event) => {
        // Desktop search bar
        if (searchBarRef.current && !searchBarRef.current.contains(event.target) && searchQuery) {
          setQuery('');
        }

        // Mobile search bar
        if (mobileSearchRef.current && !mobileSearchRef.current.contains(event.target) && searchQuery) {
          setQuery('');
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [searchQuery, setQuery]);

    const handleLogout = () => {
      setUser(null);
      localStorage.clear();
      toast.success("Logged out");
      navigate("/users/sign_in",{replace:true});
    };
  return (
    <div className="header">
      <div onClick={()=>{navigate('/'); console.log('Clicked')}} className="logo-container order-0">
      <img
        className="header__image"
         src={travelonthego}
        alt="TravelOnTheGo"
      />
      </div>

      <div ref={searchBarRef} className="ml-5 -mt-3 md:w-96 lg:w-[500px] xl:w-[600px] md:ml-0 hidden md:inline-flex items-center shadow-md rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 search-bar order-2 relative">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            className="w-full py-3 pl-10 pr-10 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent rounded-lg transition-all duration-200"
            id="search"
            type="text"
            placeholder="Search for restaurant"
            value={searchQuery}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
              aria-label="Clear search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        {searchQuery && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-20 overflow-hidden">
            <div className="max-h-96 overflow-y-auto">
              <Find searchQuery={searchQuery} />
            </div>
            {searchQuery.length > 0 && (
              <div className="p-2 bg-gray-50 border-t border-gray-100 text-center">
                <span className="text-xs text-gray-500">Press Enter to see all results</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Profile Dropdown */}
      <Menu as="div" className="lg:inline-flex hidden profile-dropdown order-3 ml-auto">
        {({ open }) => (
          <>
            <div>
              <Menu.Button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors duration-150">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Menu.Button>
            </div>

            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                static
                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20"
              >
                <div className="py-1">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email || 'user@example.com'}</p>
                  </div>



                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleLogout}
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'flex w-full px-4 py-2 text-sm'
                        )}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>

      {/* <div>
      <UserInfo/>
      </div> */}
      {/* Mobile Profile Button */}
      <Menu as="div" className="mobile-profile-dropdown">
        {({ open }) => (
          <>
            <div>
              <Menu.Button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors duration-150">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Menu.Button>
            </div>

            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                static
                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20"
              >
                <div className="py-1">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email || 'user@example.com'}</p>
                  </div>

                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleLogout}
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'flex w-full px-4 py-2 text-sm'
                        )}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>

      {/* Mobile Search Bar */}
      <div ref={mobileSearchRef} className="mobile-search-container">
        <div className="mobile-search-bar">
          <div className="mobile-search-icon">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search for restaurant"
            value={searchQuery}
            onChange={(e) => setQuery(e.target.value)}
            className="mobile-search-input"
          />
          {searchQuery && (
            <button
              onClick={() => setQuery('')}
              className="mobile-search-clear"
              aria-label="Clear search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Mobile Search Results */}
        {searchQuery && (
          <div className="mobile-search-results">
            <Find searchQuery={searchQuery} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;