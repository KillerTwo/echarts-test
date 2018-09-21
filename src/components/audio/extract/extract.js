export default class Extract {
    // 从歌词文本中提取歌词的函数
    static parseLyric(text) {
        let lines = text.split('\n');
        let pattern = /\[\d{2}:\d{2}.\d{2}\]/g;
        // console.log('是否符合',pattern.test('[10:10.12]'));
        while(!pattern.test(lines[0])){
            lines = lines.slice(1);
        }
        let results = [];
        let pattern_time = /\d{2}:\d{2}/g;
        lines.forEach(function(item, index, arr){
           
            // mm:ss格式
            let timeStr = item.match(pattern_time);
            let total = Extract.minute_sec2int(timeStr[0]);
            let arrs = [];
            let time = item.match(pattern);
            arrs.push(total);
          
            let lyc = item.replace(pattern,'');
            arrs.push(lyc);
       
            results.push(arrs);

        });
        //console.log('最终的数组：',results);
        return results;
    };

    /**
    ** mm:ss格式的时间字符串转换为总秒数的函数
    **
    **/
    static minute_sec2int(time) {
        let arr = time.split(':');

        let minute = parseInt(arr[0]) * 60;
        let second = parseInt(arr[1]);
        let total = minute + second;

        return total;
    }



}