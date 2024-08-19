const User = require('../model/User');
const handleLogout = async (req, res) => {
    // on client, also delete the accessToken


    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204); // no content
    const refreshToken = cookies.jwt;

    // is refresh token in db? 
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt', { httponly: true });
        res.sendStatus(204);
    }
    
    // delete the refresh token in db
    foundUser.refreshToken = '';
    const result = await foundUsersave();
    console.log(result);

    res.clearCookie('jwt', { httpOnly: true , sameSite: 'none', secure: true }); //secure: true -only serves https
    res. sendStatus(204);
}


module.exports = { handleLogout };