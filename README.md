kgEditable
==========

A binding handler for koGrid to turn any existing template into an editable without having to modifying it. The edit 
template is only loaded during the edit process for each cell via a binding created using the <code>kgEditable</code> function. 
Therefore any amount of html can be placed in the edit template wihtout affecting the grid performance.

<bold>Usage:</bold>


<code>
var tplDefault = '<...>';
</code>
<br/>
<code>
var tmplEdit = '<...>';
</code>
<br/>
<br/>
<code>
var columnDefinitions = ko.observableArray([<br/>
&nbsp;&nbsp;&nbsp;&nbsp;{ field: 'SomeFieldName', cellTemplate: kgEditable(tplDefault, 'tplEdit', 'dblclick', 'orange') },<br/>
&nbsp;&nbsp;&nbsp;&nbsp;...<br/>
]);
</code>

Feel free to send me your suggestions and contribute.
