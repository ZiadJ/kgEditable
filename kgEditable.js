// Observer plugin for Knockout http://knockoutjs.com/
// (c) Ziad Jeeroburkhan
// License: MIT (http://www.opensource.org/licenses/mit-license.php)
// Version 0.2.0 beta

function kgEditable(cellTemplate, editCellTemplateName, trigger, hilightClass) {
    var tpl = ko.utils.unwrapObservable(cellTemplate);
    tpl = $(cellTemplate).attr('data-bind', ', editable: { '
        + (!editCellTemplateName ? '' : 'editTemplateName: ' + editCellTemplateName)
        + (!trigger ? '' : ', trigger: "' + trigger + '"')
        + (!hilightClass ? '' : ', hilightClass: "' + hilightClass + '"')
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
                    var editElement = $(options.editTemplateName || options);
                    editElement.addClass('kgEditable');

                    $elem.append(editElement);

                    twoWayBoundHtml = $elem.html().replace(/\$data.getProperty\(\$parent\)/g, '$parent.entity[$data.field]')
                                                  .replace(/getProperty\(\$parent\)/g, '$parent.entity[$data.field]');
                    $elem.html(twoWayBoundHtml);

                    var ctx = ko.contextFor(element);
                    ko.applyBindings(ctx, element);
                    var initValue = ko.utils.unwrapObservable(ctx.$parent.entity[ctx.$data.field]);
                    $elem.data('kgCellInitValue', initValue);

                    $elem.children('.kgEditable').find('.kgCellInput, input').blur(function () {
                        $elem.children('.kgEditable').hide();
                        $elem.children(':not(.kgEditable)').show();

                        var hasChange = $elem.data('kgCellInitValue') != ko.utils.unwrapObservable(ctx.$parent.entity[ctx.$data.field]);

                        if (options.hilightClass) { //if (options.hilightClass.match(/rgb\(|rgba\(|\#[0-9]?/gi))
                            if (hasChange)
                                $elem.addClass(options.hilightClass);
                            else
                                $elem.removeClass(options.hilightClass)
                        } else {
                            $elem.css('backgroundColor', !hasChange ? '' : options.hilightClass || 'rgba(255, 95, 0, 0.4)');
                        }
                    });

                    $elem.keydown(function (e) {
                        if (e.which == 13)
                            return false;
                    }).keyup(function (e) {
                        switch (e.which) {
                            case 27:
                                ko.applyBindings(ctx, element);
                                $elem.find('.kgCellInput, input').blur();
                                break;
                            case 13:
                                $elem.find('.kgCellInput, input').blur();
                                break;
                            //case 'Down':
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
