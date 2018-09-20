import React from 'react'
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/grid'
import 'echarts/lib/chart/bar'
import axios from 'axios';

export default class MyGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imgUrl: ''
        }
    }
    componentWillMount() {

    }
    componentDidMount() {
        const option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20],
                animation: false                // 1. 取消动画加载，否则在调用getDataUrl时图表可能显示不完整
            }]
        };
        const mychart = echarts.init(document.getElementById("main"));

        mychart.setOption(option);
        // 2. 在通过getDataUrl获取图标url时，设置一个延时，否则图表可能显示不完整。
        // setTimeout(()=>{
        //     this.setState({
        //         imgUrl: mychart.getConnectedDataURL({
        //             pixelRatio: 1,
        //             backgroundColor: '#ccc'
        //         }),
        //     });
        // },1000);
        this.setState({
            imgUrl: mychart.getConnectedDataURL({
                pixelRatio: 1,
                backgroundColor: '#ccc'
            }),
        });
       
        //mychart.setOption(option);
    }

    handlerClick = ()=>{
        const imgUrl = this.state.imgUrl;
        console.log("点击导出图表");
        // 在此处将图表的url地址发送到后端，有后端导出图表
        // axios.get('http://10.10.10.231:8080/spring-mvc-shiro-a/mvc/exports?imgUrl='+imgUrl)
        //     .then(function (response) {
        //         console.log(response);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
        // , 
        //     {
        //         headers: {
        //             'Content-Type': 'application/x-www-form-urlencoded'
        //         }
        //     }
        axios.post('http://10.10.10.231:8080/spring-mvc-shiro-a/mvc/exports', {
            imgUrl: imgUrl,
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render(){
        const url = this.state.imgUrl; 
        console.log(url);
        return (
            <div>
                <div id="main" style={{ width: 600, height: 400 }}></div>
                <hr/>
                <img src={url} alt="没有图片"/>
                <button onClick={this.handlerClick}>导出图表</button>
            </div>

        );
    }
}