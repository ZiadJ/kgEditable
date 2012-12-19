kgEditable
==========

A binding handler for koGrid that to make existing templates editable. The edit template automatically is only loaded 
during the edit process on each cell. So any amount of html can be placed in the edit template wihtout affecting performance.

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
