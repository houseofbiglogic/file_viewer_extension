/** @odoo-module **/
import { FileViewer } from "@web/core/file_viewer/file_viewer";
import { patch } from "@web/core/utils/patch";
import { useEffect, useRef } from "@odoo/owl";

// Office dosyalarını (docx, xlsx, xls) önizleme için FileViewer'da override yapıyorum
patch(FileViewer.prototype, {
    setup() {
        super.setup();
        this.officePreviewRef = useRef("officePreviewContainer");

        useEffect(() => {
            const file = this.getCurrentFile();
            if (file && this.isLocalOfficeDoc(file)) {
                this._renderOfficeDoc(file);
            } else {
                if (this.officePreviewRef.el) {
                    this.officePreviewRef.el.innerHTML = "";
                    this.officePreviewRef.el.style.display = "none";
                }
            }
        }, () => [this.props.startIndex, this.props.files]);
    },

    getCurrentFile() {
        if (this.props.files && typeof this.props.startIndex !== 'undefined') {
            return this.props.files[this.props.startIndex];
        }
        return this.props.file || this.props.record || null;
    },

    isLocalOfficeDoc(file) {
        if (!file) return false;
        const name = file.name || file.filename || file.displayName || "";
        if (!name) return false;
        const ext = name.split('.').pop().toLowerCase();
        return ['docx', 'xlsx', 'xls'].includes(ext);
    },

    async _renderOfficeDoc(file) {
        const container = this.officePreviewRef.el;
        if (!container) return;

        container.style.display = "flex";
        
        container.innerHTML = `
            <div style="height: 60px; width: 100%; flex-shrink: 0;"></div>
            
            <div id="office-active-zone" style="flex-grow: 1; width: 100%; background: transparent; pointer-events: auto; display: flex; align-items: flex-start; justify-content: center; overflow: hidden;">
                <div class="mt-5 text-white">
                    <i class="fa fa-circle-o-notch fa-spin"></i> Yükleniyor...
                </div>
            </div>
        `;

        const activeZone = container.querySelector("#office-active-zone");

        try {
            const fetchUrl = file.url || file.downloadUrl || `/web/content/${file.id}`;
            const response = await fetch(fetchUrl);
            const blob = await response.blob();
            
            if (!this.officePreviewRef.el || this.officePreviewRef.el.style.display === "none") return;
            
            const currentNow = this.getCurrentFile();
            if (!currentNow || currentNow.id !== file.id) return;

            activeZone.innerHTML = "";
            
            const name = file.name || file.filename || file.displayName || "";
            const ext = name.split('.').pop().toLowerCase();

            let contentHtml = "";
            let isExcel = false;

            if (['xlsx', 'xls'].includes(ext)) {
                if (!window.XLSX) return;
                const arrayBuffer = await blob.arrayBuffer();
                const workbook = window.XLSX.read(arrayBuffer, { type: "array" });
                if (workbook.SheetNames.length > 0) {
                    const ws = workbook.Sheets[workbook.SheetNames[0]];
                    contentHtml = window.XLSX.utils.sheet_to_html(ws, { id: "excel_render_table" });
                    isExcel = true;
                }
            } else if (ext === 'docx') {
                contentHtml = '<div id="docx-container"></div>';
            }

            const cardWrapper = document.createElement("div");
            cardWrapper.className = "bg-white shadow rounded";
            
            cardWrapper.style.cssText = `
                width: 85vw; 
                max-width: 1000px; 
                max-height: 90%; 
                margin-top: 20px;
                display: flex; 
                flex-direction: column; 
                position: relative;
                overflow: hidden;
            `;
            
            cardWrapper.onclick = (e) => e.stopPropagation();

            cardWrapper.innerHTML = `
                <div class="p-2 border-bottom bg-light text-center flex-shrink-0">
                   <small class="text-muted fw-bold">${name}</small>
                </div>
                <div class="office-content-area p-3" style="overflow: auto; flex-grow: 1;">
                    ${contentHtml}
                </div>
            `;

            activeZone.appendChild(cardWrapper);

            if (isExcel) {
                const table = activeZone.querySelector('table');
                if(table) {
                    table.classList.add('table', 'table-bordered', 'table-striped', 'table-hover', 'mb-0');
                    table.style.width = "100%"; 
                }
            } else if (ext === 'docx') {
                const docContainer = activeZone.querySelector("#docx-container");
                if (window.docx) {
                    await window.docx.renderAsync(blob, docContainer, null, {
                        className: "docx_content", 
                        inWrapper: false
                    });
                }
            }
            
            // Sadece Active Zone'un boşluğuna (koyu alana) tıklanırsa kapansın
            activeZone.onclick = (e) => {
                if (e.target === activeZone) {
                    
                    container.style.display = "none";
                    
                    if (this.props.close) {
                        this.props.close();
                    } else {
                        const closeBtn = document.querySelector('.o_FileViewer_close, .o_CloseButton');
                        if (closeBtn) closeBtn.click();
                    }
                }
            };

        } catch (e) {
            console.error(e);
            activeZone.innerHTML = `<div class="alert alert-danger m-5">Hata: ${e.message}</div>`;
        }
    }
});