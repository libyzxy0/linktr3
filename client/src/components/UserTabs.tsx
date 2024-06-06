"use client";

import React, { useState } from "react";
import { Network, Blocks } from "lucide-react";
import { Card } from "@/components/Card";
import { ButtonLink } from "@/components/ButtonLink";

import type { Link, Card as CardType } from "@/types";

interface UserTabsProps {
  links: Link | null;
  cards: CardType | null;
  error: string | null;
}

const UserTabs: React.FC<UserTabsProps> = ({ links, cards, error }) => {
  const [activeTab, setActiveTab] = useState("links");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full flex justify-center flex-col">
      <div className="flex flex-row justify-between w-full md:w-[20rem] px-8 space-x-2">
        <button
          className={`flex flex-row justify-center items-center rounded-lg font-medium py-2 w-[50%] transition-all duration-200 ${
            activeTab === "links"
              ? "bg-sky-400 text-white"
              : "text-gray-700 dark:text-white bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
          onClick={() => handleTabClick("links")}
        >
          <Network className="h-4 w-4 mr-1" />
          Links
        </button>
        <button
          className={`dark:text-white flex flex-row justify-center items-center rounded-lg font-medium py-2 w-[50%] transition-all duration-200 ${
            activeTab === "cards"
              ? "bg-sky-400 text-white"
              : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
          onClick={() => handleTabClick("cards")}
        >
          <Blocks className="h-4 w-4 mr-1" />
          Cards
        </button>
      </div>

      {activeTab === "links" && (
        <div className="w-full px-8 flex flex-col mt-10 md:flex-row md:flex-wrap justify-center">
          {links && links.map((data, index) => (
            <ButtonLink key={index} logo={data?.logo} link={data.url}>
              {data.name}
            </ButtonLink>
          ))}
        </div>
      )}

      {activeTab === "cards" && (
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
