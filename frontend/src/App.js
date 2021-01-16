import React, { Component } from 'react';
/**import ProjekteGenehmigen from './components/layout/pages/ProjectGenehmigen/ProjekteGenehmigen';**/
import Teilnehmerliste from './components/layout/pages/Teilnehmerliste'
import ArchiveProject from'./components/layout/pages/ProjectGenehmigen/ArchiveProject'
import ListEntryDiesesSemester from'./components/layout/pages/ProjectGenehmigen/ListEntryDiesesSemester'
import HomeScreenAdminBeginn from'./components/layout/pages/ProjectGenehmigen/HomeScreenAdminBeginn'
import DeleteStudent from'./components/dialogs/DeleteStudent'
import ModulBearbeitung from'./components/dialogs/ModulBearbeitung'
import NotenschlüsselBearbeitung from'./components/dialogs/NotenschlüsselBearbeitung'
import AddStudents from'./components/dialogs/AddStudents'

class App extends Component {


  render() {


        return (

            <div>
                <DeleteStudent/>
		    </div>
		);
	}
}
export default App;
