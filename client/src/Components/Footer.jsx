import React from "react";

const Footer = () => {
  return (
    <footer className="text-gray-600 body-font">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <span className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
          <span className="w-10 h-10 text-white p-2 bg-yellow-500 rounded-full inline-flex items-center justify-center">
            IMS
          </span>
          <span className="ml-3 text-xl">MR Shop</span>
        </span>
        <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
          © 2026 MR Tech <span className="text-gray-600 ml-1">@Mashod Rana</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
