const { Router } = require(`express`);
const DAOUsuarioMock = require(`../daos/usuarios`);

const apiUsuarios = new DAOUsuarioMock();

const router = Router();

//Generamos un endPoint
router.post(`/populate`, async (req, res, next) => {
    try {
        //Primer endPoint para generar y cargar la DB
        res.json(await apiUsuarios.populate(req.query.total));

    } catch (err) {
        next(err); // invocamos el middleware que creamos como manejador de errores.
    }

});

router.post(`/`, async (req, res, next) => {
    try {
        res.json(await apiUsuarios.create(req.body));

    } catch (err) {
        next(err); // invocamos el middleware que creamos como manejador de errores.
    }

});

router.get(`/`, async (req, res, next) => {
    try {
        res.json(await apiUsuarios.findAll());

    } catch (err) {
        next(err); // invocamos el middleware que creamos como manejador de errores.
    }

});

router.get(`/:id`, async (req, res, next) => {
    try {
        res.json(await apiUsuarios.find(req.params.id));

    } catch (err) {
        next(err); // invocamos el middleware que creamos como manejador de errores.
    }

});

router.put(`/:id`, async (req, res, next) => {
    try {
        res.json(await apiUsuarios.update(req.params.id, req.body));

    } catch (err) {
        next(err); // invocamos el middleware que creamos como manejador de errores.
    }

});

router.delete(`/:id`, async (req, res, next) => {
    try {
        res.json(await apiUsuarios.delete(req.params.id));

    } catch (err) {
        next(err); // invocamos el middleware que creamos como manejador de errores.
    }

});

router.use((err, req, res, next) => {
    const erroresConocidos = [
        `Error al listar: elemento no encontrado`,
        `Error al actualizar: elemento no encontrado`,
        `Error al borrar: elemento no encontrado`
    ]

    if (erroresConocidos.includes(err.message)) {
        res.status(404);
    } else {
        res.status(500);
    }

    return res.json({ message: err.message });
})

module.exports = router;