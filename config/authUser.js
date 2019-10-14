module.exports = {
  ensureCustomer : function(req, res, next) {
    if(req.isAuthenticated() && req.user.role === "customer")
    {
      return next();
    }
    req.session.oldUrl = req.url;
    req.flash('success', 'Login before proceeding');
    res.redirect('/users/login');
  }
}
