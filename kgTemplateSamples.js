var tplDefault = '<div><div data-bind="attr: { \'class\': \'kgCellText colt\' + $index()}, html: $data.getProperty($parent)" /></div></div>';

var tplEdit = '<div><input type="text" data-bind="attr: { \'class\': \'kgCellInput colt\' + $index()}, value: $parent.entity[$data.field]" /></div>';

function tplDefaultEditable() {
    return kgEditable(tplDefault, 'tplEdit'); // The edit template needs to be referred to as a string for now.
}

