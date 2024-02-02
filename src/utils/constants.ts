import { INavbarLink } from "@/interfaces/routing";

export const NavbarLinks: INavbarLink[] = [
    {
        title: "Home",
        href: "/"
    }
];

export enum State {
    STARTED = '1',
    COMPLETED = '2'
}