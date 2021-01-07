



class TableEntry extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tableData: [],
            projects: [],
            projecttypes: [],
            error: null,
            priority: '',
            updatingError: null,
            deletingError: null,
            loaded: null,
            



            


        };
        this.baseState = this.state;
        
        
    }

        /** Gives back the project */
        getAllProjects = () => {
            ElectionSystemAPI.getAPI().getAllProjects()
                .then(projectBO =>
                    this.setState({
                        projects: projectBO,
                        loaded: true,
                        error: null
                    })).catch(e =>
                        this.setState({
                            projects: [],
                            error: e
                        }))
            console.log('Project ausgeführt');
        }
    
        /** Gives back the projecttype */
        getAllProjecttypes = () => {
            ElectionSystemAPI.getAPI().getAllProjecttypes()
                .then(ProjecttypeBO =>
                    this.setState({
                        projecttypes: ProjecttypeBO,
                        loaded: true,
                        error: null
                    })).catch(e =>
                        this.setState({
                            projecttypes: [],
                            error: e
                        }))
            console.log('Projecttype ausgeführt');
        }
    
        componentDidMount() {
            this.getAllProjects();
            this.getAllProjecttypes();
        }
        

        render (){
            
        }



}