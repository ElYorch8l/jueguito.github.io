const audio = new Audio("img/MUSICASIRINGUITO.mp3"); //aqui se define la canción que se usara asociada al contador
//arrays para meter los coches
const cars1 = [
    { id: 1, answer: 'toyota fjcruiser', img:'fj.jpg' },
    { id: 2, answer: 'fiat multipla', img:"Rover_james.jpg" },
    { id: 3, answer: "maserati quattroporte", img:"maserati.jpg" },
    { id: 4, answer: 'lambo', img:"lambo.jpg.JPEG" },
    { id: 5, answer: 'audi R8', img:"r8.jpg" },
  ];
  const cars2 = [
    { id: 1, answer: 'aston martin db5', img:'db5.jpg' },
    { id: 2, answer: 'coche fantastico', img:"cochefantastico.jpg" },
    { id: 3, answer: "delorean regreso al futuro", img:"delorean.jpg" },
    { id: 4, answer: 'r34 de bryan', img:"r34.jpg" },
    { id: 5, answer: 'batmovil', img:"batimovil.jpg" },
  ];
  
  // Obtener la cadena de consulta (query string) de la URL actual
var queryString = window.location.search;

// Crear un objeto URLSearchParams a partir de la cadena de consulta
var params = new URLSearchParams(queryString);

// Obtener el valor de un parámetro específico
var palabra = params.get('palabra');
document.getElementById("nombre").innerText=palabra;//aparece el nombre que has puesto
var type = params.get('car-type');

// Mostrar los valores en la consola
console.log("Nombre: " + palabra);
var texto = ("JUGUEMOS "+palabra);
console.log(texto);
console.log("car-type: " + type);
//aqui es donde se selecciona entre los dos arrays para que el jugador elija un juego u otro
function mostrarInstrucciones() {
  const instrucciones = document.getElementById("instrucciones");
  instrucciones.style.display = "block";
}
let cars=cars1
if (type == "cars1"){
   cars = cars1;
  }else{
   cars = cars2;
  }
//
let currentCarIndex = 0;//let para iniciar el coche desde el principio
let attempts = 3;//numero de intentos maximos
const maxAttempts = 0;//se crea para que en el else del final se pueda reiniciar el juego al fallar
document.addEventListener('DOMContentLoaded', function () {
  loadCarImage();
})
  //empezamos a cargar el juego 
  function loadCarImage() {
    const carImage = document.getElementById('car-image');//imagen del coche
    const answerInput = document.getElementById('answer-input');//input para la respuesta
    let resultMessage = document.getElementById('result-message');//mensaje del resultado
    const currentCar = cars[currentCarIndex];
    //aqui te muestra la imagen 
    carImage.src = `img/${currentCar.img}`;
    answerInput.value = '';
  }
  
  
  let count = 30; // número inicial de la cuenta regresiva
      const countdownElement = document.getElementById('countdown');

      //se pone el contador
      function updateCountdown() {
        countdownElement.textContent = count;
        count--; // Disminuir el contador en 1
        // Verificar si el contador ha llegado a cero
        if (count === 0) {
          clearInterval(interval); //para el tiempo
          var mensaje2 = "mas lento que el caballo del malo";//mensaje con amor
          alert(mensaje2);
          window.location.href = "/inicio.html";
        }

      }

      // Mostrar el número inicial antes de que comience la cuenta regresiva
      updateCountdown();

      // Crear el intervalo que se ejecutará cada segundo
      const interval = setInterval(updateCountdown, 1000);
      let timeout;

function reproducirCancion() {
  audio.play();

  // Reiniciar el setTimeout después de 15 segundos
  timeout = setTimeout(reproducirCancion, 15000);
}
timeout = setTimeout(reproducirCancion, 15000);
// Detener o reiniciar el setTimeout después de 30 segundos
setTimeout(() => {
  clearTimeout(timeout); // Detener el setTimeout
  // Opcionalmente, puedes llamar a 'reproducirCancion()' para reiniciar el setTimeout
}, 30000); // 30000 ms = 30 segundos
//comprobacion de la respuesta 
function checkAnswer() {
  const answerInput = document.getElementById('answer-input');
  let resultMessage = document.getElementById('result-message');

  const userAnswer = answerInput.value.trim().toLowerCase();
  const correctAnswer = cars[currentCarIndex].answer.toLowerCase();
  //condicional para poder avanzar a la siguiente imagen si ha acertado la respuesta 
  if (userAnswer === correctAnswer) {
    resultMessage.textContent = '¡Correcto! ¡Adivinaste el coche!'
    currentCarIndex++;;
    attempts = 3;
    count = 30;
    clearTimeout(timeout);
    if (audio!= undefined){
      audio.pause();
      timeout = setTimeout(reproducirCancion, 15000);
    }
    function reproducirCancion() {
      audio.play();
      
      // Reiniciar el setTimeout después de 15 segundos
      timeout = setTimeout(reproducirCancion, 15000);
    }
    timeout = setTimeout(reproducirCancion, 15000);
    // Detener o reiniciar el setTimeout después de 30 segundos
    setTimeout(() => {
      clearTimeout(timeout); // Detener el setTimeout
      // Opcionalmente, puedes llamar a 'reproducirCancion()' para reiniciar el setTimeout
    }, 30000); // 30000 ms = 30 segundos
  } else {//else para continuar en la imagen y mostrar los intentos que quedan 
    attempts--
    resultMessage.textContent = ('Incorrecto. Inténtalo de nuevo. Te quedan '+attempts);
  } 
  //if para que te mande al inicio si ha llegado al numero de intentos maximo
  if (attempts == maxAttempts){
    var mensaje = "pal loby krak te quedaste sin intentos";
    alert(mensaje); //alert para poder terminar el juego
    window.location.href = "/inicio.html";  
  }
  //condicional para pasar a la siguiente imagen o volver al inicio si ya has superado todas las imagenes
  if (currentCarIndex < cars.length) {
    loadCarImage();
  } else {
    var mensaje1 = "CORRECTO, TU PREMIO ES VOLVER A JUGAR QUE MAS QUIERES";
    alert(mensaje1); //alert para poder terminar el juego
    window.location.href = "/inicio.html";  
  }
}
//aqui tengo puesto la funcion para que compruebe las respuestas con un check answer
document.getElementById("comprobar").onclick=function(){
  checkAnswer();
  let answerInput = document.getElementById('answer-input').value;
}