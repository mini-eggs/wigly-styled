var wigly = require("wigly");
var tags = require("dom-tags");
var stringcss = require("string-css").default;

var styled = {};

function createComponent(key) {
  return function(style) {
    return function(props) {
      var stateTuple = wigly.state(function() {
        return stringcss.css(style);
      });

      wigly.effect(function() {
        stringcss.inject();
      }, 0);

      var classProp = {
        class: props.class ? stateTuple[0] + " " + props.class : stateTuple[0]
      };

      return wigly.h.apply(
        null,
        [key, Object.assign({}, props, classProp)].concat(props.children || [])
      );
    };
  };
}

for (var e = 0; e < tags.length; e++) {
  styled[tags[e]] = createComponent(tags[e]);
}

module.exports = styled;
