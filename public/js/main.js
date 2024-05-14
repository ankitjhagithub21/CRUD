document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('addUserForm');

    form.addEventListener('submit', async function (event) {
      event.preventDefault();

      const data = {
        name: event.target.name.value,
        email: event.target.email.value,
        phone: event.target.phone.value
      };

      try {
        const response = await fetch('/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (result.success) {
          Swal.fire({
            icon: 'success',
            title: 'User added successfully!',
            showConfirmButton: false,
            timer: 1500
          });
          form.reset();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: result.message,
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message,
        });
      }
    });
});
