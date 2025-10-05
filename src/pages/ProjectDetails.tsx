import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import project_7_1 from "@/assets/images/project_7_1.jpg";
import project_7_2 from "@/assets/images/project_7_2.jpg";
import project_7_3 from "@/assets/images/project_7_3.jpg";

const projects = [
  {
    id: 1,
    image: project_7_1,
    title: "Data Analytics System",
    tag: "Networking",
    desc: "Full detailed description for Data Analytics System.",
  },
  {
    id: 2,
    image: project_7_2,
    title: "IT Solution & Consultancy",
    tag: "Solution",
    desc: "Full detailed description for IT Solution & Consultancy.",
  },
  {
    id: 3,
    image: project_7_3,
    title: "Cloud Security Service",
    tag: "Networking",
    desc: "Full detailed description for Cloud Security Service.",
  },
];

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const project = projects.find((p) => p.id === Number(id));

  if (!project) return <div>Project not found</div>;

  return (
    <div className="py-20 dark:bg-gray-800 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-80 object-cover rounded-2xl mb-6"
        />
        <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {project.tag}
        </p>
        <p className="text-gray-700 dark:text-gray-300">{project.desc}</p>
        <Button
          className="mt-8 bg-primary text-white hover:bg-primary/70 rounded-full px-6 py-2"
          onClick={() => navigate(-1)}
        >
          ← Back
        </Button>   
      </div>
    </div>
  );
}
