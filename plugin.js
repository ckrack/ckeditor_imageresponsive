/**
 * @license Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
 * @author CKSource - Frederico Knabben. / Clemens Krack <info@clemenskrack.com>
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

'use strict';

( function() {


	CKEDITOR.plugins.add( 'imageresponsive', {
		lang: 'en,de',
		requires: 'widget,dialog,image2',
		icons: 'image',
		beforeInit: function( editor ) {
			editor.widgets.on('instanceCreated', function(e){
				// figure out if this is the image dialog.
				if(e.data.name != 'image')
					return;

				// add allowedContent
				e.data.allowedContent.img.attributes = '!src,alt,width,height,srcset,sizes';
			});


			CKEDITOR.on( 'dialogDefinition', function( ev ) {
				if ((ev.editor != editor) || (ev.data.name != 'image2'))
					return;
				// Take the dialog name and its definition from the event data.
				// Check if the definition is from the dialog we're
				// interested on
				// Get a reference to the "Info" tab.
				var infoTab = ev.data.definition.getContents( 'info' );

				// Add a new text field to the "info" tab page.
				infoTab.add(
					{
						id: 'srcset',
						type: 'text',
						label: 'Quellenverzeichnis' + this.lang.srcset,
						setup: function( widget ) {
							this.setValue(widget.data.srcset);
							// register handler for data
							widget.on('data', function(e){
								// keep srcset & sizes attributes only when set.
								if(e.data.srcset) {
									e.sender.parts.image.setAttribute('srcset', e.data.srcset);
								} else {
									e.sender.parts.image.removeAttribute('srcset');
								}
							});
						},
                        commit: function ( widget ) {
                            widget.setData('srcset', this.getValue());
                        }
					}
				);
				infoTab.add(
					{
						id: 'sizes',
						type: 'text',
						label: 'Sizes' + this.lang.sizes,
						setup: function( widget ) {
							this.setValue(widget.data.sizes);
							// register handler for data
							widget.on('data', function(e){
								// keep sizes attributes only when set.
								if(e.data.sizes) {
									e.sender.parts.image.setAttribute('sizes', e.data.sizes);
								} else {
									e.sender.parts.image.removeAttribute('sizes');
								}
							});
						},
                        commit: function ( widget ) {
                            widget.setData('sizes', this.getValue());
                        }
					}
				);
			});
		},
	} );
} )();
