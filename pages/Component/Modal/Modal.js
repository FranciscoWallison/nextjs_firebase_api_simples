import React from "react";

const Modal = props => {
    const { hidden, openClose, textoModal, formSubmit } = props;

    return(
        <div className={`modal fade ${hidden ? 'show' : 'hide' }`} id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"  style={{display: hidden ? 'block' : 'none' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">{textoModal}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => openClose()}></button>
                </div>
                <form onSubmit={(e) => formSubmit(e)}>
                    <div className="modal-body">
                       
                            <div class="mb-3">
                                <label for="nome" class="form-label">Nome</label>
                                <input type="text" class="form-control" id="nome" aria-describedby="nome"/>
                                <div id="nome" class="form-text">Nome do usuário</div>
                            </div>
                            <div class="mb-3"> 
                                <label for="Email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="Email" aria-describedby="Email"/>
                                <div id="Email" class="form-text">Email do usuário</div>
                            </div>
                            <div class="mb-3">
                                <label for="idade" class="form-label">Idade</label>
                                <input type="text" class="form-control" id="idade" aria-describedby="idade"/>
                                <div id="idade" class="form-text">Idade do usuário</div>
                            </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => openClose()} >Fechar</button>
                        <button className="btn btn-primary"  type="submit" >Salvar</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    )
}

export default Modal;