'use client';

import { SafeUser } from "@/app/types";

import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Categories from "./Categories";

// here we are using SafeUser bcz it's giving the error of date type and in safe file, we are just converting the type into string. So here i have satitize the current user
interface NavProps {
  currentUser?: SafeUser | null
}

const Nav: React.FC<NavProps> = ({
  currentUser,
}) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div
        className="
          py-4 
          border-b-[1px]
        "
      >
        <Container>
          <div 
            className="
              flex 
              flex-row 
              items-center 
              justify-between
              gap-3
              md:gap-0
            "
          >
            <Logo />
            <Search />
            <UserMenu currentUser = {currentUser}/>
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  )
}

export default Nav