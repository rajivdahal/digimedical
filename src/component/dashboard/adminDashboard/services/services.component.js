import MaterialTable from 'material-table'
import React from 'react'
import Tableicons from '../../../../utils/materialicons'
import UserServices from '../../userdashboard/services/services.component'

export default function ViewServicesBookedOfUser() {
  return (
    <div>
        <UserServices origin="admin"></UserServices>
    </div>
  )
}
