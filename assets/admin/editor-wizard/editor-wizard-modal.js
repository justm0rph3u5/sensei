/**
 * WordPress dependencies
 */
import { Modal } from '@wordpress/components';
import { useEffect, useLayoutEffect, useState } from '@wordpress/element';

/**
 * A React Hook to observe if a modal is open based on the body class.
 *
 * @param {boolean} shouldObserve If it should observe the changes.
 *
 * @return {boolean|undefined} Whether a modal is open, or `undefined` if it's not initialized yet.
 */
const useObserveOpenModal = ( shouldObserve ) => {
	const [ hasOpenModal, setHasOpenModal ] = useState();

	useEffect( () => {
		if ( ! shouldObserve ) {
			return;
		}

		// Initialize state after modals are open or not.
		setTimeout( () => {
			setHasOpenModal( document.body.classList.contains( 'modal-open' ) );
		}, 1 );

		const observer = new window.MutationObserver( () => {
			setHasOpenModal( document.body.classList.contains( 'modal-open' ) );
		} );
		observer.observe( document.body, {
			attributes: true,
			attributeFilter: [ 'class' ],
		} );

		return () => {
			observer.disconnect();
		};
	}, [ shouldObserve ] );

	return hasOpenModal;
};

/**
 * A React Hook to control the wizard open state.
 *
 * @return {boolean} Whether the modal should be open.
 */
const useWizardOpenState = () => {
	const [ open, setOpen ] = useState( false );
	const [ done, setDone ] = useState( false );
	const hasOpenModal = useObserveOpenModal( ! done );

	useLayoutEffect( () => {
		if ( done ) {
			setOpen( false );
		} else if ( false === hasOpenModal ) {
			// If no modal is open, it's time to open.
			setOpen( true );
		}
	}, [ done, hasOpenModal ] );

	return [ open, setDone ];
};

/**
 * Editor wizard modal component.
 */
const EditorWizardModal = () => {
	const [ open, setDone ] = useWizardOpenState();

	const closeModal = () => {
		setDone( true );
	};

	return (
		open && (
			<Modal onRequestClose={ closeModal } title="I'm a modal!">
				Code me, please!
			</Modal>
		)
	);
};

export default EditorWizardModal;
