import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import Videogif from "../../../public/images.jpeg";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import { CalendarCheck2 } from "lucide-react";

export default function OnboardingRouteTwo() {

    return (
        <div className="min-h-screen w-screen flex items-center justify-center">
            <Card>
                <CardHeader>
                    <CardTitle>
                        Almost there!
                    </CardTitle>
                    <CardDescription>
                        We have to connect your Calander to your Account.
                    </CardDescription>
                    <Image src={Videogif} alt="Almost finished" className="w-full rounded-lg"/>
                </CardHeader>
                <CardContent>
                    <Button asChild className="w-full">
                        <Link href="/api/auth">
                        <CalendarCheck2 className="mr-2 size-4"/>
                            Connect Calander to your Account
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}