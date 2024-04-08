"use client"
import { FilePdfOutlined, FolderAddOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Form, Image, Input, Space, Table, TableProps, Tag, Upload } from "antd"
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { Fragment } from "react";
import SeekSolutionApi from "seeksolution/utils/SeekSolutionApi";

const DevicesListing = ({ accessToken }: {
    accessToken: string
}) => {
    const router = useRouter()
    const [loading, setLoading] = React.useState(false)

    const initialiseApi = async (values: any) => {
        try {
            setLoading(true)
            SeekSolutionApi.setToken(accessToken)
            console.log("accessToken", accessToken);

        } catch (error) {

        } finally {
            setLoading(false)

        }
    }


    return <Card title="Create Device" >
        <Form
            onFinish={initialiseApi}
            layout="vertical"
        >
            <Form.Item label="Make" name={"make"} required>
                <Input placeholder="Enter make name" />
            </Form.Item>

            <Form.Item label="Model" name={"model"} required>
                <Input placeholder="Enter model name" />
            </Form.Item>


            <Form.Item label="Sr Number" name={"slNumber"} required>
                <Input placeholder="Enter sr number name" />
            </Form.Item>

            <Form.Item label="Asset" name={"asset"} required>
                <Input placeholder="Enter asset name" />
            </Form.Item>

            <Form.Item label="Specefication"  >
                <Upload.Dragger>Select file</Upload.Dragger>
            </Form.Item>

            <Form.Item label="Drawing" >
                <Upload.Dragger>Select file</Upload.Dragger>
            </Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>Create</Button>
        </Form>

    </Card>

}

DevicesListing.displayName = "DevicesListing"
export default DevicesListing