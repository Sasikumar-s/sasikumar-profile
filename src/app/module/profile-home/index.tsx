"use client";
import React, { useRef } from "react";
import Sidebar from "../sidebar";
import AboutMe from "../about-me";

export default function ProfileHome() {
  const refs = {
    aboutMe: useRef<HTMLElement | null>(null),
    techSkill: useRef<HTMLElement | null>(null),
    experience: useRef<HTMLElement | null>(null),
    achievements: useRef<HTMLElement | null>(null),
    certification: useRef<HTMLElement | null>(null),
  };

  const scrollToSection = (key: SelectionKey) => {
    refs[key]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  type SelectionKey =
    | "aboutMe"
    | "techSkill"
    | "experience"
    | "achievements"
    | "certification";

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar onSelect={scrollToSection} />
      <main className="flex-1 overflow-y-auto p-6 space-y-20">
        <section ref={refs.aboutMe}>
          <AboutMe />
        </section>
        <section ref={refs.techSkill}>TechSkill </section>
        <section ref={refs.experience}>Experience</section>
        <section ref={refs.achievements}>Achievements</section>
        <section ref={refs.certification}>Certification</section>
      </main>
    </div>
  );
}
