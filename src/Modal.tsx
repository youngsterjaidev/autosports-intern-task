import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  z-index: 1;
`;

const Content = styled.div`
  width: 100%;
  padding: 1em;
  z-index: 1;
`;

const CloseWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #0000001a;
  z-index: -1;
`;

// @ts-ignore
const Modal = ({ children, setShowModal }) => {
  const elRef = useRef(null);

  if (!elRef.current) {
		// @ts-ignore
    elRef.current = document.createElement("div");
  }

	// @ts-ignore
  useEffect(() => {
		// @ts-ignore
		const ModalRoot: HTMLDivElement = document.getElementById("modal");
		// @ts-ignore
    ModalRoot.appendChild(elRef.current);
		// @ts-ignore
    return () => ModalRoot.removeChild(elRef.current);
  }, []);

  return createPortal(
    <Container>
      <Content>{children}</Content>
      <CloseWrapper
        onClick={() => {
          console.log("Close Wrapper");
          setShowModal(false);
        }}
      ></CloseWrapper>
    </Container>,
		// @ts-ignore
    elRef.current
  );
};

export default Modal;
