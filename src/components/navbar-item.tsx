import { INavbarLink } from "@/interfaces/routing";

export default function NavbarItem({
  link,
  active,
  onClick,
}: Readonly<{
  link: INavbarLink;
  active: boolean;
  onClick: () => void;
}>) {
  const { title, href } = link;
  const activeLinkUnderline = active ? "border-b-2" : "";

  return (
    <li
      className={`
      px-5 
      hover:scale-105 
      hover:bg-violet-800
      ${activeLinkUnderline} 
      w-44
      h-full
      text-center 
      transition-all 
      flex flex-row
      justify-center
      items-center
      select-none
      text-white
      font-semibold
      cursor-pointer
      `}
      onClick={onClick}
    >
      {title}
    </li>
  );
}
