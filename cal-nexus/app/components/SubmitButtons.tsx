"use client";

import { useFormStatus } from "react-dom"
import { Button } from "../../components/ui/button";
import GoogleLogo from "../../public/google.svg";
import GitHubLogo from "../../public/github.svg";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";


interface iAppProps {
    text: string;
    variant?: 
    |"default" 
    | "destructive" 
    | "outline" 
    | "secondary" 
    | "ghost" 
    | "link" 
    | null 
    | undefined;
    className?: string;
}

export function SubmitButton ({text,variant,className} : iAppProps) {
    const {pending} = useFormStatus();
    return (
        <>
        {pending ? (
            <Button disabled variant="outline" className={cn("w-fit", className)}>
                <Loader2 className="size-4 mr-2 animate-spin" /> Please wait
            </Button>
        ) :(
            <Button variant={variant} className={cn("w-fit", className)} type="submit">
                {text}
            </Button>
        )}
        </>
    )
}

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