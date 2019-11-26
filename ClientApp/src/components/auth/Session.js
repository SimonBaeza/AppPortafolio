const Session = (function() {
    const _badCallback = 'El parámetro Callback debe ser una función';
    const _MissingArguments =
      'Hay argumentos indefinidos, no se pudo iniciar una sesión';
    let _isAuthenticated = false;
    const _user = {
      run: '',
      id_role: ''
    };
  
    const start = (user, callback) => {
      if (callback && typeof callback !== 'function') {
        throw new Error(_badCallback);
      }
      
      const { run } = user;
      if (!run) {
        throw new Error(_MissingArguments);
      }
  
      /* eslint-disable no-unused-vars */
      for (let prop in user) {
        _user[prop] = user[prop];
      }
      _isAuthenticated = true;
  
      if (typeof callback === 'function') callback();
    };
  
    const end = (callback) => {
      if (callback && typeof callback !== 'function') {
        throw new Error(_badCallback);
      }
  
      /* eslint-disable no-unused-vars */
      for (let prop in _user) {
        _user[prop] = '';
      }
  
      _isAuthenticated = false;
  
      if (typeof callback === 'function') callback();
    };

    const layoutRoutes = [
      "/1",
      "/2",
      "/3"
    ];
  
    /**
     * Returns a copy of the current session's user,
     * if there isn't a current session it returns null
     */
    const getUser = () => (_isAuthenticated ? { ..._user } : null);
  
    const getUserRole = () => (_isAuthenticated ? _user.id_role : null);
  
    const isUserAuthenticated = () => _isAuthenticated;
  
    return {
      start,
      end,
      getUser,
      getUserRole,
      isUserAuthenticated,
      layoutRoutes
    };
  })();
  
  export default Session;
  