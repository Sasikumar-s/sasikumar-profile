import { BookOpenCheck } from "lucide-react";

const Certifications = () => {
  const certificates = [
    {
      certificateTitle: "ASP.NET CORE WEB API | The Complete Guide",
    },
    {
      certificateTitle: "AJAX Development",
    },
    {
      certificateTitle:
        "The Complete jQuery Course: From Beginner to Advanced!",
    },
    {
      certificateTitle: "Azure DevOps Fundamentals for Beginners",
    },
  ];

  return (
    <div>
      <span className="flex items-center">
        <BookOpenCheck className="mr-2" />
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Certifications
        </h2>
      </span>
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
        {certificates.map((elm, index) => {
          return <li key={index}>{elm.certificateTitle}</li>;
        })}
      </ul>
    </div>
  );
};

export default Certifications;
