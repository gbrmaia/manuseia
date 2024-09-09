'use client'
import { Home, Package2, PanelLeft, Settings, SettingsIcon } from "lucide-react";
import SidebarNavLink, { Sidebar, SidebarNav, SidebarNavLinkMobile, SidebarNavMobile } from "../../components/sidebar/sidebarComponents";
import { ModeToggle } from "../../components/themeProvider/switchTheme";
import { Sheet, SheetContent, SheetTrigger } from "../../components/ui/sheet";
import { Button } from "../../components/ui/button";
import Link from "next/link";

export function SidebarMain() {
  return (
    <Sidebar>
      <SidebarNav>
        <SidebarNavLink href="/" icon={Home} label="Home" />
      </SidebarNav>
      <SidebarNav className="mt-auto">
        <ModeToggle />
        <SidebarNavLink href="/settings" icon={Settings} label="Alterar Tema" />
      </SidebarNav>
    </Sidebar>
  );
};

export function SidebarMobile() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <SidebarNavMobile>
          <Link
            href="#"
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
          >
            <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <SidebarNavLinkMobile icon={Home} href=" / ">Home</SidebarNavLinkMobile>
          <SidebarNavLinkMobile icon={SettingsIcon} href=" /settings ">Configurações</SidebarNavLinkMobile>
          <ModeToggle />
        </SidebarNavMobile>
      </SheetContent>
    </Sheet>
  );
};



