import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LinkIcon, LogOut} from "lucide-react";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UrlState } from "../context";
  import {logout} from "@/db/apiAuth"
  import useFetch from "../hooks/use-fetch";
import { BarLoader } from "react-spinners";
// import scissors from "../assets/scissors.PNG"
import logo from "../assets/sniplogo.png"

const Header = () => {
  const navigate = useNavigate();
  const { user, fetchUser } = UrlState()

  const {loading, fn:fnLogout} = useFetch(logout);


  return (
    <>
    <nav className="p-4 flex justify-between items-center">
      <Link to="/">
        <img
          src={logo}
          alt="scissorslogo"
          className="h-28"
        />
      </Link>
      <div>
        {!user ? (
          <Button variant="outline" onClick={() => navigate("/auth")}>Login</Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
            <Avatar>
  <AvatarImage src={user?.user_metadata?.profile_pic} />
  <AvatarFallback>SA</AvatarFallback>
</Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{user?.user_metadata?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                  <Link to="/dashboard" className="flex">
                    <LinkIcon className="mr-2 h-4 w-4" />
                    My Links
                  </Link>
                </DropdownMenuItem>
              <DropdownMenuItem className="text-red-400">
                <LogOut className="mr-2 h-4 w-4" />
               <span onClick={() => {
                fnLogout().then(() => {
                  fetchUser()
                   navigate("/")
                })
               
               }}>Logout</span> </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

    </nav>  
        {loading && <BarLoader className="mb-4" width={"100%"} color="#ffad03" />}
    </>
  );
};

export default Header;
