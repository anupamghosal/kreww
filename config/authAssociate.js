module.exports = {
  ensureAssociate : function(req, res, next) {
    if(req.isAuthenticated() && req.user.role === "associate")
    {
      return next();
    }
    req.session.oldUrl = req.url;
    req.flash('success', 'Login before proceeding');
    res.redirect('/associate/login');
  }
}
