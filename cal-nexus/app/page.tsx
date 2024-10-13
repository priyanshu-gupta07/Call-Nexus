import { redirect } from "next/navigation";
import { Navbar } from "./components/Navbar";
import { auth } from "./lib/auth";

export default async function Home() {
  const session = await auth();

  if(session?.user){
    return redirect("/dashboard");
  }

  return (
    <div className="p-5">
      <Navbar/>
    </div>
  );
}
