import { showError, showLoading, showSuccess } from "@/utils/message.config";
import { Button, Modal } from "antd";
import React, { useEffect } from "react";
import { useCallback } from "react";
const { confirm } = Modal;

interface Props {
    buttonTitle?: string;
    onClick?: () => void;
    size?: "large" | "small";
}

const PrimaryButton = (props: Props) => {
    const { onClick, buttonTitle, size } = props;

    return (
        <Button type="primary" shape="round" size={size || "large"} onClick={onClick}>
            {buttonTitle || "删除"}
        </Button>
    );
};

export default PrimaryButton;
