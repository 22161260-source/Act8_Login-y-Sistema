import "./Paginacion.css";

const OPCIONES_LIMITE = [10, 20, 40, 50];

function Paginacion({ page, limit, total, onCambiarPage, onCambiarLimit }) {
  const totalPaginas = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="paginacion">
      <div className="paginacion-info">
        {total === 0 ? "Sin resultados" : `${total} resultado(s) · página ${page} de ${totalPaginas}`}
      </div>

      <div className="paginacion-controles">
        <label className="paginacion-limite">
          Mostrar:
          <select value={limit} onChange={(e) => onCambiarLimit(Number(e.target.value))}>
            {OPCIONES_LIMITE.map((opcion) => (
              <option key={opcion} value={opcion}>
                {opcion}
              </option>
            ))}
          </select>
        </label>

        <button onClick={() => onCambiarPage(page - 1)} disabled={page <= 1}>
          ‹ Anterior
        </button>
        <span className="paginacion-numero">{page}</span>
        <button onClick={() => onCambiarPage(page + 1)} disabled={page >= totalPaginas}>
          Siguiente ›
        </button>
      </div>
    </div>
  );
}

export default Paginacion;
