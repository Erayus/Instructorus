import React, { useContext, useEffect, useState, FormEvent } from 'react'
import WhiteBox from '../../whiteBox/whiteBox'
import { RootStoreContext } from '../../../stores/rootStore';
import { MDBInput, MDBBtn } from 'mdbreact';
import { RouteComponentProps } from 'react-router';
import queryString from 'query-string';



const SignUp: React.FC<RouteComponentProps> = ({location}) => {
    const rootStore = useContext(RootStoreContext);
    const {currentUser, completeSignUp, updateUserProfile} = rootStore.userStore;
    const [updateDetails, settUpdateDetails] = useState({displayName: '', password: ''});

    const inputHandler = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name ,value} = e.currentTarget;
        settUpdateDetails({...updateDetails, [name]: value});
    }

    useEffect(() =>{
        const email = queryString.parse(location.search).email;
        if (location.pathname.split('/').some(p => p === "admin") && email !== undefined){
            completeSignUp(email, "admin");
        } else {
            completeSignUp(email, "instructor")
        }
        console.log()
    }, []);

    const updateUserProfileHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateUserProfile(updateDetails);
    } 

    return (
        <div>
            <WhiteBox>
                <div className="p-5">
                    <div className="text-center">
                        <h1>Complete SignUp</h1>
                    </div>
                    <form onSubmit={updateUserProfileHandler}> 
                        <div className="grey-text text-left">        
                            <MDBInput
                                label="Full Name"
                                icon="user"
                                type="text"
                                validate
                                error="wrong"
                                success="right"
                                name="displayName"
                                value={updateDetails.displayName}
                                onInput={inputHandler}
                            />
                            <MDBInput
                                label="Password"
                                icon="lock"
                                type="password"
                                validate
                                error="wrong"
                                success="right"
                                name="password"
                                value={updateDetails.password}
                                onInput={inputHandler}
                            />
                            <div className="text-center pb-2 mt-2">
                            <MDBBtn color="orange" type="submit">
                                Complete
                            </MDBBtn>
                            </div>
                        </div>
                </form>
                </div>
            </WhiteBox>
        </div>
    )
}

export default SignUp
