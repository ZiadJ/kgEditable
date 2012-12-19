kgEditable
==========

Plugin for koGrid that for making editable cells.

<bold>Usage:</bold>


<code>
var tplEditCell = ...;
var tmplCell = ...;
</code>
<code>
columnDefs: ko.observableArray([<br/>
            { field: 'Code', cellTemplate: kgEditable(tmplCell, 'tplEditCell', 'dblclick', 'orange') }<br/>
            })
</code>
