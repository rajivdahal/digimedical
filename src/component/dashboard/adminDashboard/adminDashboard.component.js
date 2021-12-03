import './adminDashboard.component.css'
import { useState } from 'react'
import { Link } from "react-router-dom"
import { TimeandDate } from '../../../services/timeanddate'
import Nav from './components/nav.component'
import SideBar from './components/sidebar.component'
import HomePage from '../../admin/homePage/home.page'

const AdminDashboard = (props) => {

  return (
    <>
      <Nav />
      <div className="container-fluid page-body-wrapper">
        <SideBar />
        <div className="main-panel">
          <HomePage />
        </div>
      </div>
    </>
  )
}
export default AdminDashboard