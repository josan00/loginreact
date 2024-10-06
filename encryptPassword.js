const bcrypt = require('bcrypt');

const plainPassword = 'perrito24';
const saltRounds = 10;

bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
        if(err){
            console.error('Error encriptando la contrasena', err);
            return;
        }
        console.log('Contrasena encriptada', hash);
    }    
);