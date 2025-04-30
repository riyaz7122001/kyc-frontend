import { Card, CardTitle, CardBody } from "reactstrap";
import RegisterForm from "./registerForm";
import Logo from '../../../assets/images/logo.svg';

export default function Login() {
    return (
        <div className="flex-center full-screen">
            <Card className="w-[35rem] h-[42rem] p-16 rounded-2xl shadow-2xl bg-white border-[0.06rem] border-transparent">
                <CardTitle CardTitle className="flex flex-col items-center mb-5">
                    <img src={Logo} alt="Brand Logo" className="mb-5 h-16" />
                    <span className="dmsans-bold text-2xl">
                        Sign Up
                    </span>
                </CardTitle >
                <CardBody >
                    <RegisterForm />
                </CardBody>
            </Card >
        </div >
    )
}
