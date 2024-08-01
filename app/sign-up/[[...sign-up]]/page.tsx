import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="w-full h-screen grid place-items-center">
      <SignUp />
    </div>
  );
}
