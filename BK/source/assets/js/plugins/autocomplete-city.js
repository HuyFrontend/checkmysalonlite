/**
* autocomplete city
**/
;(function($, window, undefined) {
    var pluginName = 'autocomplete-city';
    function Plugin(element, options) {
      this.element = $(element);
      this.options = $.extend({}, $.fn[pluginName].defaults, options);
      this.init();
    }

    Plugin.prototype = {
      init: function() {
        var that = this.element,
        form = that.closest('form'),
        formId = form.attr('id'),
        thatParent = that.parent(),
        newElemmment = $('<div class="custom-input"></div>'),
        source = [];
        this.getSource(source);

        thatParent.append(newElemmment);
        that.appendTo(newElemmment);

        that.closest('.custom-input')
        .attr('id', 'autocomplete-city-for-form-' + formId);

        var id = that.closest('div.custom-input').attr('id');

        that.autocomplete({
          appendTo: '#' + id,
          // source: source,
          source: function (request, response) {
            var matcher = new RegExp( '^' + $.ui.autocomplete.escapeRegex( slug(request.term) ), 'i' );
            response( $.grep( source, function( item ) {
              return matcher.test( slug(item.label) );
            }));
          },
          minLength: 1,
          open: function () {
            $('.ui-helper-hidden-accessible').remove();
          },
          close: function () {
            $('.ui-helper-hidden-accessible').remove();
          },
          search: function( event, ui ) {
          },
          select: function(event, ui) {
            this.value = ui.item.label;
            $('[data-city-hidden]').remove();
            var cityHidden = $('<input data-city-hidden="" class="hidden" value="' + ui.item.id + '">');
            cityHidden.insertAfter(that);
          }
        })
        .autocomplete('instance')._renderItem = function( ul, item ) {
          return $('<li>').data('item.autocomplete', item)
            .append('<span>' + item.label + '</span>')
            .appendTo(ul);
        };
        that.focus( function () {
          // var cities = Salon.cityList;
          // if(cities && !source.length) {
          //   $.each(cities, function (index, value) {
          //     var item = {};
          //     item.label = this.city;
          //     item.value = this.city;
          //     item.id = this.id;
          //     source.push(item);
          //   });
          // }
          var len = $(this).val().length;
          if(len && len >= 1) {
            that.autocomplete('search');
          }
        });
      },
      resize: function () {
        var doc = $(document),
            win = $(window);

        win.bind('resize', function() {
          var inputCity = doc.find('[data-autocomplete-city]'),
              ulAuto = inputCity.closest('form').find('ul.ui-autocomplete');
        }).trigger('resize');
      },
      getSource: function (source) {
        var that = this.element,
            inputHidden = $(document).find('#list_city'),
            value = inputHidden.val();

        if(value && value.length) {
          value = $.trim(value);
          value = $.parseJSON(value);
        }

        if(value && !source.length) {
          $.each(value, function (index, value) {
            var item = {};
            item.label = this.city;
            item.value = this.city;
            item.id = this.id;
            source.push(item);
          });
        }
      },
      destroy: function() {
        $.removeData(this.element[0], pluginName);
      }
    };

    $.fn[pluginName] = function(options, params) {
      return this.each(function() {
        var instance = $.data(this, pluginName);
        if (!instance) {
          $.data(this, pluginName, new Plugin(this, options));
        } else if (instance[options]) {
          instance[options](params);
        } else {
          window.console && console.log(options ? options + ' method is not exists in ' + pluginName : pluginName + ' plugin has been initialized');
        }
      });
    };

    $.fn[pluginName].defaults = {
    };

    $(function() {
      $('[data-' + pluginName + ']')[pluginName]();
    });
}(jQuery, window));
