////////////////////////////////////////////////
var config = {
  apiKey: "AIzaSyDZEH5QjUHB-8nDjClbFhwlvwUOWFOCy-o",
  authDomain: "prueba-984e5.firebaseapp.com",
  databaseURL: "https://prueba-984e5.firebaseio.com",
  projectId: "prueba-984e5",
  storageBucket: "prueba-984e5.appspot.com",
  messagingSenderId: "775963729178"
};
firebase.initializeApp(config);
/////////////////////////////////////////////////////
let storage = firebase.storage() //para uso del Storage de firebase


const $fromHabitaciones = document.querySelector('#registroHab')
var refHabitacion = firebase.database().ref('Habitaciones')
const $fileImg = document.querySelector('#fileImg')
const $previewFile = document.querySelector('#preview')


// Codigo que extrae la extencion de la imagen a cargar .png .jpg etc
getExtencion = str => str.split(/image/)[1].split(/;/)[0].replace('/','.')






//Guardado de la imagen en el Storage de firebase
let imgBase64
$fileImg.addEventListener('change', (event) => {
  var read = new FileReader()
  read.onloadend = function () {
    $previewFile.src = read.result
    imgBase64 = read.result
  }
   if($fileImg) {// verifica que el archivo sea una imagen 
     read.readAsDataURL(event.target.files[0])
   }
})
//______________________________________________\\




//creacion de habitaciones 
$fromHabitaciones.addEventListener('submit', async function (event) {
  event.preventDefault()
  const dataForm = new FormData($fromHabitaciones)
  const nombre = uuidv4()
    const extencion = getExtencion(imgBase64)
    let refImg = storage.ref(`images/${nombre}${extencion}`)
    const uploadImg = await refImg.putString(imgBase64, 'data_url')
    const url = await uploadImg.ref.getDownloadURL()
    const estadoH = 'sin reservar' // esta variable le da el estado a la habitacion de sin reservar para posteriores usos
  let newHabitacion = {
    numero: dataForm.get('numeroHabitacion'),
    costo: dataForm.get('costoH'),
    acomodacion:dataForm.get('acomodacionH'),
    imagen: url,
    estado: estadoH
    }
    await refHabitacion.push(newHabitacion)
    swal("Todo bien!", "habitación registrada!", "success");
    $fromHabitaciones.reset()
});


$(document).ready(function(){// animacion de Select o comboBox
  $('select').formSelect();
});
