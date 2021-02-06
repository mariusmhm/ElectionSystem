import React, { Component } from 'react';
import { Button, Collapse} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import { ElectionSystemAPI } from '../../../api';
import LoadingProgress from '../../dialogs/LoadingProgress';


class TableEntryButtonKeycompetence extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tableData: [],
            projects: [],
            projecttypes: [],
            users: [],
            type: null,
            projecttypeName: '',
            moduleName: '',
            error: null,
            updatingError: null,
            deletingError: null,
            loaded: false,
            id: null,
            name: null,
            dsc: null,
            prof: null,
            ects: null,
            sws: null,
            activeIndex: null,
            select: true,
            lastname: '',
            firstname: '',
            project:'',
            loadingInProgress: false


        };
        this.baseState = this.state;
        this.toggleClass = this.toggleClass.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    getUser = () => {
        ElectionSystemAPI.getAPI().getUser(this.props.prof)
            .then(userBO =>
                this.setState({
                    users: userBO,
                    lastname: userBO.getName(),
                    firstname: userBO.getFirstname(),
                    loadingInProgress: false,
                    error: null
                })).catch(e =>
                    this.setState({
                        users: [],
                        error: e,
                        loadingInProgress: false
                    }));
                 this.setState({
                loadingInProgress: true,
                error: null
        });

    }

    getProjectType = () => {
        ElectionSystemAPI.getAPI().getProjecttype(this.props.type)
        .then(projecttypeBO =>
            this.setState({
            projecttypeName: projecttypeBO.getName(),
            loadingInProgress: false,
            error: null
            })). catch(e =>
            this.setState({
                projecttypeName: [],
                loadingInProgress: false,
                error: e
            }));
            this.setState({
                loadingInProgress: true,
                loaded:true,
                error: null
        });
    }


     getModule = () => {
        ElectionSystemAPI.getAPI().getModule(this.props.module)
                .then(moduleBO =>
                        this.setState({
                            moduleName: moduleBO.getName(),
                            loadingInProgress: false,
                            error: null
                        })). catch(e =>
                            this.setState({
                                moduleName: [],
                                error: e,
                                loadingInProgress: false,
                        }));
                      this.setState({
                        loadingInProgress: true,
                        loaded:true,
                        error: null
        });
     }



    toggleClass(index, e) {
        this.setState({
          activeIndex: this.state.activeIndex === index ? null : index
        });
      }

    moreLess(index) {
        if (this.state.activeIndex === index) {
          return (
            <span>
              <i className="fas fa-angle-up" /> Hide Description
            </span>
          );
        } else {
          return (
            <span>
              <i className="fas fa-angle-down" /> Show Description
            </span>
          );
        }
      }

    handleSelect(){
        this.setState({select: !this.state.select})

    }

    handleChange(e) {
        this.setState({ priority: e.target.value });
      }

    componentDidMount() {
        this.getUser();
        this.getProjectType();
        this.getModule();
    }






    render() {


        const { classes } = this.props;
        const {activeIndex, buttonText, loadingInProgress, loaded} = this.state;

        return (

            <Grid container justify="flex-start"  xs={12} md={12} >
                 <Grid item container justify="flex-start"  xs={12}>
                    <Grid item xs={3} md={3}>
                    {this.props.name}
                        <Collapse in={activeIndex === this.props.id}>
                    {this.props.dsc}
                        </Collapse>
                    </Grid>
                    <Grid item xs={3} md={3}>
                        {this.state.loaded ? this.state.lastname: null}, {this.state.loaded ? this.state.firstname: null}
                    </Grid>
                    <Grid item xs={3} md={3}>
                        {this.state.loaded ? this.state.projecttypeName: null}
                    </Grid>
                     <Grid item xs={3} md={3}>
                     <Button variant ="outlined">Participations</Button>
                     </Grid>
                     </Grid>
                     <LoadingProgress show={loadingInProgress} />
                     </Grid>



        )
    }
}
const styles = theme => ({
    grid: {
        width: '100%',
        margin: '0px',
        padding: theme.spacing(1)
    },
    button: {
        marginTop: theme.spacing(3)
    },
    redHeader: {
        color: theme.palette.red,
        fontFamily: 'Arial',
        fontStyle: 'bold',
        fontSize: 20
    },

    grayHeader: {
        color: theme.palette.gray,
        fontFamily: 'Arial',
        fontStyle: 'bold',
        fontSize: 35
    },


});
export default (TableEntryButtonKeycompetence);
