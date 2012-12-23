// Observer plugin for Knockout http://knockoutjs.com/
// (c) Ziad Jeeroburkhan
// License: MIT (http://www.opensource.org/licenses/mit-license.php)
// Version 0.5.0 beta

function kgEditable(cellTemplate, editCellTemplateName, editOn, hilightClass, onChangeCallbackName) {
    var tpl = ko.utils.unwrapObservable(cellTemplate);
    tpl = $(cellTemplate).addClass('kgEditable').attr('data-bind', ', kgEditable: { '
        + (!editCellTemplateName ? '' : 'editTemplateName: ' + editCellTemplateName)
        + (!editOn ? '' : ', editOn: "' + editOn + '"')
        + (!hilightClass ? '' : ', hilightClass: "' + hilightClass + '"')
        + (!onChangeCallbackName ? '' : ', onChange: "' + onChangeCallbackName + '"')
        + ' }').wrap('<a>').parent().html();
    return tpl;
}

ko.bindingHandlers.kgEditable = {
    init: function (element, accessor) {
        var options = ko.utils.unwrapObservable(accessor());

        $(element).bind(options.editOn || 'click', function () {
            $(element).trigger('edit');
        }).bind('edit', function () {
            var ctx = ko.contextFor(element);
            var val = ctx.$parent.entity[ctx.$data.field];
            var $elem = $(element);
			
            $elem.children(':not(.kgEditCell)').hide();

            if (val.initValue === undefined) {
                val.initValue = ko.utils.unwrapObservable(val);

                var editElement = $(options.editTemplateName || options).addClass('kgEditCell');
                $elem.append(editElement);

                twoWayBoundHtml = $elem.html().replace(/\$data.getProperty\(\$parent\)/g, '$parent.entity[$data.field]')
                                              .replace(/getProperty\(\$parent\)/g, '$parent.entity[$data.field]');
                $elem.html(twoWayBoundHtml);

                ko.applyBindings(ctx, element);

                findInputElements().blur(function () {
                    setTimeout(function () {
                        if (findInputElements().is(":focus"))
                            return;

                        $elem.children('.kgEditCell').hide();
                        $elem.children(':not(.kgEditCell)').show();

                        var hasChange = val.initValue != ko.utils.unwrapObservable(val);

                        if (!options.hilightClass)  // || options.hilightClass.match(/rgb\(|rgba\(|\#[0-9]?/gi))
                            $elem.css('backgroundColor', !hasChange ? '' : options.hilightClass || 'rgba(255, 95, 0, 0.3)');
                        else if (hasChange)
                            $elem.addClass(options.hilightClass);
                        else
                            $elem.removeClass(options.hilightClass)

                        if (hasChange && ctx.$parent.$userViewModel.kgOnChange)
                            ctx.$parent.$userViewModel[options.onChange || 'kgOnChange'].call(ctx, ctx.$data.field,
                                ko.utils.unwrapObservable(val), val.initValue, element);
                    }, 0);
                });

                $elem.keydown(function (e) {
                    if ([13, 9, 38, 40].indexOf(e.which) >= 0)
                        return false;
                }).keyup(function (e) {
                    switch (e.which) {
                        case 27:
                            ko.applyBindings(ctx, element);
                            findInputElements().blur();
                            break;
                        case 13:
                            //findInputElements().blur();
                            //break;
                        case 9:
                            var cell = $elem.parents('.kgCell').first();
                            for (var i = 0; i < 20; i++) {
                                cell = e.shiftKey ? cell.prev() : cell.next();
                                if (!cell.length) {
                                    cell = $elem.parents('.kgRow');
                                    cell = e.shiftKey ? cell.prev() : cell.next();
                                }
                                cell = cell.find('.kgEditable');
                                cell = e.shiftKey ? cell.last() : cell.first();
                                if (cell.length) {
                                    cell.trigger('edit');
                                    break;
                                }
                            }
                            break;
                        case 38:
                        case 40:
                            var row = $elem.parents('.kgRow');
                            row = e.which == 38 ? row.prev() : row.next();
                            row.find('.kgCell').each(function () {
                                if ($(this).attr('class') == $elem.parent().attr('class'))
                                    $(this).children().first().trigger('edit');
                            });
                            break;
                        default:
                    }
                });
            }

            $elem.children('.kgEditCell').show();
            var inputElements = findInputElements();
            var hasFocusedInput = false;
            $.each(inputElements, function () { if ($(this).is(":focus")) hasFocusedInput = true; });
            if (!hasFocusedInput)
                inputElements.first().select().focus();

            function findInputElements() {
                var editElem = $elem.children('.kgEditCell');
                var inputElems = editElem.find('.kgInput');
                if (inputElems.length)
                    return inputElems;
                return editElem.find('input').last();
            }
        });
    }
};