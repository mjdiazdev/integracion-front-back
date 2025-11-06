import Swal from 'sweetalert2'

// Alerta de éxito genérica
export const alertSuccess = (message) => {
  Swal.fire({
    icon: 'success',
    title: 'Éxito',
    text: message,
    confirmButtonColor: '#3085d6',
  })
}

// Alerta de error genérica
export const alertError = (message) => {
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: message,
    confirmButtonColor: '#d33',
  })
}

// Confirmación antes de eliminar
export const confirmDelete = async (itemName = 'este registro') => {
  const result = await Swal.fire({
    title: `¿Eliminar ${itemName}?`,
    text: "Esta acción no se puede deshacer",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  })
  return result.isConfirmed
}

export function formatCurrency(value) {
  if (value == null) return '-';
  return Number(value).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
}

export function validateProductPayload(p) {
  const errors = [];
  if (!p.name || p.name.trim().length < 2) errors.push('Nombre inválido');
  if (p.price == null || Number(p.price) < 0) errors.push('Precio inválido');
  return errors;
}
