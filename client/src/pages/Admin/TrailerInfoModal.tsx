import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import trailerIdTutorial from "../../assets/images/modal/trailer_id_tutorial.png";
interface IPropsTrailerInfoModal {
  trailerInfoModal : boolean,
  setTrailerInfoModal: React.Dispatch<React.SetStateAction<boolean>>
}
export default function TrailerInfoModal(props : IPropsTrailerInfoModal) {
  const { trailerInfoModal, setTrailerInfoModal } = props;
  // Modal close on background click
  const modalOnMouseDown = (e : React.MouseEvent<HTMLDivElement>)=> {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  // Modal close
  const closeModal = () : void => {
    setTrailerInfoModal(false);
  };
  return (
    <>
      {trailerInfoModal ? (
        <div className="modal-container" onMouseDown={modalOnMouseDown}>
          <div className="modal-inner">
            <div className="modal-content">
              <div className="modal-title-container">
                <h2 className="modal-title">Kur ieškoti Trailer id ?</h2>
                <span className="modal-close-btn" onClick={() => closeModal()}>
                  <AiOutlineClose />
                </span>
              </div>
              <div className="modal-data">
                <h3 className="text-color-second mt-10"><span className="acc-color">1.</span> Užeikite į <a href="https://www.youtube.com" target="_blank" rel="noreferrer"><u>YouTube</u></a> puslapį. </h3>
                <h3 className="text-color-second mt-10"><span className="acc-color">2.</span> Susiraskite norimo filmo trailer'į.</h3>
                <h3 className="text-color-second mt-10"><span className="acc-color">3.</span> Nukopijuokite 11 simbolių kodą esantį nuorodoje po ?v=</h3>
                <img className="mt-10" src={trailerIdTutorial} width="100%"/>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
