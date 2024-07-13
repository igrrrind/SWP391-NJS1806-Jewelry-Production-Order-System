import React from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const DesignLightbox = ({ slides, isOpen, onClose }) => {
  return (
    (
      <Lightbox
        slides={[slides.map((src) => ({ url: src }))]}
        onClose={onClose}
        open={isOpen}
      />
    )
  );
};

export default DesignLightbox;
