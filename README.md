kgEditable
==========

Plugin for koGrid that for making editable cells.

<bold>Usage:</bold>


<code>
var tplEditCell = ...;
</code>
<br/>
<code>
var tmplCell = ...;
</code>
<br/>
<br/>
<code>
columnDefs: ko.observableArray([<br/>
&nbsp;&nbsp;&nbsp;&nbsp;{ field: 'Code', cellTemplate: kgEditable(tplDefault, 'tplEdit', 'dblclick', 'orange') },<br/>
&nbsp;&nbsp;&nbsp;&nbsp;...<br/>
])
</code>
