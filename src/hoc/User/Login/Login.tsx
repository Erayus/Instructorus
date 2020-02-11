import React, { FormEvent, useState, useContext } from 'react'
import WhiteBox from '../../whiteBox/whiteBox'
import { MDBInput, MDBBtn } from 'mdbreact'
import { RootStoreContext } from '../../../stores/rootStore'

const Login = () => {
    const [loginDetails, setLoginDetails] = useState({email: '', password: ''})
    const rootStore = useContext(RootStoreContext);
    const {login} = rootStore.userStore;

    const loginHandler = () => {
        
    }
    
    const inputHandler = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name ,value} = e.currentTarget;
        setLoginDetails({...loginDetails, [name]: value})
    }

    return (
        <WhiteBox>
            <div className="p-4">
                <div className="text-center"> 
                    <h1>Login</h1>
                </div>
                <form onSubmit={loginHandler}> 
                    <div className="grey-text text-left">        
                        <MDBInput
                            label="Email"
                            icon="envelope"
                            type="text"
                            validate
                            error="wrong"
                            success="right"
                            name="email"
                            value={loginDetails.email}
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
                            value={loginDetails.password}
                            onInput={inputHandler}
                        />
                        <div className="text-center pb-2 mt-2">
                        <MDBBtn color="orange" type="submit">
                            Login
                        </MDBBtn>
                        </div>
                    </div>
                </form> 
            </div>
        </WhiteBox>
    )
}

export default Login
