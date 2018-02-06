$(document).ready(function(){
   $('#loader').show();
   var totalImages = $(".materialboxed").length;
   var iLoaded = 0;
   $(".materialboxed").each(function () 
   {
     $(this).bind("load", function()
     {
       iLoaded++;
       if(iLoaded == totalImages)
       {
          $('#loader').hide();
       }
       $(this).attr('src', $(this).attr("src"));
    });
  });
});