export default function Introduction() {
  return (
    <section className="flex h-180 w-1080 border-b border-black">
      {/* Nom architecte - 2 lignes */}
      <div className="flex h-180 w-360 flex-col items-start justify-center border-b border-black bg-white px-12">
        <p className="font-amalfi -my-[70px] flex h-125 w-full items-center text-[40px] leading-[126px] text-black">
          Delphine
        </p>
        <p className="font-amalfi flex h-125 w-full items-center text-[40px] leading-[126px] text-black">
          DanielczyK
        </p>
      </div>

      {/* Description */}
      <div className="flex h-180 w-720 flex-1 flex-col items-start justify-center self-stretch px-6">
        <p className="font-amalfi flex h-108 w-full items-end self-stretch text-lg leading-[57px] text-black">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum lacus sit amet
          rhoncus tempor. Pellentesque nec venenatis lectus. Ut porta eu nisi ac dapibus. Quisque
          accumsan massa scelerisque odio ultrices sagittis. Class aptent taciti sociosqu ad litora
          torquent per conubia nostra, per inceptos himenaeos. Etiam vestibulum hendrerit facilisis.
          Morbi a nunc sapien. Integer non orci ante. Phasellus sollicitudin lobortis cursus.
        </p>
        <p className="font-amalfi flex h-[72px] w-full items-end self-stretch text-lg leading-[57px] text-black">
          Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
          himenaeos. Maecenas in cursus nisl, vitae egestas sem. Cras tempus lorem eros, at lacinia
          massa ullamcorper id. e egestas sem. Cras tempus lorem eros, at lacinia massa ullamcorper
          id.
        </p>
      </div>
    </section>
  );
}
