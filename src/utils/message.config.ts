import { message, notification } from "antd";

export function showError(message: string): void {
    notification.error({
        message: "发生了一个错误",
        description: message,
        duration: 2,
    });
}

export function showLoading(isLoading: boolean = true): void {
    if (isLoading) {
        message.loading({
            key: "loading-key",
            content: "正在加载",
            duration: 0,
        });
    } else {
        message.destroy("loading-key");
    }
}

export function hideLoading(): void {
    message.destroy("loading-key");
}
