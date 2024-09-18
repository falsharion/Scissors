import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import {UrlState} from "@/context";

import Login from "../components/login"
import Signup from "../components/signup"
import authlogo from "../assets/authlogo.png"

const Auth = () => {
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get('createNew')
  const navigate = useNavigate()

  const {isAuthenticated, loading } = UrlState();

  useEffect (() => {
    if(isAuthenticated && !loading){
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`)
    }
  }, [isAuthenticated, loading])
  return (
    <div className="flex justify-center w-full md:mx-2">
    <div className="mt-20 flex mx-8 flex-col items-center gap-10">
      <h1 className="text-3xl md:text-5xl font-extrabold">
        {longLink
          ? "Hold up! Let's login first.."
          : "Login / Signup"}
      </h1>
      <Tabs defaultValue="Login" className="w-[300px] md:w-[500px] mx-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="Login">Login</TabsTrigger>
          <TabsTrigger value="Signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="Login">
          <Login />
        </TabsContent>
        <TabsContent value="Signup"><Signup /></TabsContent>
      </Tabs>
    </div>
    <img
        src={authlogo}
        alt="authpagelogo"
        className="hidden w-2/4 my-11 md:px-11 lg:block "
      />
    </div>
  );
};

export default Auth;
