"use client";

import { useFormStatus } from "react-dom"
import { Button } from "../../components/ui/button";
import GoogleLogo from "../../public/google.svg";
import GitHubLogo from "../../public/github.svg";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export function GoogleAuhtButton() {
    const {pending} = useFormStatus();
    return (
        <>
        {pending ? (
            <Button disabled variant="outline" className="w-full">
                <Loader2 className="size-4 mr-2 animate-spin" /> Please wait
            </Button>
        ) :(
            <Button variant="outline" className="w-full">
                <Image src={GoogleLogo} alt="google" className="size-4 mr-2" />
                Sign in with Google
            </Button>
        )}
        </>
    )
}

export function GitHubAuhtButton() {
    const {pending} = useFormStatus();
    return (
        <>
        {pending ? (
            <Button disabled variant="outline" className="w-full">
                <Loader2 className="size-4 mr-2 animate-spin" /> Please wait
            </Button>
        ) :(
            <Button variant="outline" className="w-full">
                <Image src={GitHubLogo} alt="google" className="size-4 mr-2" />
                Sign in with Github
            </Button>
        )}
        </>
    )
}