import { toast } from "react-toastify";

export const debounce = <T extends (...args: any[]) => void>(fn: T, delay: number) => {
    let timer: number | undefined;
    return function (this: any, ...args: Parameters<T>) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
};

export const showToast = debounce((type: "success" | "error", message?: string) => {
    if (type === "success") {
        toast.success(message || "Success", {
            position: "top-center",
            style: {
                background: "#333",
                color: "#fff",
            },
        });
    } else if (type === "error") {
        toast.error(message || "Something went wrong", {
            position: "top-center",
            style: {
                background: "#e74c3c",
                color: "#fff",
            },
        });
    }
}, 300);
