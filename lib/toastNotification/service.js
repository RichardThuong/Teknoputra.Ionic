export default class {
    constructor($log, $cordovaToast) {
        'ngInject';
        this.$log = $log;
        this.$cordovaToast = $cordovaToast;
    }

    showShortTop(message) {
        return this.show(message, 'short', 'top');
    }

    showShortCenter(message) {
        return this.show(message, 'short', 'center');
    }

    showShortBottom(message) {
        return this.show(message, 'short', 'bottom');
    }

    showLongTop(message) {
        return this.show(message, 'long', 'top');
    }

    showLongCenter(message) {
        return this.show(message, 'long', 'center');
    }

    showLongBottom(message) {
        return this.show(message, 'long', 'bottom');
    }

    show(message, duration, position) {
        if (!ionic.Platform.isWebView()) {
            // this.$log.debug('skip toast message in web view');
            console.log('skip toast message in web view');
            // return alert(message);
        } else {
            this.$log.debug('loading native toast show');
            return this.$cordovaToast.show(message, duration, position);
        }
    }
}
