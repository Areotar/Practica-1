import { useEffect, useState } from "react";
import PersonDetail from "./PersonDetail"

export default function PeopleList() {

    const [web, setPeople] = useState([])
    const [filtradoWeb, setFilteredweb] = useState([]);
    const [urlSelected, setUrlSelected] = useState("")
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3000/api/web/buscador") // Cambiar una url para provocar error
            .then(response => response.json())
            // .then(data => { console.log(data.results) })
            .then(data => {
                setPeople(data);
                setFilteredweb(data);
            })
            .catch(error => {
                console.error("Error fetching data", error)
                setError(true)
            })
    }, [])


    const [cityFilter, setCityFilter] = useState("");
    const [activityFilter, setActivityFilter] = useState("");

    useEffect(() => {
        const filtrado = web.filter(web => {
            return (
                (cityFilter === "" || web.ciudad.toLowerCase().includes(cityFilter.toLowerCase())) &&
                (activityFilter === "" || web.actividad.toLowerCase().includes(activityFilter.toLowerCase()))
            );
        });
        setPeople(filtrado);
    }, [cityFilter, activityFilter, web]);


    let listPeople = null;
    if (error) {
        listPeople = <p style={{ textAlign: "center" }}>Ha ocurrido un error</p>
    } else {
        listPeople = filtradoWeb.map(web => (
            <div>
                <h3 onClick={() => setUrlSelected(`http://localhost:3000/api/web/${web._id}`)}>{web.titulo}</h3>
                <p>Actividad: {web.actividad}</p>
                <p>Ciudad: {web.ciudad}</p>
            </div>
        ))
    }

    const sortweb = () => {
        fetch("http://localhost:3000/api/web/buscador?ordenar=desc") // Cambia a la URL que proporciona los datos ordenados
            .then(response => response.json())
            .then(data => {
                setFilteredweb(data); // Actualiza la lista filtrada con los datos ordenados
            })
            .catch(error => {
                console.error("Error fetching sorted data", error);
                setError(true);
            });
    };

    return (
        <div>
            <h2>Lista de personas</h2>
            <div>
                <button onClick={sortweb}>
                    Ordenar por Scoring
                </button>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Filtrar por ciudad"
                    value={cityFilter}
                    onChange={e => setCityFilter(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Filtrar por actividad"
                    value={activityFilter}
                    onChange={e => setActivityFilter(e.target.value)}
                />
            </div>
            <div>
                {listPeople}
            </div>
            <div>
                <PersonDetail url={urlSelected} />
            </div>
        </div>
    )
}