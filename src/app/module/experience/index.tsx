import React from "react";
import "@/app/module/experience/style/style.css";
import { BriefcaseBusiness } from "lucide-react";

const Experience = () => {
  return (
    <>
      <span className="flex items-center">
        <BriefcaseBusiness className="mr-2" />
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Professional Experience
        </h2>
      </span>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,300px))] gap-2">
        <div className="border-l-2 border-l-blue-500">
          <div className="ml-2.5">
            <h2 className="font-bold">PROGRAMMER</h2>
            <blockquote className="mt-6 border-l-2 pl-6 italic">
              Jan 2025 - Present
            </blockquote>
            <h3>Chennai, India</h3>
            <p>Worked on Next.Js, React Projects</p>
          </div>
        </div>

        <div className="border-l-2 border-l-blue-500">
          <div className="ml-2.5">
            <h2 className="font-bold">TRAINEE PROGRAMMER</h2>
            <blockquote className="mt-6 border-l-2 pl-6 italic">
              Sep 2022 - Dec 2024
            </blockquote>
            <h3>Chennai, India</h3>
            <p>
              Javascript - Lit Element, Java - Spring Boot REST API, SQL -
              ORACLE Datatbase
            </p>
          </div>
        </div>

        <div className="border-l-2 border-l-blue-500">
          <div className="ml-2.5">
            <h2 className="font-bold">INTERN</h2>
            <blockquote className="mt-6 border-l-2 pl-6 italic">
              Sep 2021 - Aug 2022
            </blockquote>
            <h3>Chennai, India</h3>
            <p>Trained in Java Fullstack, Angular, SQL</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Experience;
