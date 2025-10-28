import Image from "next/image";
import imgGalleryBottom from "@/assets/images/images/gallery-bottom.jpg";

export default function Gallery() {
  return (
    <section className="flex h-405 w-1080 flex-1 self-stretch pr-180 pl-360">
      {/* Image centrée avec padding */}
      <div className="x-540 flex h-405 flex-1 flex-col items-center justify-center gap-10 self-stretch">
        <Image
          src={imgGalleryBottom}
          alt="Projet architecture"
          className="h-full self-stretch object-cover pb-5 outline-offset-2"
        />
      </div>
    </section>
  );
}
