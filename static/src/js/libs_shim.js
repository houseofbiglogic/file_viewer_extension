odoo.define('jszip', [], function () {
    "use strict";
    
    if (typeof window.JSZip !== 'undefined') {
        return window.JSZip;
    }
    return null;
});