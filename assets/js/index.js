/*jshint browser:true, laxcomma:true, eqnull:true, indent:2, unused:true, undef:true, devel:true, jquery:true*/
/*globals jQuery, window */

(function ($) {

  /**
   * Main JS file for Plasma behaviours
   */

  "use strict";

  $(document).ready(function(){

    // On the home page, move the blog icon inside the header 
    // for better relative/absolute positioning.

    //$("#blog-logo").prependTo("#site-head-content");


    // easy infinite-scroll ;D
    $(window).scroll(function () {
      var _nextPosts = $('.pagination a.older-posts');
      if (_nextPosts.length > 0) {
        var _nextPostsLink = $(_nextPosts).attr('href');
        //console.log($(window).scrollTop(), /*$(document).height(), $(window).height(),*/ $(document).height() - $(window).height() - $('footer').height());
        if ($(window).scrollTop() >= ($(document).height() - $(window).height() - $('footer').height())) {
          $.ajax({
            url: _nextPostsLink,
            success: function (data) {
              if (data) {
                var _posts = $(data).find('article')
                  , _nextPagination = $(data).find('.pagination')
                  ;
                $('.pagination').remove();
                $(_posts).each(function (ip, post) {
                  $(post).appendTo('.content');
                });
                $('.content').append($(_nextPagination));
                $('.content .pagination').hide();
              }
            }
          });
        }
      }
    });

  });

}(jQuery));