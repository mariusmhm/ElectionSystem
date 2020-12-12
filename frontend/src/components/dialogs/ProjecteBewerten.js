/**import React, { Component } from 'react';



class ProjectBewerten extends Component {
constructor(props){
    super(props)

    this.state= {
    rows:[
    {
    id:1,
    project_name:"User Experience",
    project_type:"inter",
    professor:"Kunz"},

     {
    id:2,
    project_name:"Programmieren",
    project_type:"xyz",
    professor:"Thies"},

     {
    id:3,
    project_name:"ADS",
    project_type:"mno",
    professor:"Thies"},

    ]
    }
}

export default function ResponsiveDialog() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))



  render() {

        return (
            <div>
            <Grid item xs={12}>
            <Paper>Bitte nehmen Sie das Projekt an oder lehnen es ab.</Paper>
                <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="Projekte bewerten">
                        <DialogTitle id="responsive-dialog-title">{"Projekt Informationen"}</DialogTitle>
                            <DialogContent>
                            <Grid item xs={6}>
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                    <TableCell></TableCell>
                                                    <TableCell align="right"></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {this.state.rows.map(row=> (
                                        <TableRow key={row.id}>
                                            <TableCell> {row.project_name}</TableCell>
                                            <TableCell> {row.project_type}</TableCell>
                                            <TableCell> {row.professor}</TableCell>
                                            <TableCell> <Button color="gray" variant="outlined"> Bewerten</Button> </TableCell>
                                        </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}





                            </Grid>
            </Grid>
		    </div>
		);
	}
}
/

}
export default ProjectBewerten;
**//
