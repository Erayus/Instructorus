import React, { useState } from 'react';
import Modal from '../../../components/UI/Modal/Modal';


const InstructorsReports: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);

    const modalClosedHandler = () => {
        setIsOpen(false);
    }
    return (
        <React.Fragment>
            <h1>Hello</h1>

    
        </React.Fragment>
    )
}

export default InstructorsReports;