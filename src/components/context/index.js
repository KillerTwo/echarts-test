import React from 'react'

// 创建一个context，默认值为'light'
const ThemeContext = React.createContext('light');





export default class MyComponent extends React.Component {
    
    render() {
        return (
            <ThemeContext.Provider value="dark">
                <Toolbar />
            </ThemeContext.Provider>
        );
    }
}
// A component in the middle doesn't have to
// pass the theme down explicitly anymore.
// 这事一个中间组件，通过使用context,MyComponent传递给ThemeButton的值并没有传递给该组件
function Toolbar(props) {
    return (
      <div>
        <ThemedButton />
      </div>
    );
  }

function ThemedButton(props) {
    // Use a Consumer to read the current theme context.
    // React will find the closest theme Provider above and use its value.
    // In this example, the current theme is "dark".
    return (
        <ThemeContext.Consumer>
        {theme => <h2 {...props}>{theme}</h2>}
        </ThemeContext.Consumer>
    );
}