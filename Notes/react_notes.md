ui:

login/ register
- similar to discord, only email and pass
- the user will have a code and can change the display name, if I can implement it
- these will be different pages


actual chat

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

- might have a panel with sec stats, maybe it's a good idea

# TIMETABLE



## General React + Redux maybe

### Error hadling and fun stuff

**OBS** if errors occur when trying to run the app (happens in VSCode - powershell terminal), run ```Set-ExecutionPolicy -Scope Process Unrestricted```, more [here](https://stackoverflow.com/questions/16460163/ps1-cannot-be-loaded-because-the-execution-of-scripts-is-disabled-on-this-syste), or ```Set-ExecutionPolicy Bypass -Scope CurrentUser -Force```, more [here](https://winbuzzer.com/2020/07/10/how-to-enable-powershell-scripts-in-windows-10-via-powershell-execution-policy-xcxwbt/)

**OBS** if errors about "TypeError: Object(…)(…) is undefined" not found, use curly braces on that function or object when importing


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
- to use material, ```npm i -s @material-ui/core``` or to reduce package imports, use ```npm i -s @material-ui/styles```, since styles reextends /core/styles

- makeStyles - when using the styles component method (styles in separate variables, then added inline)
	- links a dtylesheet with a function component using the hook pattern (so it returns a hook)



## Firebase

confing:

```
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.0.2/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->

<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDSM9zkBA8JnGoItYcrsCCNyLk_nnqYFz0",
    authDomain: "zephon-45471.firebaseapp.com",
    databaseURL: "https://zephon-45471.firebaseio.com",
    projectId: "zephon-45471",
    storageBucket: "zephon-45471.appspot.com",
    messagingSenderId: "585420359850",
    appId: "1:585420359850:web:9e55eceecf9fe06cfe68d3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
</script>


```