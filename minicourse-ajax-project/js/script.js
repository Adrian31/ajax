
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    //https://maps.googleapis.com/maps/api/streetview?size=400x400&location=40.720032,-73.988354
    //&fov=90&heading=235&pitch=10
    //&key=AIzaSyBTu46MqI5xhnj3Upxwg5K7g4dhyuyqLO4

    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + "," + cityStr;

    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');
    $greeting.text('So you want to live at '+ address);

    // YOUR CODE GOES HERE!


    var nytimesUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '&sort=newest&api-key=465d16df04094182b0082fff05e0ecca';
    $.getJSON(nytimesUrl, function(data){
      //Old Code for reference
      /*articles = data.response.docs;
        for(var i=0; i < articles.length; i++){
            var article = articles[i];
            $nytElem.append('<li class="article">' + '<a href="'+article.web_url+'">'+article.headline.main+ '</a>' + '<p>' + article.snippet + '</p>' + '</li>');
        };*/
        //New code that displays things much cleaner
        $nytHeaderElem.text('New York Times Articles About ' + cityStr);

        articles = data.response.docs;
        for(var i = 0; i < articles.length; i++){
          var article = articles[i];
          $nytElem.append('<li class = "article">' +
            '<a href="'+article.web_url+'">'+article.headline.main+
              '</a>'+
            '<p>' + article.snippet + '</p>' +
          '</li>');
        };
      }).fail(function(e){
        $nytHeaderElem.text('New York Times Articles Could Not Be Loaded');
      });
      // Built by LucyBot. www.lucybot.com

      //Wikipedia Test
      var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr + '&format=json&callback=wikiCallback';

      var wikiRequestTimeout = setTimeout(function(){
        $wikiElem.text("failed to get wikipedia resources");
      }, 8000);

      $.ajax({
          url: wikiUrl,
          dataType: "jsonp",
          // jsonp: "callback",
          success: function( response ) {
             // do something with response
             var articleList = response[1];

             for(var i = 0; i < articleList.length; i++) {
               articleStr = articleList[i];
               var url = 'http://en.wikipedia.org/wiki/' + articleStr;
               $wikiElem.append('<li><a href="' + url + '">' +
                  articleStr + '</a></li>');
             };
             clearTimeout(wikiRequestTimeout);
          }
      });

    return false;
    };

$('#form-container').submit(loadData);
