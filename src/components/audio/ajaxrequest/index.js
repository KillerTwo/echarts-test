import React from 'react'

import axios from 'axios'
import jsonp from 'jsonp';

export default class AjaxRequest extends React.Component {

    componentDidMount() {
        // $.ajax({
        //     url: "http://s.music.163.com/search/get/",
        //     dataType: "jsonp",
        //     data: {
        //         'type': 1,
        //         's': info,
        //         'limit': 1
        //     },
        //     jsonp: "callback",
        //     cache: false,
        //     success: function(data) {
        //         console.log(data.data);
        //     }

        // });

        // jsonp("http://s.music.163.com/search/get/", 
        //     {
        //     'type': 1,
        //     's': info,
        //     'limit': 1
        //      },
        //      (err, data) => {
        //     if (err) {
        //       console.error(err.message);
        //     } else {
        //       if (data.list.length > 0) {
        //         console.log(data);
        //       }
        //       console.log(data);
        //     }
        // })


    }
    render() {
        return (
            <div>
                <h2>请求数据</h2>
            </div>
        );
    }
}