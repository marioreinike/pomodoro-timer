import Swal from 'sweetalert2';

export async function confirm(message = '') {
  const { isConfirmed } = await Swal.fire({
    title: 'Confirm',
    html: `Are you sure? ${message}<br>This cannot be undone.`,
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: 'Cancel',
    showConfirmButton: true,
    // confirmButtonColor: theme.palette.primary.main,
    showCloseButton: false,
  });
  return isConfirmed;
}
