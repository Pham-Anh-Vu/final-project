import React from "react";
import { PathRouteProps } from "react-router-dom";
import HomeLayout from ".";
import { ConfigProvider } from "antd";

export default function HomeLayoutRoutes({
  children,
  ...rest
}: PathRouteProps) {
  return <HomeLayout>{children}</HomeLayout>;
}
