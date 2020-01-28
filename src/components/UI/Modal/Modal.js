import React, {Component} from 'react'
import { MDBCard, MDBCardHeader, MDBCardBody, MDBModalFooter} from 'mdbreact';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';



class Modal extends Component{
    //Only update when this 'show' property is different than the last show property (only update when the modal is open or close)
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.show !== nextProps.show && this.props !== nextProps ;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log('did update!')
    }
    render() {
        return (
            <React.Fragment>
                <MDBCard className={[classes.Modal, "z-depth-2 rounded"].join(" ")}
                     style={{
                         transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                         opacity: this.props.show ? '1' : '0'
                     }}>
                    <MDBCardBody>
                        <MDBCardHeader 
                            className="form-header blue-gradient rounded mb-5"
                            style={{marginTop: "-50px"}}
                        >
                            <h3 className="my-3 text-center text-white">
                                {this.props.title}
                            </h3>
                        </MDBCardHeader>
                    
                        {this.props.children}
                      

                        {/* <MDBModalFooter>
                            
                        </MDBModalFooter> */}
                    </MDBCardBody>
                </MDBCard>

    
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
            </React.Fragment>
        )
    }

};

export default Modal;
