import Image from "next/image";
import imgGalleryBottom from "@/assets/images/images/gallery-bottom.jpg";

export default function Gallery() {
  return (
    <section className="flex h-405 w-1080 border-b">
      <div className="flex w-180"></div>
      <div className="flex w-180 border-b-3"></div>
      <div className="flex w-540 justify-around border-b-3 py-2">
        <Image src={imgGalleryBottom} alt="Projet architecture" className="h-full object-cover" />
      </div>
    </section>
  );
}
