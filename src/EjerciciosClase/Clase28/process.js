console.log(`
  Directorio actual: ${process.cwd()}
  Id del proceso: ${process.pid},
  Versión de node: ${process.version},
  Ruta del ejecutable: ${process.execPath}
  Sistema operativo: ${process.platform}
  Uso de la memoria: ${JSON.stringify(process.memoryUsage(), null, 2)}
`);

const versionNode = Number(process.version.substring(0, 3).replace(`v`, ``));

console.log(`Version node`);
console.log(versionNode);


if (versionNode < 18) {
  console.log(`debe actualizar la version de node`);
  //process.exit();
}

process.on(`beforeExit`, code => {
  console.log(`Proceso va a finalizar con código de salida ${code}`);
});


process.on(`exit`, code => {
  console.log(`Proceso finalizó con código de salida: ${code}`);
});

//No remplaza el try / catch:
process.on(`uncaughtException`, err => {
  console.log(`Exception cachada`, err.message)
})


for (let i = 0; i < 100; i++) {
  console.log(i);

  if (i === 10) {
    //process.exit();
  }
}

setTimeout(() => {
  console.log(`Log con delay de 500ms`)
}, 500);

/*
try {
  nonExistsFunction();
} catch (e) {
  console.log(e.message)
}
*/

console.log(`Log despues de la falla`);
