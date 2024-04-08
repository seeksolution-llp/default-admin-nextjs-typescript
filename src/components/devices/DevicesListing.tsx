"use client"
import { FilePdfOutlined, FolderAddOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Image, Space, Table, TableProps, Tag } from "antd"
import Link from "next/link";
import React, { Fragment } from "react";
import SeekSolutionApi from "seeksolution/utils/SeekSolutionApi";

const DevicesListing = ({ accessToken }: {
    accessToken: string
}) => {

    const [state, setState] = React.useState([])

    interface DataType {
        key: string;
        walletAddress: string;
        createdAt?: string;
    }

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Make',
            dataIndex: 'make',
            key: 'make',
            render: (_, record) => _,
        },
        {
            title: 'Model',
            dataIndex: 'model',
            key: 'model',
            render: (_, record) => (
                <span>{_ || 0}</span>
            )
        },
        {
            title: 'Sr Number',
            dataIndex: 'slNumber',
            key: 'slNumber',
            render: (_, record) => (
                <span>{_ || 0}</span>
            )
        },
        {
            title: 'Asset',
            dataIndex: 'asset',
            key: 'asset',
            render: (_, record) => (
                <span>{_ || 0}</span>
            )
        },
        {
            title: 'Specefication',
            key: 'specefication',
            render: (_, record) => (
                <Button type="primary" icon={<FilePdfOutlined />}>Download</Button>
            ),
        },
        {
            title: 'Drawing',
            key: 'drawing',
            render: (_, record) => (
                <Button type="primary" icon={<FilePdfOutlined />}>Download</Button>
            ),
        },
    ];

    const initialiseApi = async () => {
        try {
            SeekSolutionApi.setToken(accessToken)
        } catch (error) {

        }
    }

    React.useEffect(() => {
        initialiseApi()
    }, [])

    return <Card title="Devices" extra={[<Link href={"/devices/create"} key={"create"}><FolderAddOutlined /></Link>]}>

        <Table columns={columns} dataSource={state} />;

    </Card>

}

DevicesListing.displayName = "DevicesListing"
export default DevicesListing