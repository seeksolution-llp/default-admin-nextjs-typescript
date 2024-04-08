"use client";
import React from "react";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  MailOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Dropdown, Flex, Layout, Menu, theme } from "antd";
import Link from "next/link";
import Image from "next/image";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const sidebarItems: MenuProps["items"] = [
  getItem(
    "Dashboard",
    "analytics",
    null,
    [getItem(<Link href={`/dashboard`}>Analytics</Link>, "Analytics")],
    "group"
  ),
  getItem(
    "Management",
    "management",
    null,
    [getItem(<Link href={`/users/page/1`}>Users</Link>, "Users")],
    "group"
  ),

  getItem(
    "Utils",
    "sub5",
    null,
    [
      getItem(<Link href={`/contactus`}>Contact us</Link>, "contactus"),
      getItem(<Link href={`/content/page/1`}>Content</Link>, "contents"),
    ],
    "group"
  ),

  getItem("Navigation One", "sub1", <MailOutlined />, [
    getItem(
      "Item 1",
      "g1",
      null,
      [getItem("Option 1", "1"), getItem("Option 2", "2")],
      "group"
    ),
    getItem(
      "Item 2",
      "g2",
      null,
      [getItem("Option 3", "3"), getItem("Option 4", "4")],
      "group"
    ),
  ]),

  getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
    getItem("Option 5", "5"),
    getItem("Option 6", "6"),
    getItem("Submenu", "sub3", null, [
      getItem("Option 7", "7"),
      getItem("Option 8", "8"),
    ]),
  ]),

  { type: "divider" },
];

const items: MenuProps["items"] = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));

const profileItems: MenuProps["items"] = [
  {
    key: "account",
    icon: <Image src={"/account.svg"} alt="" height={20} width={20} />,
    label: <Link href={"/profile"}>Account</Link>,
  },
  {
    key: "logout",
    icon: <Image src={"/logout.svg"} alt="" height={20} width={20} />,
    label: <Link href={"/signin"}>Log Out</Link>,
  },
];

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout hasSider>
      <Sider
        // collapsible
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          paddingLeft: "5px",
          top: 0,
          bottom: 0,
        }}
      >
        <Link href={`/`}>
          <Flex justify="center">
            <Image
              src={"/seek.png"}
              style={{ marginTop: "10px", marginBottom: "10px" }}
              alt=""
              height={80}
              width={80}
            ></Image>
          </Flex>
        </Link>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={sidebarItems}
        />
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Flex gap={"small"} justify="space-between" align="center">
            <Menu
              mode="horizontal"
              defaultSelectedKeys={["2"]}
              items={items}
              style={{ flex: 1, minWidth: 0 }}
            />

            <Dropdown trigger={["click"]} menu={{ items: profileItems }}>
              <Avatar
                icon={
                  <Image
                    src={"/profile.svg"}
                    height={25}
                    width={25}
                    alt=""
                  ></Image>
                }
                style={{ margin: "15px", cursor: "pointer" }}
              />
            </Dropdown>
          </Flex>
        </Header>
        <Content
          style={{ margin: "16px", overflow: "initial", minHeight: "100vh" }}
        >
          {children}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
