const fs = require('fs');

var getDefault = () => {
  try {
    var defaultAddress = fs.readFileSync('default-address.json');
    return JSON.parse(defaultAddress);
  }
  catch (e) {
    return [];
  }

};

var saveDefault = (defaultAddress) => {
  fs.writeFileSync('default-address.json', JSON.stringify(defaultAddress));
};

module.exports = {
  getDefault,
  saveDefault
}
