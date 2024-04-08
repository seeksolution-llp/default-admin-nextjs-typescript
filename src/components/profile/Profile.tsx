import { AntDesignOutlined } from "@ant-design/icons";
import { Avatar, Flex } from "antd";
import React from "react";

function Profile() {
  return (
    <div>
      <Flex gap={500} align="center" justify="center">
        <Flex vertical gap={50}>
          <Avatar
            size={{ xs: 24, sm: 32, md: 40, lg: 180, xl: 180, xxl: 180 }}
            icon={<AntDesignOutlined />}
          />
          <button>Change Photo</button>
        </Flex>
        <div>
          <h2 style={{ textAlign: "center" }}>Personal</h2>
          <Flex vertical gap={50} align="start" style={{ fontSize: "20px" }}>
            <div>
              Name : &nbsp;
              <input type="text" />
            </div>
            <div>
              Email : &nbsp;
              <input type="text" />
            </div>
            <div>
              Role : &nbsp;
              <input type="text" />
            </div>
            <div>
              Created at : &nbsp;
              <input type="text" />
            </div>
          </Flex>
        </div>
      </Flex>
    </div>
  );
}

export default Profile;
