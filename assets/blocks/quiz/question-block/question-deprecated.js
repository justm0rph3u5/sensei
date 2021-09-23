/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';
import { renderToString } from '@wordpress/element';

/**
 * External dependencies
 */
import { omit } from 'lodash';

/**
 * Internal dependencies
 */
import metadata from './block.json';

/**
 * Helper method to get a related block for each type of media.
 *
 * @param {Object}   media       Question media.
 * @param {number}   media.id    Media attachment id.
 * @param {string}   media.url   Media attachment url.
 * @param {string}   media.type  Media attachment type.
 * @param {Function} media.title Media attachment title.
 */
const getMediaBlock = ( media ) => {
	switch ( media.type ) {
		case 'image':
			return createBlock( 'core/image', {
				id: media.id,
				url: media.url,
			} );
		case 'audio':
			return createBlock( 'core/audio', {
				id: media.id,
				src: media.url,
			} );
		case 'video':
			return createBlock( 'core/video', {
				id: media.id,
				src: media.url,
			} );
		default:
			const link = <a href={ media.url }>{ media.title }</a>;
			return createBlock( 'core/paragraph', {
				content: renderToString( link ),
			} );
	}
};

export default [
	{
		onProgrammaticCreation: true,
		isEligible( attributes, innerBlocks ) {
			let isEligible = true;
			if ( !! attributes.options?.answerFeedback ) {
				isEligible = true;
			}
			innerBlocks.map( ( theBlock ) => {
				if (
					'sensei-lms/question-description' === theBlock.name ||
					'sensei-lms/answer-feedback-correct' === theBlock.name ||
					'sensei-lms/answer-feedback-failed' === theBlock.name
				) {
					isEligible = false;
				}
				return true;
			} );

			return isEligible;
		},
		attributes: {
			...metadata.attributes,
		},
		migrate( attributes, innerBlocks ) {
			const migratedInnerBlocks = [];

			// Shift the description into the new question description block container.
			migratedInnerBlocks.push(
				createBlock(
					'sensei-lms/question-description',
					{},
					innerBlocks
				)
			);

			// Add the answer feedback attribute to the innerBlock container (if it exists).
			if ( !! attributes.options?.answerFeedback ) {
				const theParagraph = createBlock( 'core/paragraph', {
					content: attributes.options.answerFeedback,
				} );

				migratedInnerBlocks.push(
					createBlock( 'sensei-lms/answer-feedback-correct', {}, [
						theParagraph,
					] )
				);
				migratedInnerBlocks.push(
					createBlock( 'sensei-lms/answer-feedback-failed', {}, [
						theParagraph,
					] )
				);
			}

			return [
				{
					...attributes,
					options: omit( attributes.options, 'answerFeedback' ),
				},
				migratedInnerBlocks,
			];
		},
		save() {
			return <InnerBlocks.Content />;
		},
	},
	{
		onProgrammaticCreation: true,
		isEligible( attributes ) {
			return (
				attributes.media ||
				( attributes.type === 'file-upload' &&
					!! attributes.options?.studentHelp )
			);
		},
		attributes: {
			...metadata.attributes,
			media: {
				type: 'object',
			},
		},
		migrate( attributes, innerBlocks ) {
			const migratedInnerBlocks = [ ...innerBlocks ];

			// Add the media to the description (if it exists).
			if ( attributes.media ) {
				migratedInnerBlocks.push( getMediaBlock( attributes.media ) );
			}

			// Add the student help text to the description (if it exists).
			if (
				attributes.type === 'file-upload' &&
				!! attributes.options?.studentHelp
			) {
				migratedInnerBlocks.push(
					createBlock( 'core/paragraph', {
						content: attributes.options.studentHelp,
					} )
				);
			}

			return [
				{
					...omit( attributes, 'media' ),
					options: omit( attributes.options, 'studentHelp' ),
				},
				migratedInnerBlocks,
			];
		},
		save() {
			return <InnerBlocks.Content />;
		},
	},
];
