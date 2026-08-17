import Image from "next/image";
import Link from "next/link";
import { DisplayedProject } from "@/types/project";
import { PROJECT_CARD } from "@/lib/constants";

interface ProjectCardProps {
  project: DisplayedProject;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { displayImages, layout, slug, title, location } = project;
  const { BASE_SIZE, PADDING, GAP } = PROJECT_CARD;
  const containerSize = BASE_SIZE - PADDING * 2;

  // Déterminer les classes Tailwind selon le layout
  const getGridClasses = (): string => {
    switch (layout) {
      case "2x2":
        return `grid grid-cols-2 grid-rows-2`;
      case "2-horizontal":
        return `grid grid-cols-1 grid-rows-2`;
      case "2-vertical":
        return `grid grid-cols-2 grid-rows-1`;
      case "1-single":
        return "grid grid-cols-1 grid-rows-1";
    }
  };

  return (
    <Link href={`/projects/${slug}`}>
      <div
        className="group bg-placeholder relative cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg"
        style={{
          width: `${BASE_SIZE}px`,
          height: `${BASE_SIZE}px`,
          flexShrink: 0,
          padding: `${PADDING}px`,
        }}
      >
        {/* Conteneur grille avec effet grayscale */}
        <div
          className={`h-full w-full grayscale transition-all duration-500 group-hover:grayscale-0 ${getGridClasses()}`}
          style={{
            gap: `${GAP}px`,
          }}
        >
          {displayImages.map((image) => (
            <div key={image.id} className="bg-placeholder relative h-full w-full overflow-hidden">
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover"
                sizes={`${containerSize}px`}
              />
            </div>
          ))}
        </div>

        {/* Overlay avec titre au hover */}
        <div className="from-overlay/70 absolute inset-0 flex items-end bg-linear-to-t to-transparent p-12 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="font-body text-ink-inverse text-subtitle leading-flush">
            <p>{title}</p>
            {location && <p className="font-display text-subtitle pt-12">{location}</p>}
          </div>
        </div>
      </div>
    </Link>
  );
}
