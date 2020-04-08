/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { useViewportMatch } from '@wordpress/compose';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import {
	Inserter,
	BlockToolbar,
	NavigableToolbar,
	BlockNavigationDropdown,
	ToolSelector,
} from '@wordpress/block-editor';
import {
	TableOfContents,
	EditorHistoryRedo,
	EditorHistoryUndo,
} from '@wordpress/editor';

const inserterToggleProps = { isPrimary: true };

function HeaderToolbar() {
	const {
		hasFixedToolbar,
		showInserter,
		isTextModeEnabled,
		previewDeviceType,
		showIconLabels,
	} = useSelect(
		( select ) => ( {
			hasFixedToolbar: select( 'core/edit-post' ).isFeatureActive(
				'fixedToolbar'
			),
			// This setting (richEditingEnabled) should not live in the block editor's setting.
			showInserter:
				select( 'core/edit-post' ).getEditorMode() === 'visual' &&
				select( 'core/editor' ).getEditorSettings().richEditingEnabled,
			isTextModeEnabled:
				select( 'core/edit-post' ).getEditorMode() === 'text',
			previewDeviceType: select(
				'core/edit-post'
			).__experimentalGetPreviewDeviceType(),
			showIconLabels: select( 'core/edit-post' ).isFeatureActive(
				'showIconLabels'
			),
		} ),
		[]
	);
	const isLargeViewport = useViewportMatch( 'medium' );
	const isWideViewport = useViewportMatch( 'wide' );

	const displayBlockToolbar =
		! isLargeViewport || previewDeviceType !== 'Desktop' || hasFixedToolbar;

	const toolbarAriaLabel = displayBlockToolbar
		? /* translators: accessibility text for the editor toolbar when Top Toolbar is on */
		  __( 'Document and block tools' )
		: /* translators: accessibility text for the editor toolbar when Top Toolbar is off */
		  __( 'Document tools' );

	return (
		<NavigableToolbar aria-label={ toolbarAriaLabel }>
			<div
				className={ classnames( 'edit-post-header-toolbar', {
					'show-icon-labels': isWideViewport && showIconLabels,
				} ) }
			>
				<Inserter
					disabled={ ! showInserter }
					position="bottom right"
					showInserterHelpPanel
					toggleProps={ inserterToggleProps }
				/>
				<ToolSelector />
				<EditorHistoryUndo />
				<EditorHistoryRedo />
				<TableOfContents
					hasOutlineItemsDisabled={ isTextModeEnabled }
				/>
				<BlockNavigationDropdown isDisabled={ isTextModeEnabled } />
				{ displayBlockToolbar && (
					<div className="edit-post-header-toolbar__block-toolbar">
						<BlockToolbar hideDragHandle />
					</div>
				) }
			</div>
		</NavigableToolbar>
	);
}

export default HeaderToolbar;
