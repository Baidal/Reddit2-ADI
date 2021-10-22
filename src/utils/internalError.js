module.exports = (res,e, methodName, controllerName) => {
    console.log(
        `Se ha producido un error en '${methodName}' del controlador '${controllerName}': \n` + e
      );

      res.status(500).send({
        errors: [{ error: "error interno en el servidor" }],
      });

}