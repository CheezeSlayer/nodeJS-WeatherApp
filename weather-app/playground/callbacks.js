var getUser = (id, callback) => {
  var user = {
    id: id,
    name: 'Henry'
  };

  setTimeout(() => {
    callback(user);
  }, 3000);
};

getUser(31, (userObject) => {
  console.log(userObject);
});

https://maps.googleapis.com/maps/api/geocode/json?address= 6555 Wade Road
