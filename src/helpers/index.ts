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

export const handleApiError = (error: any, defaultMessage: string = "An error occurred") => {
    console.error(error);
    const errors = error?.response?.data?.errors;
    if (errors && Array.isArray(errors) && errors.length > 0) {
        const firstError = Object.values(errors[0]).join(", ");
        showToast("error", firstError);
    } else {
        const fallbackMessage = error?.response?.data?.message || defaultMessage;
        showToast("error", fallbackMessage);
    }
};

export const isUserAuthenticated = () => {
    const token = sessionStorage.getItem('kno-access');
    return !!token;
}