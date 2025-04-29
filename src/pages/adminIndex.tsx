import { Outlet } from "react-router-dom";
import { Row } from "reactstrap";
import "../css/layout.css";

const Layout = () => {
    return (
        <>
            <Row className="h-screen w-screen m-0 p-0 flex-center">
                <Outlet />
            </Row>
        </>
    )
}

export default Layout;