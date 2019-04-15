(function($) {
  // 初期状態のテーブルを格納
  var $original;
  // DOM操作に必要な要素
  var $table, $parent, $thead, $thead_th, $thead_first_th, $tbody, $tbody_tr, $tbody_first_th;
  // テーブルの可視範囲を定義する要素（CSSで定義する）
  var $viewport;
  var tbody_first_th_width;
  // 形成後の列の幅を格納
  var row_width;
  // レスポンシブ対応のフラグ
  var is_pc;
  // 初期設定
  var config = {
    el_width: 200,
    sp_el_width: 300,
    breakpoint: 0
  };

  $.fn.scrollableTable = function(options) {
    init(this, options);
  };

  function init($el, options) {
    // オプションが渡されていなかったら空のオブジェクトを格納
    options = options ? options : {};
    // テーブルのクローンを保存
    $original = $el.clone(true);

    // その他の要素を各変数に保存
    $table = $el;
    $parent = $table.parent();
    $thead = $('thead', $table);
    $thead_th = $('tr th', $thead);
    $thead_first_th = $('tr th:first-child', $thead);
    $tbody = $('tbody', $table);
    $tbody_tr = $('tr', $tbody);
    $tbody_first_th = $('tr th:first-child', $tbody);

    // viewportを作成
    $viewport = $('<div class="table-viewport"></div>');

    // 設定のkeyを配列に
    var config_map = Object.keys(config);

    // optionsに該当のキーがあれば設定を上書き
    for (var i = 0; i < config_map.length; i++) {
      if (options[config_map[i]]) {
        config[config_map[i]] = options[config_map[i]];
      }
    }

    // option.brakepointが設定してあった場合画面幅からフラグを設定
    if (config.breakpoint && window.innerWidth <= config.breakpoint) {
      is_pc = false;
      row_width = config.sp_el_width;
    } else {
      is_pc = true;
      row_width = config.el_width;
    }

    // option.brakepointが設定してあった場合リサイズイベントを講読
    if (config.breakpoint) {
      $(window).on('resize', resize);
    }

    // scrollable-tableを作成し置き換え
    renderElement();

    // $viewport要素のスクロールイベントを講読
    $viewport.on('scroll', tableScroll);
  }

  // scrollable-tableに置き換える処理
  function renderElement() {
    // 左上端の要素を除いたthead > tr > thの個数
    var thead_th_length = $('tr th:not(:first-child)', $thead).length;

    // tableに横幅と、左端の余白を消すスタイルを指定
    $table.css({
      'width': row_width * (thead_th_length + 1) + 'px',
      'margin-left': - row_width + 'px'
    });

    // 左上端の要素の横幅を取得
    tbody_first_th_width = $tbody_first_th.outerWidth();

    // theadのサイズと位置ずらすスタイルを指定
    $thead.css({
      'width': row_width * thead_th_length + 'px',
      'transform': 'translate(' + row_width + 'px, -100%)'
    });

    // thead > tr > thに横幅を指定
    $thead_th.css({
      width: row_width + 'px'
    })

    // 左端の要素をズラすスタイルを指定
    $tbody_first_th.css('transform', 'translateX(' + (row_width - tbody_first_th_width) + 'px)');

    // 左上端の要素の横幅を指定
    $thead_first_th.css('width', tbody_first_th_width + 'px');

    // 各行の項目高さに合わせて項目めいの高さを指定
    $tbody_tr.each(function(index, $tr) {
      $('th:first-child', $tr).css('height', $('th:nth-child(2), td:nth-child(2)', $tr).height() + 'px');
    });

    // 要素を置き換え
    $viewport.append($table);
    $parent.append($viewport);

    // theadの高さを取得
    var thead_height = $thead.height();

    // $viewportをズラすスタイルを指定
    $viewport.css({
      'margin-top': thead_height + 'px',
      'margin-left': tbody_first_th_width + 'px',
      'width': 'calc(100% - ' + tbody_first_th_width + 'px)'
    });
  }

  function tableScroll(event) {
    $thead_first_th.css('transform', 'translateX( ' + (event.target.scrollLeft - tbody_first_th_width) + 'px)');

    $thead.css('transform', 'translate(' + (row_width - event.target.scrollLeft) + 'px, -100%)');
    $tbody_first_th.css('transform', 'translate(' + (row_width - tbody_first_th_width) + 'px, ' + (-event.target.scrollTop) + 'px)');
  }

  // テーブルを元に戻す処理
  function restore() {
    $viewport.off('scroll');
    $(window).off('resize');
    $viewport.remove();
    $parent.append($original);
  }

  // レスポンシブ用の切り替え処理
  function resize() {
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