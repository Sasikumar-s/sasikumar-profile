import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Code2Icon } from "lucide-react";

const TechnicalSkills = () => {
  return (
    <div className="my-6 w-fit overflow-y-auto">
      <span className="flex items-center">
        <Code2Icon className="mr-2" />
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Technical Skill
        </h2>
      </span>
      <Table className="border-2">
        <TableBody>
          <TableRow>
            <TableCell>Programming Languages</TableCell>
            <TableCell>Java, JavaScript, Type Script, PL/SQL</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Web Technologies</TableCell>
            <TableCell>
              React, Next.js, Angular, Lit Element, Open-wc, HTML, CSS
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Databases</TableCell>
            <TableCell>Oracle SQL Developer, MySQL, PostgreSQL </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Application Server</TableCell>
            <TableCell>Tomcat 10 </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Frameworks</TableCell>
            <TableCell>Spring-6, SpringBoot3, SpringBoot REST API </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>State Management</TableCell>
            <TableCell>Redux library </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Version Control</TableCell>
            <TableCell>
              Git Bash (Local repo), Git Hub, Azure Devops (Remote Origin), SVN{" "}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tools & IDEs</TableCell>
            <TableCell>
              Visual Studio Code, STS 4, Oracle form builder, Oracle SQL
              Developer{" "}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default TechnicalSkills;
