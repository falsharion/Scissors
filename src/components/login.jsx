import React from "react";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import Error from "./error";
import {login} from "@/db/apiAuth";
import { useEffect,useState } from "react"
import {useNavigate, useSearchParams} from "react-router-dom";
import * as Yup from "yup";
import useFetch from "@/hooks/use-fetch";
import {UrlState} from "@/context";


const Login = () => {
    let [searchParams] = useSearchParams();
    const longLink = searchParams.get("createNew");
  
    const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const {loading, error, fn: fnLogin, data} = useFetch(login, formData);
  const {fetchUser} = UrlState();

  useEffect(() => {
    if (error === null && data) {

      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
            fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, data]);


  const handleLogin = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is Required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is Required"),
      });
      await schema.validate(formData, { abortEarly: false });
      await fnLogin();
    } catch (e) {
      const newErrors = {};

      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
         to your account if you already have one
        </CardDescription>
        {errors &&  <Error message={errors.message} />}
      </CardHeader>
      <CardContent className="space-y-2 ">
        <div className="space-y-1">
          <Input
            name="email"
            type="email"
            onChange={handleInputChange}
            placeholder="Enter Email"
          />
         {errors.email &&  <Error message={errors.email} />}
        </div>
        <div className="space-y-1">
          <Input
            name="password"
            type="password"
            onChange={handleInputChange}
            placeholder="Enter Password"
          />
         {errors.password &&  <Error message={errors.password} />}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleLogin}>
          {loading ? <BeatLoader size={10} color="#ffad03" /> : "Login"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
