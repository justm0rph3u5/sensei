/**
 * External dependencies
 */
import { render } from '@testing-library/react';
/**
 * Internal dependencies
 */
import CourseListFilter from './course-list-filter-edit';
/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';

const message =
	'The Course List Filter block can only be used inside the Course List block.';

jest.mock( '@wordpress/block-editor', () => ( {
	useBlockProps: jest.fn(),
	InspectorControls: ( { children } ) => <>{ children }</>,
	withColors: () => ( Component ) => Component,
	Warning: () => <div>{ message }</div>,
} ) );

const context = {
	query: { postType: 'course' },
};

const categories = [
	{
		id: 1,
		name: 'course category A',
	},
	{
		id: 2,
		name: 'course category B',
	},
];

jest.mock( '@wordpress/data' );

describe( 'CourseListFilterBlockEdit', () => {
	it( 'should render the dropdown for category filter', () => {
		useSelect.mockReturnValue( categories );
		const { getByText } = render(
			<CourseListFilter
				clientId="some-client-id"
				attributes={ { type: 'categories' } }
				context={ context }
			/>
		);
		categories.forEach( ( category ) =>
			expect( getByText( category.name ) ).toBeInTheDocument()
		);
	} );

	it( 'should render the dropdown for featured filter', () => {
		const { getByText } = render(
			<CourseListFilter
				clientId="some-client-id"
				attributes={ { type: 'featured' } }
				context={ context }
			/>
		);
		expect( getByText( 'Featured' ) ).toBeInTheDocument();
	} );

	it( 'should render the dropdown for activity filter', () => {
		const { getByText } = render(
			<CourseListFilter
				clientId="some-client-id"
				attributes={ { type: 'activity' } }
				context={ context }
			/>
		);
		expect( getByText( 'All Courses' ) ).toBeInTheDocument();
	} );

	it( 'should render an error', () => {
		const { getByText } = render(
			<CourseListFilter
				clientId="some-client-id"
				attributes={ { type: 'activity' } }
				context={ { query: { postType: 'post' } } }
			/>
		);

		expect( getByText( message ) ).toBeInTheDocument();
	} );
} );
