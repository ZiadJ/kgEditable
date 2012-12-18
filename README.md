kgEditable
==========

Plugin for koGrid that for making editable cells.

<bold>Usage:</bold>


<code>
<p>var tplEditCell = '&lt;div&gt;&lt;input type="text" class="kgCellInput" data-bind="value: $parent.entity[$data.field]" /&gt;&lt;/div&gt;';</p>

<p>var tmplCell = '&lt;div&gt;&lt;div data-bind="attr: { \'class\': \'kgCellText colt\' + $index()}, html: $data.getProperty($parent)" /&gt;&lt;/div&gt;&lt;/div&gt;';</p></code>

<code>
columnDefs: ko.observableArray([
            { field: 'Code', width: 225, displayName: 'Code', cellTemplate: kgEditable(tmplCell, 'tplEditCell', 'dblclick', 'orange') }
            })
</code>
