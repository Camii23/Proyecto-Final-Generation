document.getElementById("cancel-button").addEventListener("click", async () => {
    const result = await Swal.fire({
        title: "¿Estás seguro que quieres cancelar el proceso?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si",
        cancelButtonText: "No",
        confirmButtonColor: '#617842',
        cancelButtonColor: '#6C757D',
        customClass: {
            confirmButtonText: "confirm-button-custom",
            cancelButtonText: "cancel-button-custom",
        }
    });

    if(result.isConfirmed){
        Swal.fire({
            title: "Has cancelado el proceso.",
            confirmButtonColor: '#617842'
        });
    }else{
        Swal.fire({
            title: "Continua con el proceso.",
            confirmButtonColor: '#617842'
        });
    }
});

document.getElementById("add-button").addEventListener("click", async () => {
    Swal.fire({
        title: "Excelente!",
        text: "Has agregado un nuevo producto!",
        icon: "success",
        confirmButtonColor: '#617842'
      });
});