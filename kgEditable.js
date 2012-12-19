// Observer plugin for Knockout http://knockoutjs.com/
// (c) Ziad Jeeroburkhan
// License: MIT (http://www.opensource.org/licenses/mit-license.php)
// Version 0.2.0 beta

function kgEditable(cellTemplate, editCellTemplateName, trigger, hilightClass, afterChangeCallbackName) {
    var tpl = ko.utils.unwrapObservable(cellTemplate);
    tpl = $(cellTemplate).attr('data-bind', ', editable: { '
        + (!editCellTemplateName ? '' : 'editTemplateName: ' + editCellTemplateName)
        + (!trigger ? '' : ', trigger: "' + trigger + '"')
        + (!hilightClass ? '' : ', hilightClass: "' + hilightClass + '"')
        + (!afterChangeCallbackName ? '' : ', afterChangeCallback: "' + afterChangeCallbackName + '"')
        + ' }').wrap('<p>').parent().html();
    return tpl;
}

ko.bindingHandlers.editable = {
    init: function (element, accessor) {
        setTimeout(function () {
            var options = ko.utils.unwrapObservable(accessor());

            $(element)[options.trigger || 'click'](function () {
                var $elem = $(element);
                $elem.children(':not(.kgEditable)').hide();
                if ($elem.data('kgCellInitValue') == undefined) {
                    var editElement = $(options.editTemplateName || options).addClass('kgEditable');
                    $elem.append(editElement);

                    twoWayBoundHtml = $elem.html().replace(/\$data.getProperty\(\$parent\)/g, '$parent.entity[$data.field]')
                                                  .replace(/getProperty\(\$parent\)/g, '$parent.entity[$data.field]');
                    $elem.html(twoWayBoundHtml);

                    var ctx = ko.contextFor(element);
                    ko.applyBindings(ctx, element);

                    var initValue = ko.utils.unwrapObservable(ctx.$parent.entity[ctx.$data.field]);
                    $elem.data('kgCellInitValue', initValue);

                    editElement = $elem.children('.kgEditable');
                    var inputElement = editElement.find('.kgCellInput');
                    if (!inputElement.length)
                        inputElement = editElement.find('input').last();

                    inputElement.blur(function () {
                        setTimeout(function () {
                            //toastr.success(ctx.$parent.entity[ctx.$data.field]());
                            $elem.children('.kgEditable').hide();
                            $elem.children(':not(.kgEditable)').show();

                            var hasChange = $elem.data('kgCellInitValue') != ko.utils.unwrapObservable(ctx.$parent.entity[ctx.$data.field]);

                            if (!options.hilightClass) { // || options.hilightClass.match(/rgb\(|rgba\(|\#[0-9]?/gi))
                                $elem.css('backgroundColor', !hasChange ? '' : options.hilightClass || 'rgba(255, 95, 0, 0.3)');
                            } else {
                                if (hasChange)
                                    $elem.addClass(options.hilightClass);
                                else
                                    $elem.removeClass(options.hilightClass)
                            }

                            if (hasChange && options.afterChangeCallback)
                                ctx.$parent.$userViewModel[options.afterChangeCallback].call(ctx, ctx.$data.field, ctx.$parent.entity[ctx.$data.field]());

                        }, 0);
                    });

                    $elem.keydown(function (e) {
                        if (e.which == 13)
                            return false;
                    }).keyup(function (e) {
                        switch (e.which) {
                            case 27:
                                ko.applyBindings(ctx, element);
                                inputElement.blur();
                                break;
                            case 13:
                                inputElement.blur();
                                break;
                            //case 40: // 'Down'
                            //   var x = $elem.parentsUntil('.kgRow').
                            //   $elem.parentsUntil('.kgRow').parent().find('.kgCellInput, input').focus();
                            //   return false;
                            default:
                        }
                    });
                }

                $elem.children('.kgEditable').show();
                if ($elem.find('.kgCellInput, input').is(":not(:focus)")) {
                    $elem.find('.kgCellInput, input').select()
                }
            });
        }, 0);
    }
};
