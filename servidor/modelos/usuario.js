const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un role valido'
}

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']

    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']

    },
    password: {
        type: String,
        required: [true, 'La contrasela es necesario']

    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }

});

//Con este metodo oculto el password al cliente
usuarioSchema.methods.toJSON = function() {
        let user = this;
        let userObject = user.toObject();
        delete userObject.password;
        return userObject;
    }
    //Con este plugin personalizo el mensaje de validacion de un unico email
usuarioSchema.plugin(uniqueValidator, { message: '{VALUE} debe ser unico' });

module.exports = mongoose.model('Usuario', usuarioSchema);