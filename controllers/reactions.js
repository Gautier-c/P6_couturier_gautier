exports.likeSauce = (req, res, next) => {
   console.log(req.body);
   res.status(201).json({
       message : 'Sauce liké !'
   });
};

exports.dislikeSauce = (req, res, next) => {
   
};


