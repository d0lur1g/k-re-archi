import Image from "next/image";
import imgGalleryBottom from "@/assets/images/images/gallery-bottom.jpg";

export default function Gallery() {
  return (
    <section className="flex h-405 w-1080 flex-1 self-stretch">
      {/* Image centrée avec padding */}
      <div className="flex h-405 flex-1 flex-col items-center justify-center gap-10 self-stretch px-180 py-5 sm:px-360">
        <div className="h-[395px] w-540 flex-1 self-stretch">
          {/*<Image
            src={imgGalleryBottom}
            alt="Projet architecture"
            fill
            className="object-cover"
          />*/}
        </div>
      </div>
    </section>
  );
}
