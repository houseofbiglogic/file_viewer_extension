# MS File Viewer Extension

**MS File Viewer Extension** is an Odoo module that enhances the default web file viewer by adding seamless, in-browser preview capabilities for Microsoft Office documents. 

By default, Odoo requires users to download certain Office files to view them. This module overrides the core `FileViewer`, `Attachment`, and `DocumentsKanbanRecord` models to render Word and Excel files directly within Odoo's user interface using client-side libraries.

## ✨ Features

* **In-Browser Preview:** View Microsoft Office documents directly without downloading them.
* **Native Integration:** Integrates perfectly with Odoo's native file viewer UI (both in Chatter/Mail attachments and the Documents app).
* **Supported File Types:** * Microsoft Word: `.docx`
  * Microsoft Excel: `.xlsx`, `.xls`
* **Client-Side Rendering:** Uses fast, reliable JavaScript libraries (`docx-preview` and `SheetJS`) to render documents natively in the browser.
* **Responsive Design:** The preview window adapts to the screen size and features a click-to-close active zone just like Odoo's default image viewer.

## 📦 Dependencies

This module depends on the following standard Odoo modules:
* `base`
* `web`
* `mail`

*(Note: It also extends views from the Odoo Enterprise `documents` module if installed, but gracefully handles the standard `FileViewer` as well).*

## 🚀 Installation

1. Clone or download this repository.
2. Place the `file_viewer_extension` folder into your Odoo `addons` directory.
3. Restart the Odoo server.
4. Go to **Apps**, click **Update Apps List** (make sure Developer Mode is enabled).
5. Search for `MS File Viewer Extension` and click **Install**.

## 💡 Usage

No configuration is required. Once installed:
1. Go to any record with an attached `.docx` or `.xlsx`/`.xls` file (e.g., in the Chatter).
2. Click on the attachment image/icon.
3. The document will immediately open and render within Odoo's native File Viewer modal.

## 📝 License

This project is licensed under the **LGPL-3** License. See the `LICENSE` file for details.