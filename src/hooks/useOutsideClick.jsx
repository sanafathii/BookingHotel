import React, { useEffect } from "react";

export default function useOutsideClick(ref, exeptionId, cb) {
  useEffect(() => {
    function handelOutSideClick(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        event.target.id !== exeptionId
      ) {
        cb();
      }
    }
    document.addEventListener("mousedown", handelOutSideClick);
    return () => {
      document.removeEventListener("mousedown", handelOutSideClick);
    };
  }, [ref, cb]);
}
