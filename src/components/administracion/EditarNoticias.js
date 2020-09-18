import React, { useState, useRef, Fragment } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import Alert from "react-bootstrap/Alert";
import { withRouter } from "react-router-dom";
import NavbarAdmin from "./common/NavbarAdmin";
import Jumbotron from 'react-bootstrap/Jumbotron'

const EditarNoticias = (props) => {
  // genero mis ref
  const tituloNoticiaRef = useRef("");
  const descripcionBreveRef = useRef("");
  const descripcionDetalladaRef = useRef("");
  const imagenPrincipalRef = useRef("");
  const autorRef = useRef("");
  const fechaRef = useRef("");
  ///
  const [categoria, setCategoria] = useState("");
  const [principalPortada, setPrincipalPortada] = useState("");
  const [principalCategoria, setPrincipalCategoria] = useState("");
  ///
  const seleccionarCategoria = (e) => {
    setCategoria(e.target.value);
  };
  ///
  //portada principal
  const portadaPrincipal = (e) => {
    if (e.target.value === "true") {
      setPrincipalPortada("true");
    } else {
      setPrincipalPortada("false");
    }
  };

  //portada categoria
  const portadaCategoria = (e) => {
    if (e.target.value === "true") {
      setPrincipalCategoria("true");
    } else {
      setPrincipalCategoria("false");
    }
  };
  // me creo un state que me va a servir para mostrar el error
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const _categoria = categoria === "" ? props.noticia.categoria : categoria;
    const _principalPortada =
      principalPortada === ""
        ? props.noticia.principalPortada
        : principalPortada;
    const _principalCategoria =
      principalCategoria === ""
        ? props.noticia.principalCategoria
        : principalCategoria;
    //validar los datos

    if (
      tituloNoticiaRef.current.value.trim() === "" ||
      descripcionBreveRef.current.value.trim() === "" ||
      descripcionDetalladaRef.current.value.trim() === "" ||
      imagenPrincipalRef.current.value.trim() === "" ||
      autorRef.current.value.trim() === "" ||
      _categoria === "" ||
      principalPortada === "" ||
      _principalCategoria === "" ||
      fechaRef.current.value.trim() === ""
    ) {
      //mostrar un cartel de error
      setError(true);
      return;
    }

    setError(false);

    //preparar el objeto a enviar
    const noticiaEditada = {
      tituloNoticia: tituloNoticiaRef.current.value,
      descripcionBreve: descripcionBreveRef.current.value,
      descripcionDetallada: descripcionDetalladaRef.current.value,
      imagenPrincipal: imagenPrincipalRef.current.value,
      categoria: _categoria,
      autor: autorRef.current.value,
      principalPortada: _principalPortada,
      principalCategoria: _principalCategoria,
      fecha: fechaRef.current.value,
    };
    //envio los cambios a la api
    try {
      const respuesta = await fetch(
        `http://localhost:4000/noticia/${props.noticia.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(noticiaEditada),
        }
      );
      console.log(respuesta);

      if (respuesta.status === 200) {
        //efectivamente se modifico el producto
        props.setRecargarNoticias(true);
        Swal.fire(
          "noticia modificada",
          "La noticia fue modificada correctamente",
          "success"
        );
        props.history.push("/noticias");
      }
    } catch (datosError) {
      console.log(datosError);
      //cartelito para el usuario
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ocurrio un error, intentelo nuevamente",
      });
    }
  };

  return (
    <Fragment>

      <NavbarAdmin></NavbarAdmin>
      <section className=" my-4 d-flex justify-content-center">
        <Jumbotron className="w-75 d-flex justify-content-center">
          <Form className="w-75 mb-5" onSubmit={handleSubmit}>
            <h2 className="text-center mb-4">Editar Noticia</h2>
            <Form.Group>
              <Form.Label className="font-weight-bold">
                Titulo de la noticia
            </Form.Label>
              <Form.Control
                type="text"
                placeholder=" Ej: boca es campeon de la liga"
                name="titulo"
                ref={tituloNoticiaRef}
                defaultValue={props.noticia.tituloNoticia}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="font-weight-bold">
                Descripcion breve
            </Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: boca campeon"
                name="descripcion breve"
                ref={descripcionBreveRef}
                defaultValue={props.noticia.descripcionBreve}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="font-weight-bold">
                Descripcion detallada
            </Form.Label>
              <Form.Control
                type="text"
                placeholder=" Ej: boca gano 2 a 0"
                name="descripcion breve"
                ref={descripcionDetalladaRef}
                defaultValue={props.noticia.descripcionDetallada}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="font-weight-bold">
                Imagen principal(solo url)
            </Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: url( )"
                name="imagen principal"
                ref={imagenPrincipalRef}
                defaultValue={props.noticia.imagenPrincipal}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="font-weight-bold">Autor</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: rodrigo Perez"
                name="descripcion breve"
                ref={autorRef}
                defaultValue={props.noticia.autor}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="font-weight-bold">Fecha</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: 06/09/2020"
                name="fecha"
                ref={fechaRef}
                defaultValue={props.noticia.fecha}
              />
            </Form.Group>
            <div className="text-center">
              <Form.Label className="font-weight-bold">Categoria</Form.Label>
            </div>
            <Form.Group className="d-flex justify-content-center">
              <div className="row">
                <div className="mx-2">
                  <Form.Check
                    type="radio"
                    label="Actualidad"
                    name="categoria"
                    value="actualidad"
                    onChange={seleccionarCategoria}
                    defaultChecked={props.noticia.categoria === "actualidad"}
                  />
                  <Form.Check
                    type="radio"
                    label="Deporte"
                    name="categoria"
                    value="deporte"
                    onChange={seleccionarCategoria}
                    defaultChecked={props.noticia.categoria === "deporte"}
                  />
                </div>
                <div className="mx-2">
                <Form.Check
                  type="radio"
                  label="Economia"
                  name="categoria"
                  value="economia"
                  onChange={seleccionarCategoria}
                  defaultChecked={props.noticia.categoria === "economia"}
                />
                  <Form.Check
                    type="radio"
                    label="Espectaculo"
                    name="categoria"
                    value="espectaculo"
                    onChange={seleccionarCategoria}
                    defaultChecked={props.noticia.categoria === "espectaculo"}
                  />
                </div>
                <div className="mx-2">
                  <Form.Check
                    type="radio"
                    label="Fotografia"
                    name="categoria"
                    value="fotografia"
                    onChange={seleccionarCategoria}
                    defaultChecked={props.noticia.categoria === "fotografia"}
                  />
                  <Form.Check
                    type="radio"
                    label="Politica"
                    name="categoria"
                    value="politica"
                    onChange={seleccionarCategoria}
                    defaultChecked={props.noticia.categoria === "politica"}
                  />
                </div>
                <div className="mx-2">
                  <Form.Check
                    type="radio"
                    label="Salud"
                    name="categoria"
                    value="salud"
                    onChange={seleccionarCategoria}
                    defaultChecked={props.noticia.categoria === "salud"}
                  />
                  <Form.Check
                    type="radio"
                    label="Tecnologia"
                    name="categoria"
                    value="tecnologia"
                    onChange={seleccionarCategoria}
                    defaultChecked={props.noticia.categoria === "tecnologia"}
                  />
                </div>
              </div>
            </Form.Group>
            <Form.Group className="text-center">
              <Form.Label className="font-weight-bold">
                Portada Principal
            </Form.Label>
              <div className="d-flex justify-content-center">
                <Form.Check
                  type="radio"
                  label="Si"
                  name="portadaPrincipal"
                  value="true"
                  className="mr-3"
                  onChange={portadaPrincipal}
                  defaultChecked={props.noticia.principalPortada === "true"}
                />
                <Form.Check
                  type="radio"
                  label="No"
                  name="portadaPrincipal"
                  value="false"
                  onChange={portadaPrincipal}
                  defaultChecked={props.noticia.principalPortada === "false"}
                />
              </div>
            </Form.Group>
            <Form.Group className="text-center">
              <Form.Label className="font-weight-bold">
                Portada Categoria
            </Form.Label>
              <div className="d-flex justify-content-center">
                <Form.Check
                  type="radio"
                  label="Si"
                  name="portadaCategoria"
                  value="true"
                  className="mr-3"
                  onChange={portadaCategoria}
                  defaultChecked={props.noticia.principalCategoria === "true"}
                />
                <Form.Check
                  type="radio"
                  label="No"
                  name="portadaCategoria"
                  value="false"
                  onChange={portadaCategoria}
                  defaultChecked={props.noticia.principalCategoria === "false"}
                />
              </div>
            </Form.Group>
            {error === true ? (
              <Alert variant={"danger"}>Todos los campos son obligatorios</Alert>
            ) : null}
            <Button variant="success" type="submit" className="w-100 my-5">
              Editar Noticia
          </Button>
          </Form>
        </Jumbotron>
      </section>

    </Fragment >
  );
};

export default withRouter(EditarNoticias);
