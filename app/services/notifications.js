import Ember from 'ember';

const { on } = Ember;

export default Ember.Service.extend({

    initToaster: on('init', function() {
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };
    }),

    clear() {
        toastr.clear();
    },

    success(message, title) {
        toastr.success(message, title);
    },

    error(message, title) {
        toastr.error(message, title);
    },

    info(message, title) {
        toastr.info(message, title);
    },

    warning(message, title) {
        toastr.warning(message, title);
    },

});