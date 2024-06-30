import { Link, Outlet } from "react-router-dom";

import Logo from "../assets/Logo";
import ModalInfo from "./ModalInfo";

export default function Layout() {

  return (
    <>
      <header className="d-flex py-2 px-3 border-bottom">
        <Link className="d-flex align-items-center me-auto" to="/TransportationForecasting/">
          <Logo size={1.7}/>
        </Link>
        <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#modalInfo"><i className="bi bi-info-lg"/></button>
      </header>
      <main className="h-100">
        <Outlet />
      </main>
      <ModalInfo id="modalInfo"/>
    </>
  );
}
