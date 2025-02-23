import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const PrivateLayout = async ({ children }: { children: ReactNode }) => {
  const token = (await cookies()).get("JWT")?.value;
  
  return <div> {children}</div>;
};

export default PrivateLayout;