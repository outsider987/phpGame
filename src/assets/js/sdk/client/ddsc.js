var ddsc = {
  version: '0.0.2',
  initialized: false,
  IPCRenderer: null,
  EventEmitter: null,
  getCategory: function (cat) {
    if (this[cat] == undefined)
      this[cat] = {};

    return this[cat];
  },
  on: function (name, callback) {
    if (this.initialized) {
      this.EventEmitter.on(name, callback);
    }
  },
  emit: function (name, opts) {
    if (this.initialized) {
      this.EventEmitter.emit(name, opts);
    }
  },
  init: function (opts) {
    if (!this.initialized) {
      opts = {
        href: window.location.href,
        cver: this.version,
        ...opts
      };

      var bIsElectronAvilable = false;
      try {
        require.resolve('electron');
        bIsElectronAvilable = true;
      } catch (e) {
        bIsElectronAvilable = false;
      }
      if (bIsElectronAvilable) {
        const ipcRenderer = require('electron').ipcRenderer;


        var hostFuncs = ipcRenderer.sendSync('getAllFuns', opts);
        this.callHostFunction = (c, f, opts) => {
          return ipcRenderer.sendSync('call', c, f, opts);
        };
        this.IPCRenderer = ipcRenderer;

        hostFuncs.forEach(element => {
          var res = element.split("&");
          var cat = res[0];
          var fn = res[1];
          var code = "function " + fn + "(opts) { return ddsc.callHostFunction('" + cat + "', '" + fn + "', opts) }";
          var func = new Function("return " + code)();
          this.getCategory(cat)[fn] = func;
        });

        const eventEmitter = require('events');
        this.EventEmitter = new eventEmitter();
        ipcRenderer.on('onEvent', function (ev, name, opts) {
          ddsc.emit(name, opts);
          var v = document.getElementsByTagName('webview');
          if (v.length > 0)
            v[0].send('onEvent', name, opts);
        });

        this.EventEmitter.on('onLocaleChange', function (localeopts) {
          if (opts.handlleLocaleChange) {
            opts.handlleLocaleChange(localeopts);
          }
        });

        this.initialized = true;
      }
    }
    if (opts.initSuccess && this.initialized) {
      opts.initSuccess();
    }
    if (opts.initFail && !this.initialized) {
      opts.initFail();
    }
    return this.initialized;
  }
};
