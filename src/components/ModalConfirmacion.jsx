import "./Modal.css";

function ModalConfirmacion({ titulo, mensaje, onConfirmar, onCancelar }) {
  return (
    <div className="modal-fondo" onClick={onCancelar}>
      <div className="modal-caja modal-chica" onClick={(e) => e.stopPropagation()}>
        <h3>{titulo}</h3>
        <p>{mensaje}</p>
        <div className="modal-acciones">
          <button className="btn-secundario" onClick={onCancelar}>
            Cancelar
          </button>
          <button className="btn-peligro" onClick={onConfirmar}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirmacion;
