exports.get404Error = (req, res, next) =>{
    res.status(404).json({message: 'not found'});
}