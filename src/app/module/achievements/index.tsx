import { TrophyIcon } from "lucide-react";
import React from "react";

const Achievements = () => {
  return (
    <div>
      <span className="flex items-center">
        <TrophyIcon className="mr-2" />
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Achievements
        </h2>
      </span>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        I was honored to receive the &quot;Go the Extra Mile&quot; award for my
        exceptional dedication and commitment during a Quarter Apr – Jun 2023.
      </p>
    </div>
  );
};

export default Achievements;
