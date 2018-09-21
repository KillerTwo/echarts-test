import React from 'react';
import { Button, Row, Col, Icon, Slider, Card } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import './../../../style/css/font-awesome.min.css';
import lrcoperator from './../extract/extract';
import lyc from './../extract/lycirs';

// import 'antd/dist/antd.css';
// import './index.css';
import './index.less';

export default class MyAudio extends React.Component {

    state = {
        playIcon: false,
        currentTime: 0,
        interval: undefined,
        slash: false,
        muted: false,
        volume: 0,
        value: 100,
        loop: false,
        lyricsContent: ''
    }
    componentDidMount() {
        setTimeout(()=>{
            // console.log('总时间是：',parseInt((this.audio.duration).toFixed(0))-0);
            // console.log('cdm音频url:', this.audio.currentSrc);
            // console.log('总时间',this.audio.duration);
            // 去掉小数位
            // console.log((this.audio.duration).toFixed(0));
            //console.log(this.audio.volume);
            //let value = this.audio.volume*100;
            this.setState({
                totalSecond: (this.audio.duration).toFixed(0),
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
            // console.log('播放中',this.audio.currentTime);
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

        this.audio.ontimeupdate = ()=>{
            //console.log('在此处显示歌词。');
            //console.log('获取到的歌词是：',lyc.getLyc());
            let results = lrcoperator.parseLyric(lyc.getLyc());
			let len = results.length;
			for(let i = 0; i < len; i++){
				if(this.audio.currentTime >= results[i][0]){
					this.setState({
                        lyricsContent: results[i][1]
                    });
				}
			}


            

        }
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

    //   forward = ()=>{
    //     console.log('前进');
    //     this.audio.currentTime = 1000;
    //   }
    //   backward = ()=>{
    //     console.log('后退');
    //   }
      formatter = (value)=>{
          // console.log(value);
          value = this.s_to_hs(value.toFixed(0));
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

      soundChange = (value)=>{
        // console.log('点击改变音量',value);
        console.log('视频是否在暂停中：',this.audio.paused);
        let ch_value = value/100;
        this.audio.volume = ch_value;
        if(value === 0){
            this.setState({
                muted: true,
                volume: ch_value,
                value: ch_value
            });
        }else{
            this.setState({
                muted: false,
                volume: ch_value,
                value: ch_value
            });
        }
        //console.log(this.audio.volume);
      }
      soundFormat = (value)=>{
        return `${value}%`;;
      }
      clickMuted = ()=>{
         // console.log('点击静音或者取消静音');
          let muted = !this.state.muted;
          let value = this.state.volume;
          if(muted){
            this.audio.volume = 0;
            value = 0;
          }else{
            this.audio.volume = this.state.volume;
          }
          this.setState({
              muted: muted,
              value
          });
      }
      clickLoop = ()=>{
          console.log('点击循环播放按钮');
          let loop = !this.state.loop;
          this.audio.loop = loop;
          console.log('是循环播放。',this.audio.loop);
          this.setState({
              loop,
          });
      }

    render() {
        return (
            <div>
                <Row>
                    <Col span={8} offset={8}>
                        <div>
                        {/* controls='controls'  */}
                            <audio src="./逃跑计划 - 夜空中最亮的星.mp3" id='music' preload='auto' ref={(audio)=>{this.audio = audio}}>
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={8} offset={8}>
                        <Card
                            title="正在播放：我的一个道姑朋友-LON"
                            extra={<a href="#" style={{color:'#fff'}}>评分：8.5</a>}
                            headStyle={{backgroundColor: '#1DA57A',color: "#fff"}}
                        >
                            <p style={{height:60,textAlign:"center",color:'#1DA57A'}}>{this.state. lyricsContent}</p>
                        </Card>
                        <Card>
                            <div style={{ float: "right" }}>
                                <span>{this.s_to_hs(this.state.currentTime.toFixed(0))}</span> / 
                                <span>{this.s_to_hs(this.state.totalSecond)}</span>
                            </div>
                            <div className="icon-wrapper">
                                <div className={`customer-icon ${this.state.muted?'slash':''}`} onClick={this.clickMuted}>
                                    <FontAwesomeIcon icon={faVolumeUp} className='icon-item'/>
                                </div>
                                <Slider {...this.props} tipFormatter={this.soundFormat} style={{ width: 80 }}
                                 onChange={this.soundChange} 
                                 className='customer-slider'
                                 value={this.state.value*100}
                                 />
                            </div>
                            <Slider
                                tipFormatter={this.formatter}
                                onChange={this.changeCurrent}
                                value={this.state.currentTime}
                                min={parseInt(0)}
                                max={parseInt(this.state.totalSecond)}
                            />

                            <div className='operatorBtn'>
                                <Button type="primary" shape="circle" icon="backward" style={{marginRight: 5}} onClick={this.decline}/>
                                {
                                    this.state.playIcon ? <Button type="primary" shape="circle" icon="pause-circle" style={{marginRight: 5}} onClick={this.stopAudio} /> :
                                    <Button type="primary" shape="circle" icon="play-circle" style={{marginRight: 5}} onClick={this.playAudio}/>
                                }
                                <Button type="primary" shape="circle" icon="forward" style={{marginRight: 5}} onClick={this.increase}/>
                                {/* <FontAwesomeIcon icon='check-square' /> */}
                                {/* <i class="fa fa-random" aria-hidden="true" className='iclazz'></i> */}
                                <Button type={`${this.state.loop?'primary':'default'}`} shape="circle" onClick={this.clickLoop}>
                                    <i className="fa fa-refresh" aria-hidden="true"></i>
                                </Button>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}
