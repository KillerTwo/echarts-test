import React from 'react';

import { Table,Divider } from 'antd';

// In the fifth row, other columns are merged into first column
// by setting it's colSpan to be 0
const renderContent = (value, row, index) => {
  const obj = {
    children: value,
    props: {},
  };
  if (index === 4) {
    obj.props.colSpan = 0;
  }
  return obj;
};

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  children: [{
    title: 'first name',
    dataIndex: 'firstname',
    key: 'firstname',
    width: 200,
    render: (text, row, index) => {
        if (index < 4) {
            // console.log(row);
          return <a href="javascript:;">{text}</a>;
        }
        return {
          children: <a href="javascript:;">{text}</a>,
          props: {
            colSpan: 1,
          },
        };
      },
  },
  {
      title: 'last name',
      dataIndex: 'lastname',
      key: 'lastname',
      width: '100',
      render: (text, row, index) => {
        if (index < 4) {
            console.log(row);
          return <a href="javascript:;">{text}</a>;
        }
        return {
          children: <a href="javascript:;">{text}</a>,
          props: {
            colSpan: 5,
          },
        };
      },
  }
],
  
}, {
  title: 'Age',
  dataIndex: 'age',
  render: renderContent,
}, {
  title: 'Home phone',
  dataIndex: 'Homephone',
  children: [
      {
          title: 'tel',
          dataIndex:'tel',
          render: (value, row, index) => {
            const obj = {
              children: value,
              props: {},
            };
            if (index === 2) {
              obj.props.rowSpan = 2;
            }
            // These two are merged into above cell
            if (index === 3) {
              obj.props.rowSpan = 0;
            }
            if (index === 4) {
              obj.props.colSpan = 0;
            }
            console.log('Home phone',value);
            console.log(row);
            return obj;
          },
      },
      {
          title: 'Phone',
          dataIndex: 'phone',
          render: renderContent
      }
  ],
  
}, 
 {
  title: 'Address',
  dataIndex: 'address',
  render: renderContent,
},
{
    title: 'operator',
    dataIndex: 'operator',
    render: (text,record)=>
    (
        <span>
          <a href="javascript:;">Invite {record.lastname}</a>
          <Divider type="vertical" />
          <a href="javascript:;">Delete</a>
        </span>
    )
    ,
}
];

const data = [{
  key: '1',
  lastname: 'John',
  firstname: 'Brown',
  age: 32,
  tel: '0571-22098909',
  phone: 18889898989,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  lastname: 'Jim',
  firstname: 'Green',
  tel: '0571-22098333',
  phone: 18889898888,
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  lastname: 'Joe',
  firstname: 'Black',
  age: 32,
  tel: '0575-22098909',
  phone: 18900010002,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '4',
  lastname: 'Jim',
  firstname: 'Red',
  age: 18,
  tel: '0575-22098909',
  phone: 18900010002,
  address: 'London No. 2 Lake Park',
}, {
  key: '5',
  lastname: 'Jake',
  firstname: 'White',
  age: 18,
  tel: '0575-22098909',
  phone: 18900010002,
  address: 'Dublin No. 2 Lake Park',
}];
export default class RenderTable extends React.Component {
    render() {
        return (
            <Table columns={columns} dataSource={data} bordered />
        );
    }
}
