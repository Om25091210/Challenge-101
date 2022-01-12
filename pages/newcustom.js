import { useEffect } from 'react';

function Customjs() {
  useEffect(() => {
    $('.overhight').mCustomScrollbar({
      autoHideScrollbar: true
    });

    $('.bellHight').mCustomScrollbar({
      autoHideScrollbar: true
    });

    // $('.tab_data_scroll').mCustomScrollbar({
    //   autoHideScrollbar: true
    // });

    /* ----------- create post slider ----------------- */

    $('.user_slider').slick({
      infinite: false,
      vertical: true,
      verticalSwiping: true,
      slidesToShow: 1,
      slidesToScroll: 1
    });

    $('.slider-for').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      fade: true
    });

    $('.fancybox').fancybox();

    $('.quickpoup').fancybox({
      wrapCSS: 'quickcss',
      width: 1200,
      height: 600,
      autoSize: false
    });

    $('.common_poup').fancybox({
      wrapCSS: 'common_poup_wrap',
      autoSize: true
    });

    $('.videos').fancybox({
      wrapCSS: 'videocss',
      width: 600,
      height: 400,
      autoSize: false
    });

    /* ----------- input type file tabs ----------------- */

    jQuery('a.hideShow').click(function () {
      jQuery(this).toggleClass('up');
      jQuery(this).next().slideToggle();
    });

    jQuery('a.view').click(function () {
      jQuery(this).parent().next().addClass('show');
    });

    jQuery('.squads_close').click(function () {
      jQuery(this).parent().removeClass('show');
    });

    jQuery('.left_side').hover(function () {
      jQuery('.logo').toggleClass('bigwidth');
    });

    /* ----------- chat tabs ----------------- */

    jQuery('.dlab-chat-user-box .dlab-chat-user').on('click', function () {
      jQuery('.dlab-chat-user-box').addClass('d-none');
      jQuery('.dlab-chat-history-box').removeClass('d-none');
      //$(".chatbox .msg_card_body").height(vHeightArea());
      //$(".chatbox .msg_card_body").css('height',vHeightArea());
    });

    jQuery('.dlab-chat-history-back').on('click', function () {
      jQuery('.dlab-chat-user-box').removeClass('d-none');
      jQuery('.dlab-chat-history-box').addClass('d-none');
    });

    jQuery('.dlab-fullscreen').on('click', function () {
      jQuery('.dlab-fullscreen').toggleClass('active');
    });

    jQuery('.open_chat_box').on('click', function () {
      jQuery('.chatbox').addClass('active');
    });
    jQuery('.chatbox-close').on('click', function () {
      jQuery('.chatbox').removeClass('active');
    });

    /* -------  Profile ------------*/

    $('.profile_tab_btn li a').click(function () {
      $('.prfoile_tab_data .tab').addClass('hide');
      var rel = jQuery(this).attr('rel');
      $('#' + rel).removeClass('hide');
      $('.profile_tab_btn li a').parent().removeClass('active');
      $(this).parent().addClass('active');
    });

    $('.games_btn li a').click(function () {
      $('.games_data .tab').addClass('hide1');
      var rel = jQuery(this).attr('rel');
      $('#' + rel).removeClass('hide1');
      $('.games_btn li a').parent().removeClass('active');
      $(this).parent().addClass('active');
    });

    /* ----------- team ---------------- */

    $('.size-option ul li')
      .css({ cursor: 'pointer' })
      .on('click', function () {
        $(this)
          .parent()
          .find('li')
          .not($(this))
          .removeClass('active')
          .find('ul')
          .hide();
        $(this)
          .parent()
          .find('li')
          .not($(this))
          .removeClass('active')
          .find('.size-chart')
          .hide();
        $(this).toggleClass('active');
        //(this).parent().find('li').hide();

        $(this).find('ul').toggle();
        $(this).find('.size-chart').toggle();
      });

    (function ($) {
      $(window).load(function () {
        $('.content').mCustomScrollbar();
      });
    });

    if (screen.width <= 767) {
      $('.top_click').click(function () {
        $('.left_side').toggleClass('show_left_menu');

        $(this).toggleClass('active');
      });
    }

    var options = [];

    $('.dropdown-menu a').on('click', function (event) {
      var $target = $(event.currentTarget),
        val = $target.attr('data-value'),
        $inp = $target.find('input'),
        idx;

      if ((idx = options.indexOf(val)) > -1) {
        options.splice(idx, 1);
        setTimeout(function () {
          $inp.prop('checked', false);
        }, 0);
      } else {
        options.push(val);
        setTimeout(function () {
          $inp.prop('checked', true);
        }, 0);
      }

      $(event.target).blur();

      console.log(options);
      return false;
    });
    // $('#coverPhoto').change(function (e) {
    //   var img = e.target.files[0];

    //   if (
    //     !pixelarity.open(
    //       img,
    //       false,
    //       function (res) {
    //         $('#result').attr('src', res);
    //       },
    //       'jpg',
    //       1
    //     )
    //   ) {
    //     alert('Whoops! That is not an image!');
    //   }
    // });

    ('use strict');

    (function (document, window, index) {
      var inputs = document.querySelectorAll('.inputfile');
      Array.prototype.forEach.call(inputs, function (input) {
        var label = input.nextElementSibling,
          labelVal = label.innerHTML;

        input.addEventListener('change', function (e) {
          var fileName = '';
          if (this.files && this.files.length > 1)
            fileName = (
              this.getAttribute('data-multiple-caption') || ''
            ).replace('{count}', this.files.length);
          else fileName = e.target.value.split('\\').pop();

          if (fileName) label.querySelector('span').innerHTML = fileName;
          else label.innerHTML = labelVal;
        });

        // Firefox bug fix
        input.addEventListener('focus', function () {
          input.classList.add('has-focus');
        });
        input.addEventListener('blur', function () {
          input.classList.remove('has-focus');
        });
      });
    })(document, window, 0);
  }, [2]);

  return null;
}

export default Customjs;
