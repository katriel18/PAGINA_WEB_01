//PROCESS es objeto global que corre 
//a lo largo del programa 

//===================================
//PUERTO
//==================================

process.env.PORT = process.env.PORT || 3000;

//===================================
//terminal
//==================================
process.env.NODE_ENV = process.env.NODE_ENV || 'DESARROLLO';

//===================================
//BASE DE DATOS
//==================================
let urlDB;

if (process.env.NODE_ENV === 'DESARROLLO') {
    urlDB = 'mongodb://localhost:27017/BD_PAGINA_WEB_01';

} else {


    urlDB = process.env.MONGO_URI; //mongodb+srv://katriel:katriel@cluster0-5fhsz.mongodb.net/BD_PAGINA_WEB_01?retryWrites=true
    // urlDB = "mongodb+srv://katriel:katriel@cluster0-5fhsz.mongodb.net/BD_PAGINA_WEB_01?retryWrites=true&w=majority";

}
process.env.URLDB = urlDB;