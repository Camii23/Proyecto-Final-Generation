document.getElementById("cancel-button").addEventListener("click", async () => {
    const result = await Swal.fire({
        title: "¿Estás seguro que quieres cancelar el proceso?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si",
        cancelButtonText: "No",
        customClass: {
            confirmButtonText: "confirm-button-custom",
            cancelButtonText: "cancel-button-custom"
        }
    });

    if(result.isConfirmed){
        Swal.fire("Has cancelado el proceso.");
    }else{
        Swal.fire("Continua con el proceso.");
    }
});

document.getElementById("add-button").addEventListener("click", async () => {
    Swal.fire({
        title: "Excelente!",
        text: "Has agregado un nuevo producto!",
        icon: "success"
      });
});