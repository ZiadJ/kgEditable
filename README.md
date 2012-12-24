kgEditable
==========
###Description:###
A binding handler for koGrid that instantly turns existing templates into editable ones. This can be done via markup 
or by simply calling the <code>kgEditable</code> function with the readonly and edit templates as parameters. 

###Events:###
Clicking on a cell will automatically put it into edit mode. However this can be changed to say a double click via the 
<code>editOn</code> parameter. 

###Validation:###
The following callback events are available on each cell:<br/>
1. <code>onEditStart</code><br/>
2. <code>onEditEnd</code><br/>
This should make validation easy to implement programmatically.

###Change tracking:###
Modified cells are automatically hilighted and changes can be monitored via the <code>onChange</code> callback event. Note that while 
a cell is being edited pressing the ESC key will revert it back to its original value.

###Navigation:###
Keyboard navigation is currently enabled using the Enter|Tab, shift > Enter|Tab, Up and Down keys while the left and right keys
allow moving the cursor inside the input elements. This however may change in later versions depending on your feedback.

###Styling:###
The edit template is always appended into the root element of the readonly template. This allows it to inherit any css
styling such as font color that is applied to the latter.

###Performance:###
The edit template is only dynamically loaded whenever a cell is edited. Therefore the template content should not 
affect the overall grid performance.

###Usage:###
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
&nbsp;&nbsp;&nbsp;&nbsp;{ field: 'SomeFieldName', cellTemplate: kgEditable(tplDefault, 'tplEdit', 'dblclick', 'orange', 'onModified') } <br/>
]);
</code>

###Demo:###
http://jsfiddle.net/3bb3p


I'm commited to develop this project further depending on public interest. So you're most welcome to post suggestions 
and/or contribute. 
