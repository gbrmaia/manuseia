import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export type SideBarGenericProps<T = any> = {
    children: React.ReactNode
    className?: String
} & T

export function Sidebar({ className, children }: SideBarGenericProps) {
    return (
        <aside className={cn(['fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex', className])}>
            {children}
        </aside>
    );
}

export function SidebarNav({ className, children }: SideBarGenericProps) {
    return (
        <nav className={cn(['flex flex-col items-center gap-4 px-2 py-4', className])}>
            {children}
        </nav>
    );
}

export function SidebarNavMobile({ className, children }: SideBarGenericProps) {
    return (
        <nav className={cn(['grid gap-6 text-lg font-medium', className])}>
            {children}
        </nav>
    );
}


interface SidebarNavLinkProps {
    href: string;
    icon: LucideIcon;
    label?: string;
    className?: string;
}

export function SidebarNavLinkMobile({ className, children, href, icon: Icon }: SideBarGenericProps<SidebarNavLinkProps>) {
    return (
        <Link
            href={href}
            className={cn('text-sm px-2 py-2 flex items-center rounded-md', className)}
        >
            <Icon className="mr-2 h-5 w-5" />
            {children}
        </Link>
    );
}

const SidebarNavLink: React.FC<SidebarNavLinkProps> = ({ href, icon: Icon, label, className }) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        className={cn('flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 hover:text-foreground hover:bg-secondary', className)}
                        href={href}>
                        <Icon className="h-5 w-5" />
                        <span className="sr-only">{label}</span>
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{label}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default SidebarNavLink;



