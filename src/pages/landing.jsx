import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import landinglogo from "../assets/landinglogo.jpg"
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const [longUrl, setLongUrl] = useState('');
    const navigate = useNavigate();

    const handleShorten = (e) => {
        e.preventDefault();
        if (longUrl) navigate(`/auth?createNew=${longUrl}`)
    }
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-orange-600 my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold">
        Shorten your <span className="text-amber-400">loooooooooong </span>URLs <br /> like nerver before !
      </h2>
      <form onSubmit={handleShorten} className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2">
        <Input
          type="url"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Enter your lonngggg URL"
          className="h-full flex-1 py-4 px-4"
        />
        <Button className="h-full bg-amber-400 hover:bg-orange-600" type="submit">
          Shorten
        </Button>
      </form>
      <img
        src={landinglogo}
        alt="banner"
        className="w-full my-11 md:px-11"
      />

      {/* <Accordion type="multiple" collapsible className="w-full md:px-11 ">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How does the shortner work?</AccordionTrigger>
          <AccordionContent>
            When you enter a long URL, our system generates a shorter verion of your URL .
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>How does the shortner work?</AccordionTrigger>
          <AccordionContent>
            When you enter a long URL, our system generates a shorter verion of your URL .
          </AccordionContent>
        </AccordionItem>
      </Accordion> */}
    </div>
  );
};

export default LandingPage;
