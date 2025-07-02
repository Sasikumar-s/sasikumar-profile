import { ChevronRightIcon } from "lucide-react";
import React from "react";

const AboutMe = () => {
  return (
    <div>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        About
      </h2>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Full Stack Developer <br />
        (Java and React)
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Enthusiastic Full Stack Developer with 2.6 years of experience
        developing scalable web applications and 11 months in intern training.
        Strong knowledge of Front-End technology, best practices, and load speed
        optimization techniques Strong knowledge of Object-Oriented Concepts for
        software design and implementation.Basic Java Spring Boot Rest API,
        Database Technologies including RDMBS like Oracle SQL, MySQL and
        PostgreSQL. Good Technical, Interpersonal and Communication
        skills.Ability to learn and quickly get familiar with a complex business
        and systems environment.Good knowledge of JavaScript.
      </p>
      <div>
        <ul className="mt-2">
          <li className="flex mb-2">
            <ChevronRightIcon className="text-blue-500 font-bold" />
            <strong className="mr-3">Birth Day:</strong>
            <span>09 Oct 2001</span>
          </li>
          <li className="flex mb-2">
            <ChevronRightIcon className="text-blue-500 font-bold" />
            <strong className="mr-3">Phone:</strong>
            <span>+91-9500 421 893</span>
          </li>
          <li className="flex mb-2">
            <ChevronRightIcon className="text-blue-500 font-bold" />
            <strong className="mr-3">City:</strong>
            <span>Chennai, TamilNadu, India</span>
          </li>
          <li className="flex mb-2">
            <ChevronRightIcon className="text-blue-500 font-bold" />
            <strong className="mr-3">Degree:</strong>
            <span>BE - Computer Science and Engineering</span>
          </li>
          <li className="flex mb-2">
            <ChevronRightIcon className="text-blue-500 font-bold" />
            <strong className="mr-3">Email:</strong>
            <span>sasikumarbe2018@gmail.com</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AboutMe;
