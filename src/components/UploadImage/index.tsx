import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useState } from "react";
import { showError } from "@/utils/message.config";
import { useQuery } from "@apollo/client";
import { getQiniuTokenGql } from "./gql";

interface Props {
    imageUploadedCallback?: (imageUrl: string) => void;
    fileSize?: number /** mb单位， 默认为1 */;
}

const UploadImage = (props: Props) => {
    const { imageUploadedCallback, fileSize } = props;

    const [imageUrl, setImageUrl] = useState<string>("");
    const [token, setToken] = useState<string>();
    const { data } = useQuery(getQiniuTokenGql, {});
    // const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (data) {
            const { uploadToken } = data.getQiniuToken;
            setToken(uploadToken);
        }
    }, [data]);

    const beforeUpload = useCallback((file) => {
        const isPng = file.type === "image/png";
        if (!isPng) {
            showError("只能上传PNG");
        }
        const isLt2M = file.size / 1024 / 1024 < (fileSize || 1);
        if (!isLt2M) {
            showError(`图片大小必须小于${fileSize || 1}MB`);
        }
        return isPng && isLt2M;
    }, []);

    const handleChange = useCallback(
        (info) => {
            if (info.file.status === "done") {
                const { hash } = info.file.response;

                const domain = process.env.REACT_APP_QINIU_DOMAIN;
                setImageUrl(`${domain}${hash}`);
            } else if (info.file.status === "error") {
                showError("上传图片失败");
            }
        },
        [imageUrl]
    );

    useEffect(() => {
        if (imageUrl) {
            if (imageUploadedCallback) {
                imageUploadedCallback(imageUrl);
            }
        }
    }, [imageUrl]);

    return (
        <Upload
            name="file"
            data={{ token }}
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="http://up-cn-east-2.qiniup.com"
            beforeUpload={beforeUpload}
            onChange={handleChange}
        >
            {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
            ) : (
                <div>
                    <LoadingOutlined /> <div style={{ marginTop: 8 }}>Upload</div>
                </div>
            )}
        </Upload>
    );
};

export default UploadImage;
