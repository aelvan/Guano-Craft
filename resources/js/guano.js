jQuery.extend( jQuery.easing, {
    easeInOutGuano: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t + b;
        return -c/2 * ((--t)*(t-2) - 1) + b;
    }
});


$(function () {

  function guanoNow_ScrollEvent($grid, $sideColumn) {
    if ($sideColumn.outerHeight()<$(window).height()-50) {
      var scrollTop = $(window).scrollTop();
      var targetY = 0;

      if (scrollTop > $grid.offset().top) {
        targetY = scrollTop-$grid.offset().top+10;
      }

      $sideColumn.animate({ marginTop: targetY }, 300, 'easeInOutGuano');
    } else {
      $sideColumn.css({ marginTop: 0 });
    }
  }

  function guanoNow_Init() {
    var $form = $('#container');
    var $entryIdInput = $('input[name="entryId"]');

    if (($entryIdInput.length>0) && ($form.length>0) && ($form.find('.guano-save').length==0)) {

        //Check if error exist
    if ($('.errors').length) {
        var $errors = $('#fields, #content').find(' > div .input.errors:eq(0)');
        if ($errors.length) {
            var $error = $errors.find('.matrixblock').length ? $errors.find('.errors:eq(0)').closest('.matrixblock') : $errors.closest('.field');
            $error = $error.length ? $error : $errors.find('.errors:eq(0)');
            $error.addClass('guano-errorScale');
            $('html, body').animate({scrollTop: ($error.offset().top - 50) + 'px'}, function() {
               $error.addClass('guano-errorScaleDown');
               setTimeout(function () { $error.removeClass('guano-errorScaleDown'); }, 500);
            });
        }
    }

      var $grid = $form.find('.grid');
      var $mainColumn = $grid.find('.item[data-position="left"]');
      var $sideColumn = $grid.find('.item[data-position="right"]');
      var $btngroup = $form.find('.btngroup');


      if ($sideColumn.length>0 && $btngroup.length>0) {

          $sideColumn.append('<div class="guano-button-wrapper"><input type="button" class="btn submit guano-save" value="' + langStrSave + '" tabindex="0"><input type="button" class="btn submit guano-save-continue" value="' + langStrSaveAndContinue + '" tabindex="0"></div>');

          $sideColumn.on('click', '.guano-save-continue', function (e) {
            e.preventDefault();

                        var redirectUrl = $form.data('saveshortcut-redirect');
                        var selectedTab = $('.tabs .tab.sel');

                        if (selectedTab.length>0) {
                            redirectUrl += selectedTab.attr('href');
                        }

            $form.append('<input type="hidden" name="redirect" value="' + redirectUrl + '">');
            $form.submit();
          });

          $sideColumn.on('click', '.guano-save', function (e) {
            e.preventDefault();
            $form.submit();
          });
      }

      // make sidebar fixed
      var guanoNowTimeout = -1;

      $(window).scroll(function (e) {
        clearTimeout(guanoNowTimeout);
        guanoNowTimeout = setTimeout(function () {
          if($mainColumn.css('width') != $grid.css('width')) {
            guanoNow_ScrollEvent($grid, $sideColumn);
          } else {
            $sideColumn.css({ marginTop: 0 });
          }
        }, 100);

      });
    }
  }

    guanoNow_Init();
});
