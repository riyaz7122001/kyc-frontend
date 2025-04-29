import { Spinner } from "reactstrap";

type LoaderProps = {
    styles?: React.CSSProperties;
}

export default function Loader({ styles }: LoaderProps) {
    return (
        <div style={{ ...styles }} id="loader" className="flex-center">
            <Spinner />
        </div>
    )
}
