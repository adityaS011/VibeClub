import { SignIn } from "@clerk/nextjs";

const Page = () => {
  return <SignIn signUpUrl="/sign-up" />;
};

export default Page;
