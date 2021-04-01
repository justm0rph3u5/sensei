/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { BlockStyles, createButtonBlockType } from '../button';
import MessagesDisabledNotice from './messages-disabled-notice';

/**
 * Learner messages button block.
 */
export default createButtonBlockType( {
	tagName: 'a',
	settings: {
		name: 'sensei-lms/button-learner-messages',
		description: __(
			'Links to the page where learners can view their messages. This block is only displayed if the user is logged in and private messaging is enabled.',
			'sensei-lms'
		),
		title: __( 'Learner Messages Button', 'sensei-lms' ),
		attributes: {
			text: {
				default: __( 'My Messages', 'sensei-lms' ),
			},
		},
		styles: [
			BlockStyles.Fill,
			{ ...BlockStyles.Outline, isDefault: true },
			BlockStyles.Link,
		],
	},
	EditWrapper: MessagesDisabledNotice,
} );