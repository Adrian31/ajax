
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
    return false;
    //600x400
};

$('#form-container').submit(loadData);
