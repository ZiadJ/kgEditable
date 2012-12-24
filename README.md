kgEditable
==========
###Description:###
A binding handler for koGrid that instantly turns existing templates into editable ones. This can be done via markup 
or by simply calling the <code>kgEditable</code> function with the readonly and edit templates as parameters. 

###Events:###
Clicking on a cell will automatically put it into edit mode. However this can be changed to say a double click via the 
<code>editOn</code> parameter. 

###Validation:###
The following callback events are available on each cell:
1. onEditStart
2. onEditEnd
3. onChange
Those bring about enough control to help implement our own custom validation code.

###Change tracking:###
Modified cells are automatically hilighted. To revert a cell in edit state back to its original value just press the
Esc key.

###Navigation:###
Keyboard navigation is currently enabled using the Enter|Tab, shift > Enter|Tab, Up and Down keys while the left and right keys
control the cursor position inside the input elements. This however may change in later versions depending on user feedback.

###Styling:###
The edit template is always appended to the root element of the readonly template. This allows it to inherit any css
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
Here's a basic demo:
http://jsfiddle.net/eV5Ly <br/>
P.S This may not work in IE due to some jsFiddle issues.



I'm commited to develop this project further depending on public interest. So you're most welcome to post suggestions 
and/or contribute. 
