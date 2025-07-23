import Link from "next/link";

const RegisterPage = () => {
  return (
    <div>
      <h1>Register</h1>
      <Link href="/auth/login">
        <a>Login Here</a>
      </Link>
    </div>
  );
};

export default RegisterPage;
