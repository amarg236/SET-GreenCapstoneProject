import React from "react";
import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month} from '@syncfusion/ej2-react-schedule';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

class Cal extends React.Component { 

    // Schedule remote data
    remoteData = new DataManager({
      url:'https://js.syncfusion.com/demos/ejservices/api/Schedule/LoadData',
      adaptor: new WebApiAdaptor,
      crossDomain: true
    });

     render() {
        return <ScheduleComponent  currentView='Month' 
        eventSettings={{ dataSource: this.remoteData }} style={{maxHeight:'100%', maxWidth:'100%'}}>
        <Inject services={[Day, Week, WorkWeek, Month]} />
      </ScheduleComponent>      
      }
}

export default Cal;