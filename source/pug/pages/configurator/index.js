import './index.sass';

import customSelect from 'custom-select';

require('../../../scripts/prodSlider');


document.addEventListener('DOMContentLoaded', (event) => {

    let cstSlcts = customSelect('select', {
        containerClass: 'custom-select-container-v1',
        openerClass: 'custom-select-opener',
        panelClass: 'custom-select-panel',
        optionClass: 'custom-select-option',
        optgroupClass: 'custom-select-optgroup',
        isSelectedClass: 'is-selected',
        hasFocusClass: 'has-focus',
        isDisabledClass: 'is-disabled',
        isOpenClass: 'is-open'
    });

    console.log('cstSlcts', cstSlcts);


});
