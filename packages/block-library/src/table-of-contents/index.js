/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';
import save from './save';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __( 'Table of Contents' ),
	description: __(
		'Add a list of internal links allowing your readers to quickly navigate around.'
	),
	icon: 'list-view',
	category: 'layout',
	attributes: {
		headings: {
			source: 'query',
			selector: 'a',
			query: {
				content: { source: 'text' },
				anchor: { source: 'attribute', attribute: 'href' },
				level: { source: 'attribute', attribute: 'data-level' },
			},
		},
	},
	edit,
	save,
};