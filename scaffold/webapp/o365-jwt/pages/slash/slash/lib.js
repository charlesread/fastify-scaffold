$(document).ready(function () {

  var _v

  _v = new Vue({
    el: '#_v',
    data: {
      user: undefined
    }
  })

  $.ajax({
    url: '/poll',
    complete: function (xhr, status) {
      var {status} = xhr
      var body = xhr.responseJSON
      if (status === 200 && body.authenticated) {
        _v.user = body.user
      }
    }
  })

});