import React, { useEffect } from "react";
import "./index.scss";

interface Props {}
import { Table, Tag, Space, Button, Typography, PageHeader, Modal } from "antd";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { IUser, IUserNode, IUserPagination } from "../../model/user.model";
import { deleteUserGql, usersGql } from "../../request/gql";
import { showError, showLoading, showSuccess } from "@/utils/message.config";
import { useState } from "react";
import { PaginationArgs } from "@/models/common";
import { initialPageVariable, nextPageVariable, previousPageVariable } from "@/config/pagination.config";
const { confirm } = Modal;
const { Column } = Table;

const pageSize: number = 10;

const UserList = (props: Props) => {
    const [userList, setUsers] = useState<IUserNode[]>();
    const [total, setTotal] = useState<number>();
    const [currentPage, setCurrentPage] = useState<number>();
    const [variables = initialPageVariable(), setVariables] = useState<PaginationArgs>();

    const { loading, data, refetch } = useQuery(usersGql, { variables: variables });
    const [deleteUserMutation, { loading: deleteLoading, error: deleteError, data: deleteResult }] = useMutation(deleteUserGql, { onError: (ex) => {} });

    let history = useHistory();

    useEffect(() => {
        if (data) {
            const { users } = data;
            const { totalCount, edges = [] } = users || {};
            setUsers(edges);
            setTotal(totalCount);
        }
    }, [data]);

    useEffect(() => {
        deleteError && showError(deleteError.message);
    }, [deleteError]);

    useEffect(() => {
        showLoading(deleteLoading);
    }, [deleteLoading]);

    useEffect(() => {
        if (deleteResult) {
            showSuccess("删除用户成功", () => {});
            refetch();
        }
    }, [deleteResult]);

    const fetchList = useCallback(
        (after: boolean) => {
            if (!after) {
                setVariables(
                    nextPageVariable(userList, pageSize, (item) => {
                        return item?.node?.id;
                    })
                );
            } else {
                setVariables(
                    previousPageVariable(userList, pageSize, (item) => {
                        return item?.node?.id;
                    })
                );
            }
        },
        [variables, userList]
    );

    return (
        <div className="user-list">
            <PageHeader
                ghost={false}
                title="用户管理"
                subTitle="用户列表"
                extra={[
                    <Button
                        className="create-button"
                        type="primary"
                        shape="round"
                        size="large"
                        onClick={() => {
                            history.push("/user/create");
                        }}
                    >
                        创建用户
                    </Button>,
                    <Button
                        className="update-password-button"
                        type="primary"
                        shape="round"
                        size="large"
                        onClick={() => {
                            history.push("/user/updatePassword");
                        }}
                    >
                        修改密码
                    </Button>,
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
                        fetchList(page < (currentPage || 0));
                        setCurrentPage(page);
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
                            <Button
                                className="column-opration-edit"
                                type="primary"
                                onClick={() => {
                                    history.push({ pathname: "/user/update", state: edge?.node });
                                }}
                            >
                                编辑
                            </Button>
                            <Button
                                className="column-opration-delete"
                                type="default"
                                danger
                                onClick={() => {
                                    confirm({
                                        title: `再次提醒`,
                                        content: `是否确定要删除${edge?.node?.name}这个用户?`,
                                        onOk() {
                                            deleteUserMutation({
                                                variables: {
                                                    id: edge?.node?.id || "",
                                                },
                                            });
                                        },
                                    });
                                }}
                            >
                                删除
                            </Button>
                        </div>
                    )}
                />
            </Table>
        </div>
    );
};

export default UserList;
