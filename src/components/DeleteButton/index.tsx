import { showError, showLoading, showSuccess } from "@/utils/message.config";
import { DocumentNode, useMutation } from "@apollo/client";
import { Button, Modal } from "antd";
import React, { useEffect } from "react";
import { useCallback } from "react";
const { confirm } = Modal;

interface Props {
    deleteGql: DocumentNode;
    refetch?: () => void;
    alertContent?: string;
    buttonTitle?: string;
    deleteId: string | number;
}

const DeleteButton = (props: Props) => {
    const { deleteGql, refetch, alertContent, deleteId, buttonTitle } = props;
    const [deleteUserMutation, { loading: deleteLoading, error: deleteError, data: deleteResult }] = useMutation(deleteGql, { onError: (ex) => {} });

    useEffect(() => {
        deleteError && showError(deleteError.message);
    }, [deleteError]);

    useEffect(() => {
        showLoading(deleteLoading);
    }, [deleteLoading]);

    useEffect(() => {
        if (deleteResult) {
            showSuccess("删除成功", () => {});
            refetch && refetch();
        }
    }, [deleteResult]);

    const deleteButtonClicked = useCallback(() => {
        deleteUserMutation({
            variables: {
                id: deleteId || "",
            },
        });
    }, []);

    return (
        <Button
            className="column-opration-delete"
            type="default"
            shape="round"
            size="large"
            danger
            onClick={() => {
                confirm({
                    title: `再次提醒`,
                    content: alertContent || "确认要删除？",
                    onOk() {
                        deleteButtonClicked();
                    },
                });
            }}
        >
            {buttonTitle || "删除"}
        </Button>
    );
};

export default DeleteButton;
