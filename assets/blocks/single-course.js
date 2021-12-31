/**
 * Internal dependencies
 */
import registerSenseiBlocks from './register-sensei-blocks';
import TakeCourseBlock from './take-course-block';
import ProgressBarBlock from './progress-bar-block';
import { OutlineBlock, LessonBlock, ModuleBlock } from './course-outline';
import ConditionalContentBlock from './conditional-content-block';
import ViewResults from './view-results-block';

registerSenseiBlocks( [
	OutlineBlock,
	ModuleBlock,
	LessonBlock,
	TakeCourseBlock,
	ProgressBarBlock,
	ConditionalContentBlock,
	ViewResults,
] );
