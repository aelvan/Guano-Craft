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
        targetY = scrollTop-$grid.offset().top;
      }
      
      $sideColumn.animate({ marginTop: targetY }, 600, 'easeInOutGuano');
    } else {
      $sideColumn.css({ marginTop: 0 });
    }
  }
  
  function guanoNow_Init() {
    var $form = $('#entry-form');
  
    if (($form.length>0) && ($form.find('.guano-submit').length==0)) {
      
      // add save and continue button
      var $submitBtnGroup = $form.find('.inputs .btngroup.submit');
      
      if ($submitBtnGroup.length>0) {
        var $tbody = $submitBtnGroup.closest('tbody');
        
        if ($tbody.length>0) {
          $tbody.prepend('<tr><td colspan="2"><input type="button" class="btn submit guano-submit" value="' + langStrSaveAndContinue + '" tabindex="0"></td></tr>');
          
          $tbody.on('click', '.guano-submit', function (e) {
            e.preventDefault();
            $form.append('<input type="hidden" name="redirect" value="' + $form.data('saveshortcut-redirect') + '">');
            $form.submit();
          });
        }
      }
      
      // make sidebar fixed
      var $grid = $form.find('.grid');
      var $mainColumn = $grid.find('.item[data-position="left"]');
      var $sideColumn = $grid.find('.item[data-position="right"]');
      var guanoNowTimeout = -1;
      
      $(window).scroll(function (e) {
        
        clearTimeout(guanoNowTimeout);
        guanoNowTimeout = setTimeout(function () {
          if($mainColumn.css('width') != $grid.css('width')) {
            guanoNow_ScrollEvent($grid, $sideColumn);
          } else {
            $sideColumn.css({ marginTop: 0 });
          }
        }, 200); 
        
      });
    }
  }
  
	guanoNow_Init();
});

