/* TODO
 - Add a "loader" function
 - Move the "fetcher" to another file
*/

var UI = require("ui");
var ajax = require("ajax");

var main = new UI.Card({
  title: "EssentialsPE",
  body: "Press any button to continue!"
});
main.show();
main.on("click", "select", function(event){
  fetcher();
});
main.on("click", "up", function(event){
  fetcher();
});
main.on("click", "down", function(event){
  fetcher();
});

var fetcher = function(){
  var waitCard = new UI.Card({
    title: "Please wait...",
    body: "Fetching latest information"
  });
  waitCard.show();
  
  ajax(
    {url: "http://forums.pocketmine.net/api.php?action=getResource&value=886", type: "json"},
    function(json){
      var update = new Date(json.last_update * 1000);
      var info = new UI.Menu({
        sections: [{
            title: "GENERAL INFORMATION",
            items: [{
                title: "Name",
                subtitle: json.title
              },{
                title: "Author",
                subtitle: json.username
              },{
                title: "Current Version",
                subtitle: json.version_string
              },{
                title: "Publish Date",
                subtitle: "12/24/2014"
              },{
                title: "Latest Update",
                subtitle: (update.getMonth() + 1) + "/" + update.getDate() + "/" + update.getFullYear()
              }]
          },{
            title: "STADISTICS",
            items: [{
              title: "Download Count",
              subtitle: (json.download_count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            },{
              title: "All-Time Ratings",
              subtitle: json.rating_count
            },{
              title: "All-Time Average",
              subtitle: (json.rating_sum / json.rating_count).toString().substr(0, 3)
            },{
              title: "Version Downloads",
              subtitle: (json.version_download_count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            },{
              title: "Version Ratings",
              subtitle: json.version_rating_count
            },{
              title: "Version Average",
              subtitle: (json.version_rating_sum / json.version_rating_count).toString().substr(0, 3)
            }]
        }]
      });
      info.show();
    },
    function(error){
      var errorCard = new UI.Card({
        title: "[Error]",
        body: "Something went wrong while fetching the data\nPlease verify your connection to internet"
      });
      errorCard.show();
    }
  );
  
  waitCard.hide();
};
