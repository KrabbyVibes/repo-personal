document.addEventListener('DOMContentLoaded', () => {
  //recibimos toda la informacion que vamos a necesitar
  const form    = document.getElementById('formDeudas');
  const nombre  = document.getElementById('nombre');
  const email   = document.getElementById('email');
  const materia = document.getElementById('materia');

  const errNombre = document.getElementById('error-nombre');
  const errEmail  = document.getElementById('error-email');
  const errMat    = document.getElementById('error-materia');

  const registros = [];
  const lista = document.getElementById('listaRegistros')

  const btnCancelar = document.getElementById('cancelarCarrito');
  const btnConfirmar = document.getElementById('confirmarCarrito');

  //la funcion espera a que presionemos el enviar para ejecutarse
  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    // Validación de nombre. Solo letras, espacios y tildes
    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(nombre.value.trim())) {
      errNombre.textContent = 'Nombre inválido.';
      valid = false;
    } else {
      errNombre.textContent = '';
    }

    // Validación de mail
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      errEmail.textContent = 'Email inválido.';
      valid = false;
    } else {
      errEmail.textContent = '';
    }

    // Validación de materia 
    if (materia.value === '') {
      errMat.textContent = 'Debes elegir una materia.';
      valid = false;
    } else {
      errMat.textContent = '';
    }

    //Si hay algun error vuelvo
    if (!valid) return;
    //Si todo esta OK pusheo el registro a la "base de datos"
    const nuevo = {
      nombre:  nombre.value.trim(),
      email:   email.value.trim(),
      materia: materia.value
    };
    registros.push(nuevo);

    // Mostrar contenedor y agregar nueva fila
    if (lista.classList.contains('hidden')) lista.classList.remove('hidden');
    const fila = document.createElement('div');
    fila.className = 'fila';
    fila.innerHTML = `
      <span>${nuevo.nombre}</span>
      <span>${nuevo.email}</span>
      <span><strong>${nuevo.materia}</strong></span>
    `;

    lista.insertBefore(fila, document.getElementById('botonesCarrito'));
  });

  btnCancelar.addEventListener('click', () => {
    // Vaciar array
    registros.length = 0;
    // Eliminar todas las filas y ocultar contenedor
    document
      .querySelectorAll('#listaRegistros .fila')
      .forEach(f => f.remove());
    lista.classList.add('hidden');
  });
  
  btnConfirmar.addEventListener('click', () => {
    //Guardar los registros en localStorage
    localStorage.setItem('registros', JSON.stringify(registros));
    //Abro la pagina de confirmacion
    window.open('index2.html', '_blank');
    //Reinicio la pagina
    registros.length = 0;
    document.querySelectorAll('#listaRegistros .fila').forEach(f => f.remove());
    lista.classList.add('hidden');
    mensaje.classList.add('hidden');
  });
});