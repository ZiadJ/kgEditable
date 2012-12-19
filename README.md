kgEditable
==========
###Description:###
A binding handler for koGrid that instantly turns existing templates into editable ones. This can be done via markup or 
by simply calling the <code>kgEditable</code> function with the readonly and editable templates as parameters. 

###Events:###
Clicking on a cell will automatically put it into edit mode. However this can be changed to say a double click via the 
<code>trigger</code> parameter. 

###Change tracking:###
Modified cells are automatically hilighted. To revert a cell back to its original value during editing just press the
Esc key.

###Performance:###
No edit markup is not loaded when the grid is instanciated. It only happens when a cell is edited. Therefore the markup
used in the the edit template will not affect the overall grid performance.

###Usage:##
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

I'm commited to develop this project further depending on public interest. So you're most welcome to post suggestions 
and/or contribute. 
