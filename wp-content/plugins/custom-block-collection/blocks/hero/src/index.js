import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import './editor.scss';

import Edit from './edit';
import Save from './save';


registerBlockType('custom-blocks/hero', {
    edit: Edit,
    save: Save,
});
