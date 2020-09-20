const getCoches = () => {
    return [
        newCoche({dueño: 1, marca: "BMW", modelo: "Serie 1", matricula: "7992 XYZ", tipo: 1, descripcion: "Ninguna", adquisicion: "1099-11-11", foto: null}),
        newCoche({dueño: 1, marca: "BMW", modelo: "Serie 1", matricula: "7992 WXY", tipo: 1, descripcion: "Ninguna", adquisicion: "1099-11-11", foto: null}),
        newCoche({dueño: 1, marca: "BMW", modelo: "Serie 1", matricula: "7992 VWX", tipo: 1, descripcion: "Ninguna", adquisicion: "1099-11-11", foto: null}),
        newCoche({dueño: 1, marca: "BMW", modelo: "Serie 1", matricula: "7992 MNO", tipo: 1, descripcion: "Ninguna", adquisicion: "1099-11-11", foto: null}),
        newCoche({dueño: 1, marca: "BMW", modelo: "Serie 1", matricula: "7992 LMN", tipo: 1, descripcion: "Ninguna", adquisicion: "1099-11-11", foto: null}),
        newCoche({dueño: 1, marca: "BMW", modelo: "Serie 1", matricula: "7992 LMN", tipo: 1, descripcion: "Ninguna", adquisicion: "1099-11-11", foto: null}),
        newCoche({dueño: 1, marca: "BMW", modelo: "Serie 1", matricula: "7992 LMN", tipo: 1, descripcion: "Ninguna", adquisicion: "1099-11-11", foto: null}),
        newCoche({dueño: 1, marca: "BMW", modelo: "Serie 1", matricula: "7992 LMN", tipo: 1, descripcion: "Ninguna", adquisicion: "1099-11-11", foto: null}),
        newCoche({dueño: 1, marca: "BMW", modelo: "Serie 1", matricula: "7992 LMN", tipo: 1, descripcion: "Ninguna", adquisicion: "1099-11-11", foto: null}),
        newCoche({dueño: 1, marca: "BMW", modelo: "Serie 1", matricula: "7992 LMN", tipo: 1, descripcion: "Ninguna", adquisicion: "1099-11-11", foto: null}),
        newCoche({dueño: 1, marca: "BMW", modelo: "Serie 1", matricula: "7992 LMN", tipo: 1, descripcion: "Ninguna", adquisicion: "1099-11-11", foto: null}),
        newCoche({dueño: 1, marca: "BMW", modelo: "Serie 1", matricula: "7992 LMN", tipo: 1, descripcion: "Ninguna", adquisicion: "1099-11-11", foto: null}),
        newCoche({dueño: 1, marca: "BMW", modelo: "Serie 1", matricula: "7992 LMN", tipo: 1, descripcion: "Ninguna", adquisicion: "1099-11-11", foto: null}),
    ]
};

const getCochesByDueño = (dueño) => {
    const lista = getCoches();
    const filtro = [];

    lista.map((item) => {
        if (item.dueño == dueño){
            filtro.push(newCoche(item));
        }
    });

    return filtro;
};

const añadirCoche = (coche) => {
    const lista = getCoches();

    lista.push(newCoche(coche));
};

const newCoche = coche => ({
    matricula: coche.matricula,
    dueño: coche.dueño,
    marca: coche.marca,
    modelo: coche.modelo,
    tipo: coche.tipo,
    descripcion: coche.descripcion,
    adquisicion: coche.adquisicion,
    foto: coche.foto,
});

export {getCochesByDueño, añadirCoche};