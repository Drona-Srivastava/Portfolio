import React from "react";
import Footer from "./Footer";
import techjam from "../assets/techjam.png";
import easycv from "../assets/EasyCV.png";

const ProjectCard = ({ image, title, description, git, technologies }) => {
  return (
    <div className="max-w-sm sm:max-w-sm md:max-w-sm bg-gray-900 border border-neutral-100 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      {title === "Tech Jam" && (
        <div>
          <img
            className="w-full rounded-t-lg h-auto object-cover "
            src={techjam}
            alt="techjam"
          />
        </div>
      )}
      {title === "Easy CV" && (
        <div>
          <img
            className="w-full rounded-t-lg h-auto object-cover "
            src={easycv}
            alt="EasyCv"
          />
        </div>  
      )}
      <div className="p-4 sm:p-6">
        {/* Remove invalid anchor, just use the heading */}
        <h5 className="text-2xl sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-pink-500">
          {title}
        </h5>
        <p className="font-normal text-sm sm:text-base md:text-lg text-gray-300 dark:text-gray-400">
          {description}
        </p>
      </div>
      <div className="m-2 sm:m-4 lg:m-6 flex justify-between">
        <div className="flex flex-wrap gap-2 pl-2">
          {technologies.map((tag, index) => (
            <p key={`${index}-${tag}`} className="text-[14px] text-blue-500">
              #{tag}
            </p>
          ))}
        </div>
        <a
          href={git}
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-300 border border-gray-200 rounded-lg shadow p-1 sm:p-2 lg:p-3 hover:text-green-500 duration-300"
        >
          GitHub
        </a>
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <div className="bg-black overflow-x-hidden">
      <div className="flex flex-wrap gap-7 justify-center items-center m-12 p-12">
        {project.map((item, index) => (
          <ProjectCard
            key={index}
            image={item.image}
            title={item.title}
            description={item.description}
            links={item.links}
            git={item.git}
            technologies={item.technologies}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export const project = [
  {
    title: "Easy CV",
    description:
      "EasyCV is a customizable web-based resume builder designed to simplify the resume creation process for students and professionals. Users can input their details and choose from multiple professional templates with real-time preview. The project is currently being enhanced with AI features to auto-generate resumes by extracting data from LinkedIn and GitHub profiles and making process even more efficient.",
    image: { easycv },
    git: "https://github.com/Drona-Srivastava/Resume-Generator",
    technologies: ["ReactJS", "CSS"],
  },
  {
    title: "Tech Jam",
    description:
      "A responsive web application built for the ACM Club’s TechJam event to streamline access to technical lecture content and gamify student engagement. The platform provided a centralized space for students to view sessions on various technologies and track their learning progress. It featured a real-time leaderboard that dynamically updated participant scores, enhancing competition and motivation throughout the event.",
    image: { techjam },
    git: "https://github.com/Drona-Srivastava/techjam",
    technologies: ["React JS", "CSS"],
  },
];

export default Projects;