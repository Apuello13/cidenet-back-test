const DEFAULT_STATUS_ERROR = 400;

export const EXISTS_BY_DOCUMENT = {
  reason:
    'Ya existe un empleado con ese número de documento y tipo de documento',
  status: DEFAULT_STATUS_ERROR,
};

export const NOT_FOUND = {
  reason: 'No se encontró un empleado. Intente con otro',
  status: DEFAULT_STATUS_ERROR,
};
