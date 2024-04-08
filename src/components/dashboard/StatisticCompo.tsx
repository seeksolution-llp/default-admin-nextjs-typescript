"use client";
import React, { Fragment } from "react";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Breadcrumb, Card, Col, Flex, Row, Statistic, theme } from "antd";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const StatisticCompo = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const data = [
    {
      name: "January",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "February",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "March",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "April",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "May",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "June",
      uv: 4390,
      pv: 2800,
      amt: 2500,
    },
    {
      name: "July",
      uv: 3590,
      pv: 6300,
      amt: 2100,
    },
    {
      name: "August",
      uv: 3390,
      pv: 4300,
      amt: 2100,
    },
    {
      name: "September",
      uv: 2590,
      pv: 5300,
      amt: 2100,
    },
    {
      name: "October",
      uv: 5490,
      pv: 4100,
      amt: 2100,
    },
    {
      name: "November",
      uv: 3090,
      pv: 4400,
      amt: 2100,
    },
    {
      name: "December",
      uv: 3190,
      pv: 4200,
      amt: 2100,
    },
  ];
  return (
    <Fragment>
      <div
        style={{
          padding: 24,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Flex wrap="wrap">
          {Array.from({ length: 24 }, (_, i) => (
            <Card
              key={i}
              bordered={false}
              hoverable
              style={{ width: "380px", margin: "10px" }}
            >
              <Statistic
                title="Active"
                value={11.28}
                precision={2}
                valueStyle={{ color: "#3f8600" }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </Card>
          ))}
        </Flex>
        <Card>
          <LineChart
            width={1200}
            height={500}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 5,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </Card>
      </div>
    </Fragment>
  );
};

export default StatisticCompo;
