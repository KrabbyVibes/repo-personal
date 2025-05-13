// ejercicio1: , cofla se quiere comprar un monitor, tiene que ser si o si HD y hay que decirle que confirme antes de efectuar la compra


function seleccionarMonitor(ancho, alto, nombre) {
  //Definimos cual va a ser la ventana
  const ventana = document.getElementById("ventana");
  //Consigo el div de info
  const informacion = document.getElementById("informacion");
    //con los datos recibidos reajustamos la ventana
    ventana.style.width = ancho + "px";
    //
    ventana.innerHTML = `
    <p>${nombre} seleccionado (${ancho}x${alto})</p>
    <div class="simulador-monitor" style="width:${ancho}px; height:${alto}px;"></div>
    `;
    //Mensaje de monitor seleccionado y le pongo la clase simulador monitor

  
    //tarda en ejecutarse para dar tiempo a la animacion
    setTimeout(() => {
      if (confirm(`¿Querés comprar ${nombre}?`)) {
        ventana.innerHTML += "<p>¡Gracias por tu compra!</p>";
      } else {
        ventana.innerHTML += "<p>Compra cancelada</p>";
      }
    }, 500);
  }