
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

    // YOUR CODE GOES HERE!


    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
      'api-key': "465d16df04094182b0082fff05e0ecca",
      'q': address,
    });

    $.getJSON(url, function (data){

      $.ajax({
        url: url,
        method: 'GET',
      }).done(function(result) {
        console.log(result);
      }).fail(function(err) {
        throw err;
      });

      //Old Code for reference
      /*articles = data.response.docs;
        for(var i=0; i < articles.length; i++){
            var article = articles[i];
            $nytElem.append('<li class="article">' + '<a href="'+article.web_url+'">'+article.headline.main+ '</a>' + '<p>' + article.snippet + '</p>' + '</li>');
        };*/

        //New code that displays things much cleaner
        articles = data.response.docs;
        for(var i = 0; i < articles.length; i++){
          var article = articles[i];
          $nytElem.append('<li class = "article">' +
            '<a href="'+article.web_url+'">'+article.headline.main+
              '</a>'+
            '<p>' + article.snippet + '</p>' +
          '</li>');
        };

      });
      // Built by LucyBot. www.lucybot.com
    return false;
    };

$('#form-container').submit(loadData);
