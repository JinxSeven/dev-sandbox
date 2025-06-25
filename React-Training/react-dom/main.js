const React = require("react");
const ReactDOM = require("react-dom");

const msg = "Jello!"
console.log(msg);

ReactDOM.render
(
    React.createElement('p', null, "DOM Bacix"),
    document.querySelector('#root')
)