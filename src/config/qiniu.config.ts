import qiniu from "qiniu";

qiniu.conf.ACCESS_KEY = process.env.REACT_APP_QINIU_AK || "";
qiniu.conf.SECRET_KEY = process.env.REACT_APP_QINIU_SK || "";
// 七牛那边的对应的bucket名称
const bucket = process.env.REACT_APP_QINIU_BUCKET || "";

export const getToken = () => {
    const putPolicy = new qiniu.rs.PutPolicy({
        scope: bucket,
    });
    return putPolicy.uploadToken();
};
