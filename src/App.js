import 'babel-polyfill';
import React, { Component } from 'react';

import MyGrid from './components/mygrid';
import MySpeadSheet from './components/datasheet';
import Animation from './components/animation';
import MyComponent from './components/context';
import QuickStart from './components/noform/quikstart';
import AntdNoForm from './components/noform/antd-noform';
import AuditForm from './components/auditForm';
import MyTable from './components/tables';
import MultiCplumn from './components/tables/multiColumn';
import MyPdfViewer from './components/pdfshow';
import EditableTable from './components/tables/edittable';
import RenderTable from './components/tables/rendertable';
import MyAudio from './components/audio/myaudio';



import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee, faRandom } from '@fortawesome/free-solid-svg-icons'
import AjaxRequest from './components/audio/ajaxrequest';

library.add(fab, faCheckSquare, faCoffee, faRandom);



class App extends Component {
  operator = ({hello,world,name,age})=>{
    console.log('this is function output.');
    //console.log({...data});
    console.log(hello,world,name,age);
    console.log('function output over.');
  }

  render() {
    const data = {
      name: 'alice',
      age: 22,
      sex: 'fman'
    }
    const hello = 'hello';
    const world = 'world';
    const {name} = data;
    console.log(name);
    this.operator({hello,world,...data});
    //const copyData = {...data};
    //const conpyAll = { ...data, hello, world };
    //console.log(name,age);
    //console.log(conpyAll);
    //console.log(copyData);
    return (

      <div>
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header> */}
        {/* <hr/>
        <MyGrid />
        <hr/>
        <MySpeadSheet />
        <Animation /> 
        <hr/>
        <MyComponent /> */}
        {/* <QuickStart /> */}
        {/* <AntdNoForm /> */}
        {/* <AuditForm />  */}
        {/* <MyTable />
        <hr/>
        <MultiCplumn /> 
        <hr/> */}
        {/* <MyPdfViewer /> */}
        <hr />
        {/* <EditableTable /> */}
        <hr />
        {/* <h2>{copyData.name}</h2> */}
        {/* <RenderTable /> */}
        <hr/>
        <MyAudio />
        <hr/>
        <AjaxRequest />
      </div>
    );
  }
}

export default App;
