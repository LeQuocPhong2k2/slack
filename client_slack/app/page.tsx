"use client";

import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import Image from "next/image";
import { FaHandsClapping, FaPeopleGroup } from "react-icons/fa6";
import status_login from "@/contant";
import DefaultNavbar from "./components/Navbar";

let Status = status_login;

const Login = () => {
  return (
    <div>
      <DefaultNavbar></DefaultNavbar>
      <div className="flex items-center justify-center mt-2">
        <div className="grid grid-cols-1 grid-rows-4 gap-4">
          <div className="flex justify-center items-center font-bold text-5xl gap-3">
            <FaHandsClapping className="text-yellow-200" />
            <span className="text-white">Rất vui được gặp lại bạn</span>
          </div>
          <div className="grid grid-cols-1 grid-rows-2 bg-fuchsia-700 p-1 rounded-lg">
            <div className="p-4 bg-slate-200 rounded-t-lg">
              <span className="font-semibold text-lg">Không gian làm việc cho 20070031.phong@student.iuh.edu</span>
            </div>
            <div className="flex bg-white justify-between rounded-b-lg">
              <div className="flex w-52">
                <div className="grid grid-cols-2 grid-rows-1 p-2 gap-1">
                  <div className="flex justify-center items-center row-span-2 bg-slate-300 rounded">
                    <FaPeopleGroup className="text-5xl" />
                  </div>
                  <span className="font-semibold">dntn</span>
                  <span className="text-slate-400 italic">2 thành viên</span>
                </div>
              </div>
              <div className="flex w-48 items-center justify-end">
                <div className="flex justify-end items-center bg-fuchsia-800 p-2 m-2 rounded cursor-pointer hover:ring-4 hover:scale-95 ease-out duration-300">
                  <span className="text-white font-semibold">Khởi động Slack</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image className="rounded p-2 m-1" src="/woman-with-laptop-color-background.png" alt="logo" width={170} height={170} />
            <span className="font-semibold text-white text-xl">Bạn muốn sử dụng Slack với một nhóm khác ?</span>
            <div className="flex justify-end items-center bg-white p-2 m-2 rounded cursor-pointer">
              <span className="text-slate-700 font-semibold ">Tạo một không gian làm việc mới</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Register = () => {
  return (
    <main>
      <DefaultNavbar></DefaultNavbar>
      <div className="flex items-center justify-center mt-2">
        <div className="grid grid-cols-2 grid-rows-1 gap-2 p-4 m-4">
          <div className="grid grid-cols-1 gap-4 p-2 items-center">
            <div>
              <span className="text-6xl font-bold text-white">Made for people.</span>
              <span className="text-6xl font-bold text-amber-400">Built for productivity</span>
            </div>
            <div className="h-fit">
              <span className="text-white font-bold text-xl">Connect the right people, find anything you need and automate the rest. That’s work in Slack, your productivity platform.</span>
            </div>
            <div className="grid grid-cols-2 gap-10 h-fit">
              <div className="flex items-center justify-center bg-white rounded-sm hover:ring-4 hover:scale-95 ease-out duration-500 text-center font-bold text-gray-800">
                <span className="text-base">SIGN UP WITH EMAIL</span>
              </div>
              <div className="flex items-center justify-center bg-blue-600 rounded-sm hover:ring-4 hover:scale-95 ease-out duration-500 text-center font-bold text-white">
                <Image className="rounded bg-white p-2 m-1" src="/icon-google.svg" alt="logo" width={50} height={50} />
                <span className="font-semibold">SIGN UP WITH GOOGLE</span>
              </div>
            </div>
            <span className="font-semibold text-white text-xl">Slack is free to try for as long as you’d like</span>
          </div>
          <div className="grid grid-cols-1 gap-4 p-2 items-center">
            <video title="Team discussing work in the Slack app" role="img" data-js-id="hero" loop muted playsInline poster="https://a.slack-edge.com/2951054/marketing/img/homepage/e2e-prospects/animations/static/hero-product-ui.jpg">
              <source src="https://a.slack-edge.com/9689dea/marketing/img/homepage/e2e-prospects/animations/webm/hero-product-ui.webm" type="video/webm" />
              <source src="https://a.slack-edge.com/9689dea/marketing/img/homepage/e2e-prospects/animations/mp4/hero-product-ui.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </main>
  );
};

const Homepage = () => {
  let Layout = <Register />;
  if (Status === "success") {
    Layout = <Login />;
  }
  return Layout;
};

export default Homepage;
