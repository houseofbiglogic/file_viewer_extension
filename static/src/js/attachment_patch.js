/** @odoo-module **/
import { Attachment } from "@mail/core/common/attachment_model";
import { patch } from "@web/core/utils/patch";

patch(Attachment.prototype, {

    // isViewable özelliğini override etme
    get isViewable() {

        const originalResult = super.isViewable;
        if (originalResult) {
            return true;
        }

        const name = this.filename || this.name || "";
        
        if (!name) {
            return false;
        }

        // Uzantı kontrolü
        const ext = name.split('.').pop().toLowerCase();
        return ['docx', 'xlsx', 'xls', 'doc'].includes(ext);
    }
});