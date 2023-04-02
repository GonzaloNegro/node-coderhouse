export const isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) return res.status(401).json({msg: 'Sin autorizacion'});
    next();
}