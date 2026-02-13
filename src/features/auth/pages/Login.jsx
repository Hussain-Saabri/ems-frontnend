import LoginForm from "../components/LoginForm";

const Login = () => {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 p-4 overflow-y-auto">
            <div className="w-full max-w-md">
                <LoginForm />
            </div>
        </div>
    );
};

export default Login;
