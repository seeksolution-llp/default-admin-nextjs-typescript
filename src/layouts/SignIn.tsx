"use client";
import { Button, Card, Flex, Form, Input } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { GlobalContext } from "seeksolution/context/Provider";
import SeekSolutionApi from "seeksolution/utils/SeekSolutionApi";
import { setToken } from "seeksolution/utils/SeekSolutionCookies";

const SignIn = () => {
  const router = useRouter();
  const { Toast, setLoading, loading } = React.useContext(GlobalContext);

  const handleLogin = async (values: any) => {
    setLoading(true);
    try {
      const apiRes = await SeekSolutionApi.Auth.signin(values);
      setToken(apiRes.token);
      router.replace("/dashboard");
    } catch (error) {
      Toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Flex
        vertical
        justify="center"
        align="center"
        style={{
          top: "0",
          left: "0",
          width: "100%",
          height: "100vh",
          textAlign: "center",
          overflow: "hidden",
          position: "fixed",
        }}
      >
        <div
          style={{
            padding: "200px 230px",
            backgroundColor: "#4a11c2",
            zIndex: "-1",
            position: "absolute",
            borderRadius: "40px",
            rotate: "-25deg",
            left: "-100px",
            top: "300px",
          }}
        ></div>
        <div>
          <Card
            hoverable
            bordered={false}
            className="box"
            style={{ maxWidth: "500px", width: "500px" }}
          >
            <Image src={"/seek.png"} alt="" height={100} width={100}></Image>
            <Form onFinish={handleLogin} layout="vertical">
              <Form.Item>
                <h2>Sign In</h2>
              </Form.Item>
              <Form.Item
                label={<span style={{ fontWeight: "bold" }}>Email</span>}
                name={"email"}
              >
                <Input placeholder="Username or email" />
              </Form.Item>
              <Form.Item
                label={<span style={{ fontWeight: "bold" }}>Password</span>}
                name={"password"}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  shape="round"
                  block
                  htmlType="submit"
                  loading={loading}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
        <div
          style={{
            padding: "200px 230px",
            backgroundColor: "#4a11c2",
            zIndex: "-2",
            position: "absolute",
            borderRadius: "40px",
            rotate: "-25deg",
            right: "-100px",
            top: "-40px",
            overflow: "hidden",
          }}
        ></div>
      </Flex>
    </>
  );
};

export default SignIn;
