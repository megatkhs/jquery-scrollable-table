(function($) {
  var $original;
  var $table, $parent, $thead, $thead_th, $thead_first_th, $thead_last_th, $tbody, $tbody_tr, $tbody_first_th;
  var $container, $viewport;
  var tbody_first_th_width;
  var row_width;
  var is_pc;
  var config = {
    el_width: 200,
    sp_el_width: 300,
    breakpoint: 0
  };

  $.fn.scrollableTable = function(options) {
    init(this, options);
  };

  function init($el, options) {
    options = options ? options : {};
    $original = $el.clone(true);
    $table = $el;
    $parent = $table.parent();
    $thead = $('thead', $table);
    $thead_th = $('tr th', $thead);
    $thead_first_th = $('tr th:first-child', $thead);
    $thead_last_th = $('tr th:last-child', $thead);
    $tbody = $('tbody', $table);
    $tbody_tr = $('tr', $tbody);
    $tbody_first_th = $('tr th:first-child', $tbody);

    $viewport = $('<div class="table-viewport"></div>');

    var config_map = Object.keys(config);

    for (var i = 0; i < config_map.length; i++) {
      if (options[config_map[i]]) {
        config[config_map[i]] = options[config_map[i]];
      }
    }

    if (config.breakpoint && window.innerWidth <= config.breakpoint) {
      is_pc = false;
      row_width = config.sp_el_width;
    } else {
      is_pc = true;
      row_width = config.el_width;
    }

    if (config.breakpoint) {
      $(window).on('resize', resize);
    }

    renderElement();
    $viewport.on('scroll', tableScroll);
  }

  function renderElement() {
    var thead_th_length = $('tr th:not(:first-child)', $thead).length;
    $table.css({
      'width': row_width * (thead_th_length + 1) + 'px',
      'margin-left': - row_width + 'px'
    });

    var subject_width = $('tbody tr th:first-child', $table).outerWidth();
    $thead_first_th.css({
      'width': subject_width + 'px'
    });
    tbody_first_th_width = $tbody_first_th.outerWidth();
    tbody_th_width = $('tr th:not(:first-child)', $tbody).outerWidth();

    $thead.css({
      'width': row_width * thead_th_length + 'px',
      'transform': 'translate(' + row_width + 'px, -100%)'
    });

    $thead_th.css({
      width: row_width + 'px'
    })

    $tbody_first_th.css('transform', 'translateX(' + (row_width - tbody_first_th_width) + 'px)');

    $thead_first_th.css('width', tbody_first_th_width + 'px');

    var userAgent = navigator.userAgent.toLowerCase();
    var isSingleAdjust = userAgent.indexOf('msie') != -1 || userAgent.indexOf('trident') > -1;
    var adjust =  isSingleAdjust ? 1 : 2;
    $thead_last_th.css('width', row_width - adjust + 'px');

    $tbody_tr.each(function(index, $tr) {
      $('th:first-child', $tr).css('height', $('th:nth-child(2), td:nth-child(2)', $tr).height() + 'px');
    });

    $viewport.append($table);
    $parent.append($viewport);


    var thead_height = $thead.height();
    $viewport.css({
      'margin-top': thead_height + 'px',
      'margin-left': tbody_first_th_width + 'px',
    });
  }

  function tableScroll(event) {
    $thead_first_th.css('transform', 'translateX( ' + (event.target.scrollLeft - tbody_first_th_width) + 'px)');

    $thead.css('transform', 'translate(' + (row_width - event.target.scrollLeft) + 'px, -100%)');
    $tbody_first_th.css('transform', 'translate(' + (row_width - tbody_first_th_width) + 'px, ' + (-event.target.scrollTop) + 'px)');
  }

  function restore() {
    $viewport.off('scroll');
    $(window).off('resize');
    $viewport.remove();
    $parent.append($original);
  }

  function resize(event) {
    if (is_pc && window.innerWidth <= config.breakpoint) {
      is_pc = false;
      restore()
      init($original)
    } else if (!is_pc && window.innerWidth > config.breakpoint) {
      is_pc = true;
      restore()
      init($original)
    }
  }
})( jQuery );