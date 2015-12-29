
var Hello = React.createClass({
  render: function() {
    return <div>Hello </div>;
  }
});

ReactDOM.render(
  <Hello name="World" />,
  document.getElementById('container')
);
