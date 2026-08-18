import { MotionCarousel } from "@/components/animate-ui/components/community/motion-carousel";
import ProjectFlipCard, {
  type ProjectFlipCardProps,
} from "./ProjectFlipCard";

const CAROUSEL_OPTIONS = { loop: true };

export default function ProjectCarousel({
  projects,
}: {
  projects: ProjectFlipCardProps[];
}) {
  return (
    <MotionCarousel
      options={CAROUSEL_OPTIONS}
      labels={projects.map((_, index) => `Slide ${index + 1}`)}
      slides={projects.map((project, index) => (
        <ProjectFlipCard key={`${project.name}-${index}`} {...project} />
      ))}
    />
  );
}
