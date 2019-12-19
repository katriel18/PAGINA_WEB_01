//PROCESS es objeto global que corre 
//a lo largo del programa 

//===================================
//PUERTO
//==================================

process.env.PORT = process.env.PORT || 3000;

//===================================
//ENTORNO
//==================================
process.env.NODE_ENV = process.env.NODE_ENV || 'DESARROLLO';

//===================================
//VENCIMIENTO DEL TOKEN
//==================================
//60 SEGUNDO 60 MINUTOS 24 HORAS 30 DIAS

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;




process.env.SEED = process.env.SEED || 'SEED_DESARROLLO';



//===================================
//BASE DE DATOS
//==================================
let urlDB;

if (process.env.NODE_ENV === 'DESARROLLO') {
    urlDB = 'mongodb://localhost:27017/BD_PAGINA_WEB_01';

} else { //PRODUCCION


    urlDB = process.env.MONGO_URI; //mongodb+srv://katriel:katriel@cluster0-5fhsz.mongodb.net/BD_PAGINA_WEB_01?retryWrites=true
    // urlDB = "mongodb+srv://katriel:katriel@cluster0-5fhsz.mongodb.net/BD_PAGINA_WEB_01?retryWrites=true&w=majority";

}
process.env.URLDB = urlDB;