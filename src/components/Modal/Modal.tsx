import React from "react";
import { useEffect } from "react";
import { IUser } from "../../models/models";
import { ModalBackdrop, ModalContent } from "./Modal.styled";

interface Props {
  onClose: () => void;
  detailsObject: IUser;
}

export default function Modal({ detailsObject, onClose }: Props) {
  console.log(detailsObject);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === "Escape") {
      onClose();
    }
  };

  const handleBackDropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };
  return (
    <ModalBackdrop onClick={handleBackDropClick}>
      <ModalContent>
        <h2>Flight name: {detailsObject.name}</h2>
        <p>Fligh number:{detailsObject.flight_number}</p>
        {detailsObject.details && (
          <p>Flight details: {detailsObject.details}</p>
        )}
        <p>Year of the flight:{detailsObject.date_utc.slice(0, 4)}</p>
      </ModalContent>
    </ModalBackdrop>
  );
}
