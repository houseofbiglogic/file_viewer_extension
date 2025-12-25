{
    'name': 'File Viewer Extension',
    'version': '1.0',
    'summary': 'Enhances file viewing capabilities in Odoo',
    'depends': ['base', 'web', 'mail'],
    'data': [],
    'assets': {
        'web.assets_backend': [
            'https://unpkg.com/jszip/dist/jszip.min.js',
            'https://unpkg.com/docx-preview/dist/docx-preview.min.js',
            'https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js',
            
            'file_viewer_extension/static/src/xml/file_viewer.xml',
            'file_viewer_extension/static/src/js/file_viewer.js',
            'file_viewer_extension/static/src/js/attachment_patch.js',
        ],
    },
    'installable': True,
    'application': True,
    'license': 'LGPL-3',
}