"use client";
import Link from "next/link";
import { SiAbbrobotstudio } from "react-icons/si";
import {
  FaArrowLeft,
  FaChevronDown,
  FaEnvelope,
  FaHome,
  FaLink,
  FaRobot,
  FaSignOutAlt,
  FaUser,
  FaUsers,
} from "react-icons/fa";

import { useState } from "react";
import Image from "next/image";
export default function Nav({
  isNavOpen,
  setNavOpen,
  messages,
}: {
  isNavOpen: boolean;
  setNavOpen: Function;
  messages: any;
}) {
  const [expandedItems, setExpandedItems] = useState([]);

  const navItems = [
    { title: "Przegląd", href: `/admin`, icon: <FaHome /> },
    { title: "Czaty z Asystentem", href: `/admin/users`, icon: <FaUsers /> },
    {
      title: "Zaproszenia",
      href: `/admin/links`,
      expandable: true,
      icon: <FaLink />,
      subItems: [
        {
          title: "Generuj zaproszenia",
          href: `/admin/generate-links`,
          icon: <FaRobot />,
        },
        {
          title: "Status zaproszeń",
          href: `/admin/links`,
          icon: <SiAbbrobotstudio />,
        },

        { title: "Wiadomości", href: `/admin/messages`, icon: <FaEnvelope /> },
      ],
    },

    // {
    //   title: "Blog",
    //   href: `/admin/blog/edit`,
    //   expandable: true,
    //   icon: <FaArtstation />,
    //   subItems: [
    //     {
    //       title: "Nowy post",
    //       href: `/admin/blog/new`,
    //       icon: <FaUpload />,
    //     },
    //     {
    //       title: "Edytuj post",
    //       href: `/admin/blog/edit`,
    //       icon: <FaEdit />,
    //     },
    //   ],
    // },
    {
      title: "Leady",
      href: `/admin/leads`,
      expandable: true,
      icon: <FaUsers />,
      subItems: [
        {
          title: "Dofinansowanie",
          href: `/admin/leads/leads`,
          icon: <FaUser />,
        },
        {
          title: "Szkolenia",
          href: `/admin/leads/courses`,
          icon: <FaUser />,
        },
        {
          title: "Aplikacje",
          href: `/admin/leads/applications`,
          icon: <FaUser />,
        },
      ],
    },
    {
      title: "Logout",
      href: `/admin/logout`,
      icon: <FaSignOutAlt />,
    },
  ];

  return (
    <div
      className={`fixed z-[51] scrollbar font-coco !text-white duration-500 ${
        isNavOpen ? "translate-x-[0]" : "-translate-x-[300px]"
      }`}
    >
      <div className="flex flex-col justify-between py-6 h-screen w-[300px] border-r-[1px] border-[#303345] bg-[#222430] font-sans">
        <div className="text-white py-4 px-3 relative">
          <h1 className="text-base font-bold  flex flex-row items-center ">
            <Image
              src="/favicons/android-chrome-192x192.png"
              width={36}
              height={36}
              alt=""
              className="w-8 h-8 mr-2"
            />{" "}
            Panel administracyjny
          </h1>
          <button
            onClick={() => setNavOpen(!isNavOpen)}
            className="absolute -right-[50px] w-[50px] h-[50px] top-0 !z-[9999999] bg-green-400 hover:bg-green-500 duration-200 text-white flex items-center justify-center"
          >
            <FaArrowLeft
              className={`${isNavOpen ? "rotate-0" : "rotate-180"}`}
            />
          </button>
        </div>
        <div className="mt-12">
          <ul className="flex flex-col flex-wrap justify-between w-full px-2">
            {navItems.map((item, index) => (
              <li
                key={index}
                className={`w-full ${item.expandable ? "relative" : ""}  `}
              >
                <Link
                  onClick={() => setNavOpen(false)}
                  href={item.href}
                  className="w-full"
                >
                  <div
                    onClick={() => {
                      if (item.expandable) {
                        if (expandedItems.includes(index as never)) {
                          setExpandedItems(
                            expandedItems.filter((i) => i !== index)
                          );
                        } else {
                          setExpandedItems([...expandedItems, index as never]);
                        }
                      }
                    }}
                    className={`${
                      item.expandable ? "cursor-pointer" : ""
                    } flex items-center justify-between py-2 px-4 rounded-md hover:bg-[#2F313C] w-full  ${
                      expandedItems.includes(index as never)
                        ? "bg-[#2F313C]"
                        : "bg-[#222430]"
                    }`}
                  >
                    <div className="flex flex-row items-center justify-between w-full">
                      <div className="flex flex-row items-center">
                        <div className="mr-2">{item.icon}</div>
                        {item.title}
                      </div>
                    </div>
                    {item.expandable && (
                      <div
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          if (item.expandable) {
                            if (expandedItems.includes(index as never)) {
                              setExpandedItems(
                                expandedItems.filter((i) => i !== index)
                              );
                            } else {
                              setExpandedItems([
                                ...expandedItems,
                                index as never,
                              ]);
                            }
                          }
                        }}
                        className="hover:bg-[#3B3D47] p-1 lg:p-2 rounded-md"
                      >
                        <FaChevronDown
                          className={`duration-300 ${
                            expandedItems.includes(index as never)
                              ? "rotate-180"
                              : "rotate-0"
                          }`}
                        />
                      </div>
                    )}
                  </div>
                </Link>

                {item.expandable && expandedItems.includes(index as never) && (
                  <ul className=" bg-[#222430] py-2 px-4 w-full">
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          onClick={() => setNavOpen(false)}
                          href={subItem.href}
                        >
                          <button className="relative flex items-center justify-between py-2 px-4 rounded-md hover:bg-[#2F313C] w-full">
                            <div className="flex flex-row items-center">
                              {subItem.icon}
                              <div className="ml-2">{subItem.title}</div>
                            </div>
                            {subItem?.title === "Wiadomości" &&
                              messages?.length > 0 && (
                                <div className="bg-red-500 text-white aspect-square rounded-full flex items-center justify-center h-6 w-6">
                                  {messages?.length}
                                </div>
                              )}
                          </button>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
