// Observer plugin for Knockout http://knockoutjs.com/
// (c) Ziad Jeeroburkhan
// License: MIT (http://www.opensource.org/licenses/mit-license.php)
// Version 0.7.5 beta

function kgEditable(cellTemplate, editCellTemplateName, editOn, hilightClass, onEditStartCallbackName, onChangeCallbackName, onEditEndCallbackName) {
    var tpl = ko.utils.unwrapObservable(cellTemplate);
    tpl = $(cellTemplate).addClass('kgEditable').attr('data-bind', ', kgEditable: { '
        + (!editCellTemplateName ? '' : 'editTemplateName: ' + editCellTemplateName)
        + (!editOn ? '' : ', editOn: "' + editOn + '"')
        + (!hilightClass ? '' : ', hilightClass: "' + hilightClass + '"')
        + (!onChangeCallbackName ? '' : ', onChange: "' + onChangeCallbackName + '"')
        + (!onEditStartCallbackName ? '' : ', onEditStart: "' + onEditStartCallbackName + '"')
        + (!onEditEndCallbackName ? '' : ', onEditEnd: "' + onEditEndCallbackName + '"')
        + ' }').wrap('<a>').parent().html();
    return tpl;
}

ko.bindingHandlers.kgEditable = {
    init: function (element, accessor, allBindings, viewModel, ctx) {
        var options = ko.utils.unwrapObservable(accessor());
        var val = ctx.$parent.entity[ctx.$data.field];
        if (val.initValue && val.initValue != ko.utils.unwrapObservable(val))
            hilightCell($(element), true, options.hilightClass);

        $(element).on(options.editOn || 'click', function () {
            $(this).trigger('edit');
        }).on('edit', function () {
            var $elem = $(element);
            $elem.children(':not(.kgEditCell)').hide();

            if (!$elem.children('.kgEditCell').length) {
                val.initValue = ko.utils.unwrapObservable(val);

                var editElement = $(options.editTemplateName || options).addClass('kgEditCell');
                $elem.append(editElement);

                twoWayBoundElements = $elem.html().replace(/\$data.getProperty\(\$parent\)/g, '$parent.entity[$data.field]')
                                                  .replace(/getProperty\(\$parent\)/g, '$parent.entity[$data.field]');
                $elem.html(twoWayBoundElements);

                ko.cleanNode(element);
                ko.applyBindings(ctx, element);

                findInputElements($elem).blur(function () {
                    setTimeout(function () {
                        if (findInputElements($elem).is(":focus"))
                            return;

                        $elem.children('.kgEditCell').hide();//.remove();
                        $elem.children(':not(.kgEditCell)').show();

                        var hasChange = val.initValue != ko.utils.unwrapObservable(val);

                        hilightCell($elem, hasChange, options.hilightClass);

                        if (hasChange && options.onChange)
                            ctx.$parent.$userViewModel[options.onChange].call(ctx, val, element);

                        if (options.onEditEnd)
                            ctx.$parent.$userViewModel[options.onEditEnd].call(ctx, val, element);
                    }, 0);
                });

                $elem.keydown(function (e) {
                    return [13, 9, 38, 40].indexOf(e.which) < 0;
                }).keyup(function (e) {
                    switch (e.which) {
                        case 27:
                            findInputElements($elem).blur();
                            ko.applyBindings(ctx, element);
                            break;
                        case 13:
                            //findInputElements($elem).blur();
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
            var inputElements = findInputElements($elem);
            var hasFocusedInput = false;
            $.each(inputElements, function () { if ($(this).is(":focus")) hasFocusedInput = true; });
            if (!hasFocusedInput)
                inputElements.first().select().focus();

            if (options.onEditStart)
                ctx.$parent.$userViewModel[options.onEditStart].call(ctx, val, element);
        });

        function findInputElements($element) {
            var editElem = $element.children('.kgEditCell');
            var inputElems = editElem.find('input.kgInput');
            if (inputElems.length)
                return inputElems;
            return editElem.find('input');
        }

        function hilightCell($element, hasChange, hilightClass) {
            if (!options.hilightClass)  // || options.hilightClass.match(/rgb\(|rgba\(|\#[0-9]?/gi))
                $element.css('backgroundColor', !hasChange ? '' : hilightClass || 'rgba(255, 95, 0, 0.3)');
            else if (hasChange)
                $element.addClass(hilightClass);
            else
                $element.removeClass(hilightClass)
        }
    }
};
