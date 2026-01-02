/** @odoo-module **/
import { DocumentsKanbanRecord } from "@documents/views/kanban/documents_kanban_model";
import { patch } from "@web/core/utils/patch";

// Documents modülü için isViewable metodunu genişletiyoruz
patch(DocumentsKanbanRecord.prototype, {
    isViewable() {
        const isOriginalViewable = super.isViewable();
        if (isOriginalViewable) {
            return true;
        }

        const name = this.data.name || this.data.display_name || "";
        const ext = name.split('.').pop().toLowerCase();
        console.log("Checking viewability for extension:", ext);
        return ['docx'].includes(ext);
    }
});