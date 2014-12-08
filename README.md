CKEditor Imageresponsive Plugin
==========

Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
http://ckeditor.com - See LICENSE.md for license information.

This is the original image2 plugin (enhanced image plugin) by CKSource, edited by Clemens Krack to include support for responsive images attributes 'srcset' and 'sizes'.
Two textfields are added to the dialog window, and it is possible to integrate with your custom fileuploader.

## Installation

 1. Download the package.
 2. Extract files and save them in ckeditor/plugins/imageresponsive directory.
 3. Enable the plugin:
    `config.extraPlugins = 'imageresponsive';`

**Note:** You might want to disable the image and image2 plugins by setting:
`config.removePlugins = 'image2 image';`


## How to use

Either simply let users set the sizes and srcset attributes by hand, or integrate it with your own filebrowser/quickupload plugin.

## Integrating with your own filebrowser

You can integrate this plugin even further, when using a custom quickupload / filebrowser plugin for CKEditor.

You should implement the logic to save uploaded images in different sizes there.
These can either be static sizes or just percentages based on the width of the uploaded image.
When using static sizes, you should check for the original dimensions and only uses sizes lower than that.

When putting the callback to CKEditor into your custom filebrowser, you can pass in a complete srcset.
This is done via the third parameter, which is executed in the scope of the dialog, if it is a function.

    window.parent.CKEDITOR.tools.callFunction(callback, "/images/upload.jpg", function() {
        // Get the reference to a dialog window.
        var element,
            dialog = this.getDialog();
        // Check if this is the Image dialog window.
        if ( dialog.getName() == 'imageresponsive' ) {
            // Get the reference to a text field that holds the "srcset" attribute.
            element = dialog.getContentElement( 'info', 'srcset' );
            // Assign the new value.
            if ( element )
                element.setValue( 'upload-small.jpg 100w, upload-medium.jpg 500w, upload-big.jpg 1000w' );
        }
    });
