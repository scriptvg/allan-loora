import React from 'react';
import { Outlet } from 'react-router-dom';
import ClienteHeader from '../cliente/ClienteHeader';
import ClienteSidebar from '../cliente/ClienteSidebar';
import { Container } from 'react-bootstrap';
import { useWindowSize } from '../../config/hooks/useWindowSize';
import '../../assets/styles/cliente/dashboard.css';

const ClienteLayout = () => {
    const [sidebarVisible, setSidebarVisible] = React.useState(true);
    const { esMovil } = useWindowSize();
    
    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };
    
    return (
        <div className={`cliente-dashboard-container ${sidebarVisible && !esMovil ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
            <ClienteSidebar visible={sidebarVisible} />
            
            <div className="cliente-main-content">
                <ClienteHeader 
                    toggleSidebar={toggleSidebar} 
                    sidebarVisible={sidebarVisible}
                />
                
                <Container fluid className="py-4 px-4 dashboard-content">
                    <Outlet />
                </Container>
            </div>
        </div>
    );
};

export default ClienteLayout;
