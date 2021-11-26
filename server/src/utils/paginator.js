
/**
 * Función encargada de calcular los valores de la paginación
 * @param {Integer} offset : ;
 * @param {Integer} limit 
 * @param {Integer} maxLimit 
 * @returns [offset, limit]
 */
module.exports = (offset, limit, maxLimit) => {
    /**
       * Nos aseguramos de que se hayan pasado los valores
       */
     offset = offset ? offset : 0;
     offset = offset < 0 ? 0 : offset; //el offset no puede ser negativo >=(
     limit = limit ? limit : maxLimit;

     limit = limit > maxLimit ? maxLimit : limit; //comprobamos que el limite no supere maxLimit casos
     offset = limit * offset;

     return [offset, limit]
}