kgEditable
==========

A binding handler for koGrid to turn any existing template into an editable without having to modifying it. The edit 
template is only loaded during the edit process for each cell via a binding created using the kgEditable function. 
Therefore any amount of html can be placed in the edit template wihtout affecting the grid performance.

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

Feel free to send me your suggestions.
