import React from 'react'
import { Slider, Switch } from 'antd';
class Progress extends React.Component {
  constructor(props) {
  	//console.log(props)
    super(props);
    this.state = {
        disabled: false
    };
  }
  handleDisabledChange (disabled) {
    this.setState({ disabled });
  }
  onChange(value){
     //console.log('onChange: ', value);
     this.props.onProgressChange&& this.props.onProgressChange(value)
  }
  formatter(value) {
    return `${value}%`;
  }
  render() {
    const { disabled } = this.state;
    //console.log(this.props.progress)
    return (
      <div>
        <Slider tipFormatter={this.formatter.bind(this)} onChange={this.onChange.bind(this)} value={Number(this.props.progress)} disabled={!this.props.isPlay} defaultValue={0} step={0.01} />
      </div>
    );
  }
}


export default Progress;