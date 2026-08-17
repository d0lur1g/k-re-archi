export default function Presentation() {
  return (
    <section className="flex h-180" aria-labelledby="presentation-heading">
      {/* Nom architecte - 2 lignes */}
      <h2 id="presentation-heading" className="sr-only">
        Architecte
      </h2>
      <div className="flex h-full w-360 flex-col border-b-3 px-12 py-30">
        <p className="font-display text-name w-full">Delphine</p>
        <p className="font-display text-name w-full">DanielczyK</p>
      </div>

      {/* Description */}
      <div className="leading-flush flex h-full w-720 flex-col px-6">
        <p className="font-display h-108 w-full content-around">
          <span className="font-display text-meta flex-1">L</span>
          <span className="font-body text-reading">
            orem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum lacus sit amet
            rhoncus tempor. Pellentesque nec venenatis lectus. Ut porta eu nisi ac dapibus. Quisque
            accumsan massa scelerisque odio ultrices sagittis. Class aptent taciti sociosqu ad
            litora torquent per conubia nostra, per inceptos himenaeos. Etiam vestibulum hendrerit
            facilisis. Morbi a nunc sapien. Integer non orci ante. Phasellus sollicitudin lobortis
            cursus.
          </span>
        </p>
        <p className="font-display h-72 w-full content-around">
          <span className="font-display text-meta flex-1">C</span>
          <span className="font-body text-reading">
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
