const bcrypt = require('bcryptjs');
const hashedPassword = (password) =>{
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password,salt)
}

const comparePassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword)
}

module.exports = {
    hashedPassword,
    comparePassword
}


