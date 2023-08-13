"use client";

import { Navbar } from "flowbite-react";
import Image from "next/image";
import { Dropdown } from "flowbite-react";
import { FaCloudArrowDown } from "react-icons/fa6";
import status_login from "@/contant";

let status = status_login;

const NavLogin = () => {
  return (
    <Navbar fluid className="bg-fuchsia-800 border-b-2">
      <Navbar.Brand>
        <Image src="/icon.svg" alt="logo" width={100} height={100} />
      </Navbar.Brand>
      <Navbar.Collapse>
        <Navbar.Brand className="font-semibold text-white cursor-pointer">
          <FaCloudArrowDown className="inline-block ml-2 text-lg" />
          <span className="hover:text-pink-400 ease-out duration-300 text-lg">Tải xuống Slack</span>
        </Navbar.Brand>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-end">
        <Navbar.Brand className="font-semibold text-gray-800 cursor-pointer ">
          <div className="bg-white rounded-sm p-2 hover:ring-4 hover:scale-95 ease-out duration-300">
            <span className="text-base">TẠO KHÔNG GIAN LÀM VIỆC</span>
          </div>
        </Navbar.Brand>
      </Navbar.Collapse>
    </Navbar>
  );
};

const NavRegister = () => {
  return (
    <Navbar fluid className="bg-fuchsia-800 border-b-2">
      <Navbar.Brand>
        <Image src="/icon.svg" alt="logo" width={100} height={100} />
      </Navbar.Brand>
      <Navbar.Collapse>
        <Navbar.Brand className="font-semibold text-white cursor-pointer">
          <FaCloudArrowDown className="inline-block ml-2 text-lg" />
          <span className="hover:text-pink-400 ease-out duration-300 text-lg">Tải xuống Slack</span>
        </Navbar.Brand>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-end">
        <Navbar.Brand className="font-semibold text-gray-800 cursor-pointer">
          <span className="text-white font-semibold cursor-pointer text-lg">Sign in</span>
        </Navbar.Brand>
        <Navbar.Brand className="font-semibold text-gray-800 cursor-pointer ">
          <div className="bg-white rounded-sm p-2 hover:ring-4 hover:scale-95 ease-out duration-300">
            <span className="text-base">DÙNG THỬ MIỄN PHÍ</span>
          </div>
        </Navbar.Brand>
      </Navbar.Collapse>
    </Navbar>
  );
};

const DefaultNavbar = () => {
  let Layout = <NavRegister />;
  if (status === "success") {
    Layout = <NavLogin />;
  }
  return Layout;
};

function DropdownProduct(): JSX.Element {
  return (
    <Dropdown inline label="Product">
      <Dropdown.Header>
        <span className="block text-sm">Bonnie success</span>
        <span className="block truncate text-sm font-medium">name@flowbite.com</span>
      </Dropdown.Header>
      <Dropdown.Item>Features</Dropdown.Item>
      <Dropdown.Item>Settings</Dropdown.Item>
      <Dropdown.Item>Earnings</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item>Sign out</Dropdown.Item>
    </Dropdown>
  );
}
export default DefaultNavbar;
