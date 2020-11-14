ui:
left:
- chats side
	- header (will have the settings and all the fun - maybe a list of security things, let's see how many I will implement)
	- search
	- list of chats

right:
- actual chat with chosen person/ group
	- header
	- screen with messages
	- input text


## General React + Redux maybe

### Context
- [docs](https://reactjs.org/docs/context.html)
- pass (global) data through the component tree without props at every lvl
- ex: locale preference, user data, UI theme
- syntax ```const ThemeContext = React.createContext("light");```
- wrap the components you want to inherit the context with the following and you can pass values for the context
```
<ThemedContext.Provider value="dark">...</ThemedContext.provider>
```
- when React renders a component that subscribe to this context object it will read the current context value from the closest matching provider above it in the tree and the default value is only used when a component doesn't have a matching Provider above it in the tree

**Context.Provider** 
- allows consuming components to subscribe to context changes
- all descendant consumers will re-render when the value changes

**Context.Consumer**
```
<MyContext.Consumer>
	{value => /* render something based on the context value */}
</MyContext.Consumer>
```
- component that subscribes to context changes adn requires a function as a child which returns a React node


**Context.displayName**
- context object accepts a displayName string property to be easier to debug 

**Caveat/ Warning**
- might re-render unneccessarily




## Material UI
- [Docs](https://material-ui.com/styles/basics/)

- styling lib (React components that implement Google's material design)
- similar to bootstrap, somehow
- to use material, ```npm i @material-ui/core``` or to reduce package imports, use ```npm i @material-ui/styles```, since styles reextends /core/styles

- makeStyles - when using the styles component method (styles in separate variables, then added inline)
	- links a dtylesheet with a function component using the hook pattern (so it returns a hook)

