import React, { useEffect } from "react";
import "./index.scss";
import { Table, Tag, Space, Button, Typography, PageHeader, Modal } from "antd";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { IUser, IUserNode, IUserPagination } from "../../model/user.model";
import { deleteUserGql, usersGql } from "../../request/gql";
import { showError, showLoading, showSuccess } from "@/utils/message";
import { useState } from "react";
import { PaginationArgs } from "@/models/common";
import {
    changePageVariable,
    initialPageVariable,
    nextPageVariable,
    previousPageVariable,
} from "@/config/pagination.config";
import DeleteButton from "@/components/DeleteButton";
import PrimaryButton from "@/components/PrimaryButton";
const { confirm } = Modal;
const { Column } = Table;

const pageSize: number = 10;

interface Props {}

const UserList = (props: Props) => {
    const [userList, setUsers] = useState<IUserNode[]>();
    const [total, setTotal] = useState<number>();
    const [currentPage, setCurrentPage] = useState<number>();
    const [variables = initialPageVariable(), setVariables] = useState<PaginationArgs>();

    const { loading, data, refetch } = useQuery(usersGql, { variables: variables });

    let history = useHistory();

    useEffect(() => {
        if (data) {
            const { users } = data;
            const { totalCount, edges = [] } = users || {};
            setUsers(edges);
            setTotal(totalCount);
        }
    }, [data]);

    const fetchList = useCallback(
        (currentPage, isNextPage: boolean) => {
            setCurrentPage(currentPage);

            setVariables(
                changePageVariable(isNextPage, userList, pageSize, (item) => {
                    return item?.node?.id;
                })
            );
        },
        [variables, userList, data]
    );

    return (
        <div className="user-list">
            <PageHeader
                ghost={false}
                title="用户管理"
                subTitle="用户列表"
                extra={[
                    <PrimaryButton
                        buttonTitle="创建用户"
                        onClick={() => {
                            history.push("/user/create");
                        }}
                    />,
                    <PrimaryButton
                        buttonTitle="修改密码"
                        onClick={() => {
                            history.push("/user/updatePassword");
                        }}
                    />,
                ]}
            />

            <Table
                loading={loading}
                dataSource={userList || []}
                rowKey={(item) => item.node?.id || 0}
                pagination={{
                    position: ["bottomLeft"],
                    current: currentPage,
                    total: total,
                    onChange: (page) => {
                        fetchList(page, page > (currentPage || 0));
                    },
                }}
            >
                <Column title="用户id" dataIndex={["node", "id"]} width="350px" />
                <Column title="用户名字" dataIndex={["node", "name"]} />
                <Column title="用户邮箱" dataIndex={["node", "email"]} />
                <Column title="用户规则" dataIndex={["node", "role"]} />
                <Column
                    title="操作"
                    width="230px"
                    render={(edge) => (
                        <div className="column-opertaion">
                            <PrimaryButton
                                buttonTitle="编辑"
                                onClick={() => {
                                    history.push({ pathname: "/user/update", state: edge?.node });
                                }}
                            />

                            <DeleteButton
                                buttonTitle="删除用户"
                                deleteGql={deleteUserGql}
                                deleteId={edge?.node?.id}
                                alertContent={`是否确定要删除${edge?.node?.name}这个用户?`}
                                refetch={() => {
                                    refetch();
                                }}
                            />
                        </div>
                    )}
                />
            </Table>
        </div>
    );
};

export default UserList;
