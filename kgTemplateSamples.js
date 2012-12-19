var tmlDefault = '<div><div data-bind="attr: { \'class\': \'kgCellText colt\' + $index()}, html: $data.getProperty($parent)" /></div></div>';

var tplEdit = '<div><input type="text" data-bind="attr: { \'class\': \'kgCellInput colt\' + $index()}, value: $parent.entity[$data.field]" /></div>';

function tmplDefaultEditable() {
    return kgEditable(tmplDefault, 'tplEdit'); // The edit template needs to be referred to as a string for now.
}

