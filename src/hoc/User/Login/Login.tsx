import React, { FormEvent, useState } from 'react'
import WhiteBox from '../../whiteBox/whiteBox'
import { MDBInput, MDBBtn } from 'mdbreact'

const Login = () => {

    const loginHandler = () => {}
    const [loginDetails, setLoginDetails] = useState({email: '', password: ''})
    
    const inputHandler = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name ,value} = e.currentTarget;
        setLoginDetails({...loginDetails, [name]: value})
    }

    return (
        <WhiteBox>
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
                                label="Full Name"
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
        </WhiteBox>
    )
}

export default Login
