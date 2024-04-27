let zak = "zak";
let sally = "sally";
let holly = "holly";
let molly = "molly";
const element = /*#__PURE__*/React.createElement("ul", {
  style: {
    'color': 'blue',
    'fontSize': '24px'
  }
}, /*#__PURE__*/React.createElement("li", null, zak), /*#__PURE__*/React.createElement("li", null, sally), /*#__PURE__*/React.createElement("li", null, holly), /*#__PURE__*/React.createElement("li", null, molly));
ReactDOM.render(element, document.getElementById("content"));