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
    size?: "large" | "small";
}

const DeleteButton = (props: Props) => {
    const { deleteGql, refetch, alertContent, deleteId, buttonTitle, size } = props;
    const [
        deleteUserMutation,
        { loading: deleteLoading, error: deleteError, data: deleteResult },
    ] = useMutation(deleteGql, { onError: (ex) => {} });

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

    const deleteButtonClicked = useCallback((id) => {
        console.error(`delete id`, id);

        deleteUserMutation({
            variables: {
                id: id || "",
            },
        });
    }, []);

    return (
        <Button
            className="column-opration-delete"
            type="default"
            // shape="round"
            size={size || "large"}
            danger
            onClick={() => {
                confirm({
                    title: `再次提醒`,
                    content: alertContent || "确认要删除？",
                    onOk() {
                        deleteButtonClicked(deleteId);
                    },
                });
            }}
        >
            {buttonTitle || "删除"}
        </Button>
    );
};

export default DeleteButton;
