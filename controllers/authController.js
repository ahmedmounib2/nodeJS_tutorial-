const usersDB = {
    users: require('../model/users.json'),
    setUsers: function  (data) { this.users = data }
}
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config();
const fsPromises = require('fs').promises;
const path = 'path';


const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'username and password are rquired'});
    const foundUser = usersDB.users.find(person => person.username === user);
    if (!foundUser) return res.sendStatus(401); // unauthorised
    // evaluate password
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        // create JWTs
        const accessToken = jwt.sign(
            {"username": foundUser.username},
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        );
        res.json({'success': `User ${user} is logged in`});
        const refreshToken = jwt.sign(
            {"username": foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // saving refreshToken with current user
        const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username);
        const currentUser = { ...foundUser, refreshToken };
        usersDB.setUsers([...otherUsers, currentUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        );
        res.cookie('jwt', refreshToken, {httpOnly: true, sameSite: 'none', secure: true , maxAge: 24 * 60 * 60 * 1000});
        res.json({ accessToken });
    }
    else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };