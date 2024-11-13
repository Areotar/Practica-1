import { useEffect, useState } from "react";

export default function PersonDetail({ url }) {

    const [web, setPerson] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(url);
                const data = await response.json();
                console.log(data, response);
                setPerson(data);
            }catch (error){
                console.error("Error fetching data", error);
            }
        }
        if(url) fetchData()
    }, [url]);

    if (!web) {
        return <h2>Ninguna web seleccionada</h2>;
    } else {
        return (<div>
            <h2>web seleccionada:</h2>
            <h3>{web.titulo}</h3>
            <p>Ciudad: {web.ciudad}</p>
            <p>Actividad: {web.actividad}</p>
            <p>Resumen: {web.resumen}</p>
            <p>Info: {web.textos}</p>
            <img src={web.imagenes} alt="Imagen del comercio" />
            <h4>Reseñas:</h4>
            <p>Scoring: {web.reseñas.scoring}</p>
            <p>Total de reseñas: {web.reseñas.total}</p>
            <p>Comentarios: {web.reseñas.cuerpo}</p>
        </div>)
    }
}