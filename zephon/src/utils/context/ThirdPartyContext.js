import React from 'react';

export const ThirdPartyContext = React.createContext();

// Toggle third party view
// when this feature is active, the user will see the messages
// through a "third party's view"
const ThirdPartyProvider = ({children}) => {

    const [thirdPartyView, setThirdPartyView] = React.useState(false);


    const toggleThirdPartyView = () =>{
        setThirdPartyView(!thirdPartyView);
    };

    return (
        <ThirdPartyContext.Provider value={{thirdPartyView, toggleThirdPartyView}}>
            {children}
        </ThirdPartyContext.Provider>
    );
};

export default ThirdPartyProvider;
