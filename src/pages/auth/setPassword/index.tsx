import { Card, CardTitle, CardBody } from "reactstrap";
import SetPasswordForm from "./setPasswordForm";
import Logo from '../../../assets/images/logo.svg';

export default function SetPassword() {
    return (
        <div className="flex-center full-screen">
            <Card className="w-[35rem] h-[32rem] p-16 rounded-2xl shadow-2xl bg-white border-[0.06rem] border-transparent">
                <CardTitle CardTitle className="flex flex-col items-center mb-5">
                    <img src={Logo} alt="Brand Logo" className="mb-5 h-16" />
                    <span className="dmsans-bold text-2xl">
                        Set Password
                    </span>
                </CardTitle >
                <CardBody >
                    <SetPasswordForm />
                </CardBody>
            </Card >
        </div >
    )
}