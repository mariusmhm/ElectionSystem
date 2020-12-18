import React, { Component } from 'react';
/**import ProjekteGenehmigen from './components/layout/pages/ProjectGenehmigen/ProjekteGenehmigen';**/
import ModulBearbeitung from './components/dialogs/ModulBearbeitung'
import NotenschlüsselBearbeitung from './components/dialogs/NotenschlüsselBearbeitung'
import HomeScreenAdminBeginn from './components/layout/pages/ProjectGenehmigen/HomeScreenAdminBeginn';
import SemeserPeriodDialog from'./components/dialogs/SemeserPeriodDialog';
import Teilnehmerliste from './components/layout/pages/Teilnehmerliste';


class App extends Component {


  render() {


        return (

            <div>
                <SemeserPeriodDialog />
		    </div>
		);
	}
}
export default App;
