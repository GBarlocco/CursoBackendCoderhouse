const info = (req, res) => {
    const numCPUs = require(`os`).cpus().length;
    const data = {
        directorioActual: process.cwd(),
        idProceso: process.pid,
        vNode: process.version,
        rutaEjecutable: process.execPath,
        sistemaOperativo: process.platform,
        cantProcesadores: numCPUs,
        memoria: JSON.stringify(process.memoryUsage().rss, null, 2),
    }
    return res.render('info', data);
}

module.exports = {
    info,
};
