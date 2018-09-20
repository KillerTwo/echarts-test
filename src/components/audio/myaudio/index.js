import React from 'react';
import { Button, Row, Col, Icon, Slider } from 'antd';
import './index.less';


export default class MyAudio extends React.Component {
    
    state = {
        playIcon: false,
        currentTime: 0,
        interval: undefined,
    }
    componentDidMount() {
        //console.log(this.audio);
        // window.onload= function() {
        //     console.log('cdm时间',this.audio.startDate);
        //     this.setState({
        //         totalSecond: this.audio.duration
        //     });
        // }
        //console.log(this.audio.currentSrc);
        setTimeout(()=>{
            console.log('cdm音频url:', this.audio.currentSrc);
            console.log('总时间',this.audio.duration);
            // 去掉小数位
            console.log((this.audio.duration).toFixed(0));
            this.setState({
                totalSecond: (this.audio.duration).toFixed(0)
            });
        },1000);
    }

    increase = () => {
        
        // console.log('音频src',this.audio.currentSrc);
        console.log('前进');
        let currentTime = this.state.currentTime + 10;
        this.audio.currentTime = currentTime;
        let totalSecond  = this.audio.duration;
        if (currentTime > totalSecond) {
            currentTime = totalSecond;
        }
        this.setState({
            currentTime,
            
         });
      }
    
      decline = () => {
        console.log('后退');
        
        let currentTime = this.state.currentTime - 10;
        this.audio.currentTime = currentTime;
        if (currentTime < 0) {
            currentTime = 0;
        }
        this.setState({ 
            currentTime,
            
        });
      }
       // 点击开始播放
      playAudio = ()=>{
        
        this.audio.play();
        let interval = setInterval(()=>{
            console.log('播放中',this.audio.currentTime);
            let playIcon = this.state.playIcon;
            if(this.audio.ended){
                clearInterval(this.state.interval);
                playIcon = false;
            }
            this.setState({
                currentTime: this.audio.currentTime,
                playIcon: playIcon
            });
        }, 1000);
        this.setState({
            playIcon: true,
            interval
        });
      }
       // 点击暂停播放
      stopAudio = ()=>{
        
        this.audio.pause();
        if(this.state.interval !== undefined){
            clearInterval(this.state.interval);
        }
        this.setState({
        playIcon: false,
        });
      }

      forward = ()=>{
        console.log('前进');
        this.audio.currentTime = 1000;
      }
      backward = ()=>{
        console.log('后退');
      }
      formatter = (value)=>{
          console.log(value);
          return value;
      }

      changeCurrent = (value) => {
        this.audio.currentTime = value;
        this.setState({
          currentTime: value,
        });
      }

      s_to_hs = (s)=>{
          //计算分钟
        //算法：将秒数除以60，然后下舍入，既得到分钟数
        var h;
        h  =   Math.floor(s/60);
        //计算秒
        //算法：取得秒%60的余数，既得到秒数
        s  =   s%60;
        //将变量转换为字符串
        h    +=    '';
        s    +=    '';
        //如果只有一位数，前面增加一个0
        h  =   (h.length==1)?'0'+h:h;
        s  =   (s.length==1)?'0'+s:s;
        return h+':'+s;
      }

    render() {
        return (
            <div>
                <Row>
                    <Col span={8} offset={8}>
                        <div>
                            <audio src="./LON - 我的一个道姑朋友（Cover タイナカ彩智）.mp3" id='music' controls='controls' preload='auto' ref={(audio)=>{this.audio = audio}}>
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={8} offset={8}>
                        <div>
                            {/* <Progress percent={this.state.percent} /> */}
                            <span>{this.s_to_hs(this.state.totalSecond)}</span>
                            <Icon type="sound" theme="outlined" style={{ fontSize:18}} />
                            {/* <Button type="primary" shape="circle" icon="sound" size='small'/> */}
                            <Slider 
                                tipFormatter={this.formatter} 
                                onChange={this.changeCurrent} 
                                value={this.state.currentTime}
                                min={0}
                                max={parseInt(this.state.totalSecond)}
                            />
                            
                            <div className='operatorBtn'>
                                <Button type="primary" shape="circle" icon="backward" style={{marginRight: 5}} onClick={this.decline}/>
                                {
                                    this.state.playIcon ? <Button type="primary" shape="circle" icon="pause-circle" style={{marginRight: 5}} onClick={this.stopAudio} /> :
                                    <Button type="primary" shape="circle" icon="play-circle" style={{marginRight: 5}} onClick={this.playAudio}/>
                                }
                                <Button type="primary" shape="circle" icon="forward" style={{marginRight: 5}} onClick={this.increase}/>
                                
                            </div>
                        </div>
                    </Col>
                </Row>

            </div>
            
            
        );
    }
}
