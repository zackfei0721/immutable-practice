import React from 'react';
import './App.css';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "id": "001",
    "type": "A",
    "value": "aaaaa",
    "data:": {},
    "path": ["001"],
    "children": [
        {   /*state.children[0]*/
            "id": "003",
            "type": "A",
            "value": "aaaaa",
            "data:": {},
            "path": ["001", "003"],
            "children": [
                {   /*state.children[0].children[0]*/
                    "id": "002",
                    "type": "A",
                    "value": "aaaaa",
                    "data:": {},
                    "path": ["001", "003" /*change path[1] from 003 to 004*/, "002"],
                    "children": []
                },
            ]
        },
        {   /*state.children[1]*/
            "id": "004",
            "type": "A",
            "value": "aaaaa",
            "data:": {},
            "path": ["001", "004"],
            "children": [
                {
                    "id": "006",
                    "type": "A",
                    "value": "aaaaa",
                    "data:": {},
                    "path": ["001", "004", "005"],
                    "children": []
                },{
                    /*state.children[1].children[1]*/
                    "id": "005",
                    "type": "A",
                    "value": "aaaaa",
                    "data:": {},
                    "path": ["001", "004", "005"],
                    "children": [
                        {  /*state.children[1].children[1].children[0]*/
                            "id": "002",
                            "type": "A",
                            "value": "aaaaa",
                            "data:": {},
                            "path": ["001", "004", "005" /*change path[2] from 005 to 006*/, "002"],
                            "children": []
                        }
                    ]
                }
            ]
        }
    ]
}}


// Basically for all immutable objects, we need to create a new object and copy the properties of the original object.
// The purpose is to prevent the original object from being mutated, so that we could implement features like undo/redo, and also prevent potential bugs

updateState = () => {
  this.setState(prevState => ({
    ...prevState,
    children: prevState.children.map((child, i) => {
      if (i === 0) {
        return {
          ...child,
          children: child.children.map((subChild, j) => {
            if (j === 0) {
              return {
                ...subChild,
                path: subChild.path.map((pathItem, k) => {
                  if (k === 1) {
                    return "004";
                  }
                  return pathItem;
                })
              }
            }
            return subChild;
          })
        }
      }

      if (i === 1) {
        return {
          ...child,
          children: child.children.map((subChild, j) => {
            if (j === 1) {
              return {
                ...subChild,
                children: subChild.children.map((subSubChild, k) => {
                  if (k === 0) {
                    return {
                      ...subSubChild,
                      path: subSubChild.path.map((pathItem, l) => {
                        if (l === 2) {
                          return "006";
                        }
                        return pathItem;
                      })
                    }
                  }
                  return subSubChild;
                })
              }
            }
            return subChild;
          })
        }
      }
      return child;
    })
  }));
}

renderObject = (obj, depth = 0) => {
  const content = 
  <div>
    <p>Object ID: {obj.id}</p>
    <p>Object Path: {obj.path.join(', ')}</p>
  </div>;

  const children = obj.children.map(child => this.renderObject(child, depth + 1));

  return (
  <div key={obj.id}>
    {content}
    {children}
  </div>
);
  }
  


  render() {
    const { children } = this.state;
    const renderedChildren = children.map(child => this.renderObject(child));
    return (
      <div>
        {renderedChildren}
        <button onClick={this.updateState}>Update State</button>
      </div>
    );
  }}

export default MyComponent;
