'use client';

import React, { useState } from 'react';
import { Network, Blocks } from 'lucide-react';
import { Card } from '@/components/Card';
import { ButtonLink } from '@/components/ButtonLink';

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
        <div className="w-full px-8 flex flex-col mt-10 md:flex-row md:flex-wrap justify-center">
          <ButtonLink 
          logo="https://cdn-icons-png.flaticon.com/128/1384/1384060.png"
          link="https://youtube.com/@libyzxy0">
          YouTube
          </ButtonLink>
          <ButtonLink 
          logo="https://cdn-icons-png.flaticon.com/128/3046/3046121.png"
          link="https://www.tiktok.com/@libyzxy0">
          TikTok 
          </ButtonLink>
          <ButtonLink 
          logo="https://cdn-icons-png.flaticon.com/128/5968/5968764.png"
          link="https://facebook.com/libyzxy0">
          Facebook 
          </ButtonLink>
          <ButtonLink 
          logo="https://cdn-icons-png.flaticon.com/128/3536/3536505.png"
          link="https://linkedln.com/in/libyzxy0">
          LinkedIn
          </ButtonLink>
          <ButtonLink 
          logo="https://cdn-icons-png.flaticon.com/128/2111/2111432.png"
          link="https://github.com/libyzxy0">
          GitHub
          </ButtonLink>
        </div>
      )}

      {activeTab === 'cards' && (
        <div className="w-full px-6 flex flex-col mt-10 md:flex-row md:flex-wrap">
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
          <>
            <Card 
            title="Lorem Ipsum"
            description="Lorem Ipsum dolor sit amet in den."
            preview="https://example.com"
            image="https://http.cat/404"
            />
            <Card 
            title="Lorem Ipsum"
            description="Lorem Ipsum dolor sit amet in den."
            preview="https://example.com"
            image="https://http.cat/404"
            />
            <Card 
            title="Lorem Ipsum"
            description="Lorem Ipsum dolor sit amet in den."
            preview="https://example.com"
            image="https://http.cat/404"
            />
            <Card 
            title="Lorem Ipsum"
            description="Lorem Ipsum dolor sit amet in den."
            preview="https://example.com"
            image="https://http.cat/404"
            />
            <Card 
            title="Lorem Ipsum"
            description="Lorem Ipsum dolor sit amet in den."
            preview="https://example.com"
            image="https://http.cat/404"
            />
            <Card 
            title="Lorem Ipsum"
            description="Lorem Ipsum dolor sit amet in den."
            preview="https://example.com"
            image="https://http.cat/404"
            />
            <Card 
            title="Lorem Ipsum"
            description="Lorem Ipsum dolor sit amet in den."
            preview="https://example.com"
            image="https://http.cat/404"
            />
            <Card 
            title="Lorem Ipsum"
            description="Lorem Ipsum dolor sit amet in den."
            preview="https://example.com"
            image="https://http.cat/404"
            />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserTabs;