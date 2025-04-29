import { CircleDashed } from "lucide-react";

type LoaderProps = {
    styles?: React.CSSProperties;
};

export default function Loader({ styles }: LoaderProps) {
    return (
        <div
            style={{ ...styles }}
            className="flex justify-center items-center h-screen bg-white"
        >
            <CircleDashed
                className="animate-spin text-black"
                size={20}
                strokeWidth={2}
            />
        </div>
    );
}
