import React, { useState, useRef } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Swal from 'sweetalert2'
import Alert from "react-bootstrap/Alert";
import { withRouter} from 'react-router-dom';

const EditarNoticias = (props) => {

// genero mis ref
const tituloNoticiaRef = useRef("");
const descripcionBreveRef = useRef("");
const descripcionDetalladaRef = useRef("");
const imagenPrincipalRef = useRef("");
const autorRef = useRef("");
const fechaRef = useRef("");

const [categoria, setCategoria] = useState("");
// me creo un state que me va a servir para mostrar el error
const [error, setError] = useState(false);

// me creo una funcion para selecionar la categoria
const seleccionarCategoria = (e) => {
    setCategoria(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    //validar los datos
    const _categoria = categoria === "" ? props.noticia.categoria : categoria;
    console.log(_categoria);
    
    if (
        tituloNoticiaRef.current.value.trim() === "" ||
        descripcionBreveRef.current.value.trim() === "" ||
        descripcionDetalladaRef.current.value.trim() === "" ||
        imagenPrincipalRef.current.value.trim() === "" ||
        autorRef.current.value.trim() === "" ||
        fechaRef.current.value.trim() === "" ||
        _categoria === ""
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
        fecha: fechaRef.current.value
      }
      //envio los cambios a la api
      try{
        const respuesta = await fetch(`http://localhost:4000/noticia/${props.noticia.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(noticiaEditada)
        })
        console.log(respuesta);

        if(respuesta.status === 200){
          //efectivamente se modifico el producto
          props.setRecargarNoticias(true);
          Swal.fire(
            'noticia modificada',
            'La noticia fue modificada correctamente',
            'success'
          )
          props.history.push("/noticias");
        }
  
      }catch(datosError){
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
        <section className="container my-4 d-flex justify-content-center">
        <Form className="w-75 mb-5" onSubmit={handleSubmit}>
          <h1 className="text-center mb-4">Editar Noticia</h1>
          <Form.Group>
            <Form.Label className="font-weight-bold">Titulo de la noticia</Form.Label>
            <Form.Control
              type="text"
              placeholder=" Ej: boca es campeon de la liga"
              name="titulo"
              ref={tituloNoticiaRef}
              defaultValue={props.noticia.tituloNoticia}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="font-weight-bold">Descripcion breve</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: boca campeon"
              name="descripcion breve"
              ref={descripcionBreveRef}
              defaultValue={props.noticia.descripcionBreve}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="font-weight-bold">Descripcion detallada</Form.Label>
            <Form.Control
              type="text"
              placeholder=" Ej: boca gano 2 a 0"
              name="descripcion breve"
              ref={descripcionDetalladaRef}
              defaultValue={props.noticia.descripcionDetallada}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="font-weight-bold">Imagen principal(solo url)</Form.Label>
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
          <h3 className="text-center">Categoria</h3>
          <div className="text-center my-4">
            <Form.Check
              inline
              type="radio"
              name="categoria"
              label="Actualidad"
              value="actualidad"
              onChange={seleccionarCategoria}
              defaultChecked={props.noticia.categoria === "actualidad"}
            />
            <Form.Check
              inline
              type="radio"
              name="categoria"
              label="Deportes"
              value="deportes"
              onChange={seleccionarCategoria}
              defaultChecked={props.noticia.categoria === "deportes"}
            />
            <Form.Check
              inline
              type="radio"
              name="categoria"
              label="Economia"
              value="economia"
              onChange={seleccionarCategoria}
              defaultChecked={props.noticia.categoria === "economia"}
            />
            <Form.Check
              inline
              type="radio"
              name="categoria"
              label="Espectaculo"
              value="espectaculo"
              onChange={seleccionarCategoria}
              defaultChecked={props.noticia.categoria === "espectaculo"}
            />
            <Form.Check
              inline
              type="radio"
              name="categoria"
              label="Fotografia"
              value="fotografia"
              onChange={seleccionarCategoria}
              defaultChecked={props.noticia.categoria === "fotografia"}
            />
            <Form.Check
              inline
              type="radio"
              name="categoria"
              label="Politica"
              value="politica"
              onChange={seleccionarCategoria}
              defaultChecked={props.noticia.categoria === "politica"}
            />
            <Form.Check
            inline
            type="radio"
            name="categoria"
            label="Salud"
            value="salud"
            onChange={seleccionarCategoria}
            defaultChecked={props.noticia.categoria === "salud"}
            />
            <Form.Check
            inline
            type="radio"
            name="categoria"
            label="Tecnologia"
            value="tecnologia"
            onChange={seleccionarCategoria}
            defaultChecked={props.noticia.categoria === "tecnologia"}
           />
          </div>
          {
            error === true ? <Alert variant={"danger"}>Todos los campos son obligatorios</Alert>
            : null
        }
        <Button variant="success" type="submit" className="w-100 my-5">
          Editar Noticia
        </Button>
      </Form>
    </section>
    );
};

export default withRouter(EditarNoticias);