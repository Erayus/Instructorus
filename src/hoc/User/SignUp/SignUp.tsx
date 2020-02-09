import React, { useContext, useEffect, useState, FormEvent } from 'react'
import WhiteBox from '../../whiteBox/whiteBox'
import { RootStoreContext } from '../../../stores/rootStore';
import { MDBInput, MDBBtn } from 'mdbreact';
import { RouteComponentProps } from 'react-router';



const SignUp: React.FC<RouteComponentProps> = ({location}) => {
    const rootStore = useContext(RootStoreContext);
    const {currentUser, completeSignUp} = rootStore.userStore;
    const [formModel, setFormModel] = useState({fullName: '', password: ''});

    const inputHandler = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name ,value} = e.currentTarget;
        setFormModel({...formModel, [name]: value});
    }

    useEffect(() =>{
        if (location.pathname.split('/').some(p => p === "admin")){
            completeSignUp("admin");
        } else {
            completeSignUp("instructor")
        }
        console.log()
    }, []);

    const updateUserProfile = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    } 

    return (
        <div>
            <WhiteBox>
                    <div>
                        <h1>Complete SignUp</h1>
                    </div>
                    <form onSubmit={updateUserProfile}> 
                        <div className="grey-text text-left">        
                            <MDBInput
                                label="Full Name"
                                icon="user"
                                type="text"
                                validate
                                error="wrong"
                                success="right"
                                name="fullName"
                                value={formModel.fullName}
                                onInput={inputHandler}
                            />
                            <MDBInput
                                label="Full Name"
                                icon="lock"
                                type="password"
                                validate
                                error="wrong"
                                success="right"
                                name="password"
                                value={formModel.fullName}
                                onInput={inputHandler}
                            />
                            <div className="text-center pb-2 mt-2">
                            <MDBBtn color="orange" type="submit">
                                Complete
                            </MDBBtn>
                            </div>
                        </div>
                </form>
            </WhiteBox>
        </div>
    )
}

export default SignUp
