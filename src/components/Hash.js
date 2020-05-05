// Get the hash of the url
var Hash = {access_token: '', token_type: '', expires_in: 0}

const temp = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function(initial, item) {
    console.log(initial);
    console.log(item);
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});

window.location.hash = "";

if(temp.access_token){
  Hash = temp;
}

export default Hash;
