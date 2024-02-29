export enum messageErrors {
  generalError = "Ocurrió un error inesperado. Vuelve a intentar mas tarde o contáctate con el administrador",
  createUserError = "Ocurrió un error al intentar crear el usuario",
  missingParams = "Faltan datos en los parámetros",
  userNotFound = "Usuario no encontrado",
  updateUserError = "Ocurrió un error al intentar actualizar el usuario",
  invalidCredentials = "Credenciales inválidas",
}

export enum codeErrors {
  error = 404,
  unauthorized = 401,
}
