var assign = require('react/lib/Object.assign');
var styles = {};

styles.val = {
  display: 'inline-block',
  padding: 10,
  margin: 10,
  borderBottom: '4px solid',
  backgroundColor: '#fff',
  cursor: 'pointer'
};

styles.avg = assign({}, styles.val, {
  backgroundColor: '#ccc',
});

styles.panel = {
  float: 'left',
  width: '200px',
  backgroundColor: '#fff',
  padding: 10,
  margin: 20
};

module.exports = styles;

