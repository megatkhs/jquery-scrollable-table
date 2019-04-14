(function() {
  window.addEventListener('load', initTable);

  function initTable() {
    $('table').scrollableTable({
      'el_width': 300,
      'sp_el_width': 200,
      'breakpoint': 798
    });
  }
})();