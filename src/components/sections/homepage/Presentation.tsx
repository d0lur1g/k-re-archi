export default function Presentation() {
  return (
    <section className="flex h-180" aria-labelledby="presentation-heading">
      {/* Nom architecte - 2 lignes */}
      <h2 id="presentation-heading" className="sr-only">
        Architecte
      </h2>
      <div className="flex h-full w-360 flex-col border-b px-12 py-30">
        <p className="font-amalfi w-full text-[40px]">Delphine</p>
        <p className="font-amalfi w-full text-[40px]">DanielczyK</p>
      </div>

      {/* Description */}
      <div className="flex h-full w-720 flex-col px-6 leading-[100%]">
        <p className="font-amalfi h-108 w-full content-around">
          <span className="font-amalfi flex-1 text-[20px]">L</span>
          <span className="font-baiti text-[18px]">
            orem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum lacus sit amet
            rhoncus tempor. Pellentesque nec venenatis lectus. Ut porta eu nisi ac dapibus. Quisque
            accumsan massa scelerisque odio ultrices sagittis. Class aptent taciti sociosqu ad
            litora torquent per conubia nostra, per inceptos himenaeos. Etiam vestibulum hendrerit
            facilisis. Morbi a nunc sapien. Integer non orci ante. Phasellus sollicitudin lobortis
            cursus.
          </span>
        </p>
        <p className="font-amalfi h-72 w-full content-around">
          <span className="font-amalfi flex-1 text-[20px]">C</span>
          <span className="font-baiti text-[18px]">
            lass aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
            himenaeos. Maecenas in cursus nisl, vitae egestas sem. Cras tempus lorem eros, at
            lacinia massa ullamcorper id. e egestas sem. Cras tempus lorem eros, at lacinia massa
            ullamcorper id.
          </span>
        </p>
      </div>
    </section>
  );
}
