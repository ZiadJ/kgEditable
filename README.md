kgEditable
==========

Plugin for koGrid that for making editable cells.

<bold>Usage:</bold>



var tplEditCell = '<div><input type="text" class="kgCellInput" data-bind="value: $parent.entity[$data.field]" /></div>';

var tmplCell = '<div><div data-bind="attr: { \'class\': \'kgCellText colt\' + $index()}, html: $data.getProperty($parent)" /></div></div>';

<code>
columnDefs: ko.observableArray([
            { field: 'Code', width: 225, displayName: 'Code', cellTemplate: kgEditable(tmplCell, 'tplEditCell', 'dblclick', 'orange') }
            })
</code>
