var LOCAL, SERVICE, globalData, gsk, gskconsole, mconsole;

globalData = {
  settings: null,
  l10n: null,
  pages: null,
  badges: null
};

LOCAL = {
  settings: {},
  l10n: {},
  pages: {},
  badges: {}
};

SERVICE = {
  settings: null,
  l10n: null,
  pages: null,
  badges: null
};

gsk = gskconsole = mconsole = {
  environment: 'development'
};

gsk.isProduction = function() {
  if (gsk.environment === 'production') {
    return true;
  } else {
    return false;
  }
};

gsk.log = function(content) {
  if (!gsk.isProduction()) {
    if (arguments.length > 1) {
      console.log(arguments);
    } else {
      console.log(content);
    }
  }
};

mconsole.log('this is a log from mconsole.log');

//# sourceMappingURL=init.js.map
