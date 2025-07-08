// components/sidebar.tsx
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  ScrollText,
  Code2,
  Users,
  Award,
  Briefcase,
  Menu,
  DownloadIcon,
} from "lucide-react";
import AvatorBio from "../avator-bio";
import Link from "next/link";

type SelectionKey =
  | "aboutMe"
  | "techSkill"
  | "experience"
  | "achievements"
  | "certification";

type SidebarProps = {
  onSelect: (section: SelectionKey) => void;
};

type NavItem = {
  id: SelectionKey;
  label: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  {
    id: "aboutMe",
    label: "About Me",
    icon: <Users className="mr-2 h-4 w-4" />,
  },
  {
    id: "techSkill",
    label: "Tech Skill",
    icon: <Code2 className="mr-2 h-4 w-4" />,
  },
  {
    id: "experience",
    label: "Experience",
    icon: <Briefcase className="mr-2 h-4 w-4" />,
  },
  {
    id: "achievements",
    label: "Achievements",
    icon: <Award className="mr-2 h-4 w-4" />,
  },
  {
    id: "certification",
    label: "Certification",
    icon: <ScrollText className="mr-2 h-4 w-4" />,
  },
];

export default function Sidebar({ onSelect }: SidebarProps) {
  return (
    <>
      {/* Mobile Sheet Menu */}
      <div className="md:hidden p-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-4">
            <AvatorBio />
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  className="justify-start"
                  onClick={() => {
                    onSelect(item.id);
                    document.body.click(); // closes Sheet
                  }}
                >
                  {item.icon}
                  {item.label}
                </Button>
              ))}
              <Link
                className="justify-start pl-3 pr-3 pt-2 pb-2"
                href={"/Sasikumar_Semalaiyapan_Profile.pdf"}
                download={true}
              >
                <span className="flex items-center">
                  <DownloadIcon className="mr-2 h-4 w-4" />
                  <span className="ml-2 font-medium">Resume</span>
                </span>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-60 h-screen border-r bg-muted p-4">
        <nav className="flex flex-col gap-1 w-full">
          <AvatorBio />
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className="justify-start"
              onClick={() => onSelect(item.id)}
            >
              {item.icon}
              {item.label}
            </Button>
          ))}
          <Link
            className="justify-start pl-3 pr-3 pt-2 pb-2"
            href={"/Sasikumar_Semalaiyapan_Profile.pdf"}
            download={true}
          >
            <span className="flex items-center">
              <DownloadIcon className="mr-2 h-4 w-4" />
              <span className="ml-2 font-medium">Resume</span>
            </span>
          </Link>
        </nav>
      </aside>
    </>
  );
}
