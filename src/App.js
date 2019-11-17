import React, { Component } from 'react';
import { Stage, Layer, Line, Rect, Text } from 'react-konva';
import Konva from 'konva';

class ColoredRect extends React.Component {
  state = {
    color: 'red'
  };
  handleClick = () => {
    let color = Konva.Util.getRandomColor()
    this.setState({
      color: color
    });
    // 親コンポーネントに値渡し
    this.props.onClick(color)
  };
  render() {
    return (
      <Rect
        x={20}
        y={20}
        width={50}
        height={50}
        fill={this.state.color}
        shadowBlur={5}
        onClick={this.handleClick}
      />
    );
  }
}

class App extends Component {
  state = {
    lines: [],
    color: 'red'
  };

  handleMouseDown = () => {
    this._drawing = true;
    // add line
    this.setState({
      lines: [...this.state.lines, []]
    });
  };

  handleMouseMove = e => {
    // no drawing - skipping
    if (!this._drawing) {
      return;
    }
    const stage = this.stageRef.getStage();
    const point = stage.getPointerPosition();
    const { lines } = this.state;

    let lastLine = lines[lines.length - 1];
    // add point
    lastLine = lastLine.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    this.setState({
      lines: lines.concat()
    });
  };

  handleMouseUp = () => {
    this._drawing = false;
  };

  handleClick = color => {
    this.setState({ color: color });
  }

  render() {
    return (
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onContentMousedown={this.handleMouseDown}
        onContentMousemove={this.handleMouseMove}
        onContentMouseup={this.handleMouseUp}
        ref={node => {
          this.stageRef = node;
        }}
      >
        <Layer>
          <Text text="何か書いてもいいよ" />
          <ColoredRect
            onClick={color => this.handleClick(color)}
           />
          {this.state.lines.map((line, i) => (
            <Line key={i} points={line} stroke={this.state.color} />
          ))}
        </Layer>
      </Stage>
    );
  }
}

export default App;
