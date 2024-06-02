'use client';

import React, { useState } from 'react';
import { Network, Blocks } from 'lucide-react';
import Image from 'next/image'

interface UserTabsProps {
  data: any;
  error: string | null;
}

const UserTabs: React.FC<UserTabsProps> = ({ data, error }) => {
  const [activeTab, setActiveTab] = useState('links');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full flex justify-center flex-col">
      <div className="flex flex-row justify-between w-full md:w-[20rem] px-8 space-x-2">
        <button
          className={`flex flex-row justify-center items-center rounded-lg font-medium py-2 w-[50%] transition-all duration-200 ${
            activeTab === 'links'
              ? 'bg-sky-400 text-white'
              : 'text-gray-700 dark:text-white bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
          onClick={() => handleTabClick('links')}
        >
          <Network className="h-4 w-4 mr-1" />
          Links
        </button>
        <button
          className={`dark:text-white flex flex-row justify-center items-center rounded-lg font-medium py-2 w-[50%] transition-all duration-200 ${
            activeTab === 'cards'
              ? 'bg-sky-400 text-white'
              : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
          onClick={() => handleTabClick('cards')}
        >
          <Blocks className="h-4 w-4 mr-1" />
          Cards
        </button>
      </div>

      {activeTab === 'links' && (
        <div className="w-full px-8 flex flex-col mt-10">
          <button className="text-white flex flex-row justify-center items-center bg-blue-500 rounded-full font-medium py-3 w-full transition-all duration-200 hover:bg-blue-600 my-2 shadow">
            Hello, World!
          </button>
        </div>
      )}

      {activeTab === 'cards' && (
        <div className="w-full px-6 flex flex-col mt-10">
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
          
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg dark:bg-gray-900 border-t-[0.3rem] border-sky-400 md:w-[27rem]">
      <Image src="https://v0.dev/placeholder.svg" alt="Product Image" width={600} height={300} className="w-full h-52 object-cover" />
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">Premium Leather Wallet</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          A high-quality leather wallet that combines style and functionality. Crafted with attention to detail, this
          wallet is perfect for the modern professional.
        </p>
        <button className="bg-sky-400 font-medium text-white dark:bg-gray-800 py-2 w-full rounded-lg">
          Let me See
        </button>
      </div>
    </div>
    
          )}
        </div>
      )}
    </div>
  );
};

export default UserTabs;