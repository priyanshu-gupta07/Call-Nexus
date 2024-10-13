import Image from "next/image";
import { Button } from "../../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "../../components/ui/dialog";
import Logo from "../../public/logo.png";
import { signIn } from "../lib/auth";
import { GitHubAuhtButton, GoogleAuhtButton } from "./SubmitButtons";

export function Authmodal () {
    return (
        <Dialog>
            <DialogTrigger asChild >
                <Button>Try for Free</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[360]">
                <DialogHeader className="flex flex-row items-center gap-4">
                    <Image src={Logo} alt="logo" className="size-10" />
                    <h4 className="text-3xl font-semibold">
                        Cal<span className="text-primary ">Nexus</span>
                    </h4>
                </DialogHeader>
                <div className="flex flex-col mt-5 gap-3">
                    <form action={async () => {
                        "use server";
                        await signIn("google");
                    }} className="w-full">
                        <GoogleAuhtButton />
                    </form>
                    <form action={async () => {
                        "use server";
                        await signIn("github");
                    }} className="w-full">
                        <GitHubAuhtButton />
                    </form>
                </div>
            </DialogContent>
        </Dialog>
        
    )
}