import Image from "next/image";
import imgHeroTop from "@/assets/images/images/hero-top.jpg";

export default function Hero() {
  return (
    <section className="flex h-270 items-start justify-center">
      <div className="flex h-full w-540 flex-col px-195">
        <div className="flex h-full w-full flex-col justify-around py-15">
          <div className="gap-10">
            <span className="font-baiti text-6xl leading-[30%]">R</span>
            <span className="font-baiti text-3xl">éinventer</span>
          </div>
          <div className="gap-10">
            <span className="font-baiti text-6xl leading-[30%]">R</span>
            <span className="font-baiti text-600 text-3xl font-medium">
              éhabiliter <br />
            </span>
          </div>
          <div>
            <span className="font-baiti text-6xl leading-[30%]">R</span>
            <span className="font-baiti text-3xl">
              énover <br />
            </span>
          </div>
          <div>
            <span className="font-baiti text-6xl leading-[30%]">R</span>
            <span className="font-baiti text-3xl">
              éaliser <br />
            </span>
          </div>
          <div>
            <span className="font-baiti text-6xl leading-[30%]">R</span>
            <span className="font-baiti text-3xl">êver</span>
          </div>
        </div>
      </div>
      <div className="relative w-540 items-start justify-start gap-10">
        <Image
          className="h-270 self-stretch object-cover"
          src={imgHeroTop}
          alt="Architecture moderne K-Ré"
          priority
        />
      </div>
    </section>
  );
}
