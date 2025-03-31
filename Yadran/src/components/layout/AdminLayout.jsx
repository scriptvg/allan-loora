import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../admin/AdminSidebar';
import AdminHeader from '../admin/AdminHeader';
import { Container } from 'react-bootstrap';
import { useWindowSize } from '../../config/hooks/useWindowSize';
import '../../assets/styles/admin/dashboard.css';

const AdminLayout = () => {
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const { esMovil, esTablet } = useWindowSize();

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const esSidebarExpandido = sidebarVisible && !esMovil;

    return (
        <div className={`admin-dashboard-container ${esSidebarExpandido ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
            <AdminSidebar visible={sidebarVisible} />

            <div className="admin-main-content">
                <AdminHeader
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

export default AdminLayout;
