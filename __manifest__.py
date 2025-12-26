{
    'name': 'MS File Viewer Extension',
    'summary': 'Enhances file viewing capabilities in Odoo',
    'depends': ['base', 'web', 'mail'],
    'data': [],
    'assets': {
        'web.assets_backend': [
            # Kütüphaneler
            'file_viewer_extension/static/src/lib/jszip.min.js',
            'file_viewer_extension/static/src/js/libs_shim.js',
            'file_viewer_extension/static/src/lib/docx-preview.min.js',
            'file_viewer_extension/static/src/lib/xlsx.full.min.js',
       
            'file_viewer_extension/static/src/xml/file_viewer.xml',
            'file_viewer_extension/static/src/js/file_viewer.js',
            'file_viewer_extension/static/src/js/attachment_patch.js',
            'file_viewer_extension/static/src/js/documents_record_patch.js',
        ],
    },
    'installable': True,
    'application': True,
    'license': 'LGPL-3',
    'icon': '/file_viewer_extension/static/description/file_viewer.png',
}
