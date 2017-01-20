var accounts = ["day9tv", "LoadingReadyRun", "FreeCodeCamp", "bbrode", "griffinmcelroy", "noobs2ninjas", "itshafu", "storbeck", "RobotCaleb", "shelbyplays", "sagecora", "brunofin"];
$(document).ready(function() {
  accounts.forEach(function(account) {
    $.getJSON('https://api.twitch.tv/kraken/streams/' + account + '?callback=?', function(res) {
      var game, status, isOnline;
      if (res.stream === null) {
        isOnline = "offline";
        game = "Offline";
        status = "";
      } else if (res.stream) {
        isOnline = "online";
        game = res.stream.game + ": ";
        status = res.stream.channel.status;
      } else {
        isOnline = "offline";
        game = "User doesn't exist";
        status = "";
      }
      $.getJSON('https://api.twitch.tv/kraken/channels/' + account + '?callback=?', function(res) {
        if (res.display_name) {
          var name = res.display_name;
        } else {
          name = account;
        }
        if (res.logo) {
          var logo = res.logo;
        } else {
          logo = "http://sunfieldfarm.org/wp-content/uploads/2014/02/profile-placeholder.png";
        }
        html = "<li class='" + isOnline + "'><div class='row'><div class='col-xs-4 col-md-2'><img src=" +
          logo +
          " class='img-circle' height='60' /></div>" +
          "<div class='col-xs-4 col-md-4 extra'><a href='https://www.twitch.tv/" +
          account + "' target='_blank'>" + name +
          "</a></div><div class='col-xs-6 col-md-6 extra'>" +
          game + status +
          "</div></div></li>";

        if (isOnline === "online") {
          $(".streamer-list").prepend(html);
        } else {
          $(".streamer-list").append(html);
        }
      });
    });
  });
});

$("#online").click(function() {
  $(".offline").hide();
  $(".online").show();
});

$("#offline").click(function() {
  $(".online").hide();
  $(".offline").show();
});

$("#all").click(function() {
  $(".online").show();
  $(".offline").show();
});
