import { __ } from '@wordpress/i18n';
import { button as icon } from '../../../icons/wordpress-icons';
import metadata from './block.json';

import edit from './edit';
import save from './save';

export default {
	title: __( 'Lesson actions', 'sensei-lms' ),
	description: __(
		'Enable an enrolled user to perform specific actions for a lesson.',
		'sensei-lms'
	),
	keywords: [
		__( 'Lesson', 'sensei-lms' ),
		__( 'Actions', 'sensei-lms' ),
		__( 'Buttons', 'sensei-lms' ),
		__( 'Complete', 'sensei-lms' ),
		__( 'Next', 'sensei-lms' ),
		__( 'Reset', 'sensei-lms' ),
	],
	example: {
		innerBlocks: [
			{ name: 'sensei-lms/button-complete-lesson' },
			{ name: 'sensei-lms/button-next-lesson' },
			{ name: 'sensei-lms/button-reset-lesson' },
		],
	},
	...metadata,
	icon,
	edit,
	save,
};
