const a = "{a: 2}"; // Puedes usar "{a: 2}" o "" (string vacío) como ejemplos
const parts = a.split("}{");

let primerObjeto;

if (parts.length > 1) {
  primerObjeto = parts[0] + "}";
} else {
  primerObjeto = a;
}

console.log(primerObjeto);
