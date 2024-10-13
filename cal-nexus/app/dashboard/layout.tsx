import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/logo.png"
import { DasboardLinks } from "../components/DashboardLinks";
import { Sheet, SheetTrigger, SheetContent } from "../../components/ui/sheet";
import { Button } from "../../components/ui/button";
import { Menu } from "lucide-react";

export default function DashboardLayout({children}: {children: React.ReactNode}) {
    return (
        <>
        <div className="min-h-screen w-full grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden md:block border-r bg-muted/40">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link href="/" className="flex items-center gap-2">
                            <Image src={Logo} alt="Logo" className="size-7"/>
                            <p className="text-xl font-bold">
                                Cal<span className="text-primary">Nexus</span>
                            </p>
                        </Link>
                    </div>
                    <div className="flex-1">
                        <nav className="grid items-start px-2 lg:px-4 ">
                            <DasboardLinks/>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <nav className="grid gap-2">
                                <DasboardLinks />
                            </nav>
                        </SheetContent>
                    </Sheet>
                </header>
                <main className="flex-1">{children}</main>
            </div>
        </div>
        </>
    )
}