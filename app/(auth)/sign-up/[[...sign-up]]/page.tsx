import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="w-1/2 h-screen grid place-items-center">
      <SignUp />
    </div>
  );
}
