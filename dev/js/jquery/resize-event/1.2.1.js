(function( $ ){

  $.fn.onResize = function( options, callback ) {

    var target = $(this)[0]
    var defaults = {
      attributes: true,
      childList: false,
      characterData: false,
    };
    var settings = $.extend({}, defaults, options);

    function makeid (el) {
      return [target.style.width, target.style.height, target.clientWidth, target.clientHeight].join('')
    }

    var last = makeid(target)
    var observer = new MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i++) {
        var mutation = mutations[i]
        if (mutation.attributeName !== 'style') continue
        var now = makeid(target)
        if (now !== last) {
          callback.call(this)
          last = now
          break
        }
      }
    })

    observer.observe(target, {
      attributes: true,
      childList: false,
      characterData: false
    })

    return observer
    
  };
})( jQuery );