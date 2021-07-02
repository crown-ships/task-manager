import React, { useState, useEffect } from 'react'
import { Grid} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from "../../../controls/Button";
import Input from "../../../controls/Input";
import { useForm, Form } from '../../useForm';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const initialFValues = {
    projectName: '',
    projectDetails: '',
    dueDate: '',
    ownerName: '',
    companyName:''
}

export default function RegisterForm(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    var complist = props.allCompanies.map(function(item) {
      if(item.enabled === "true")
        return item.companyName;
      else
        return "0"
    });

    var j;
    var len = 0;
    var trimlist = [];
    for(j=0; j<complist.length; j++) {
      if(complist[j] !== "0"){
        trimlist[len++] = complist[j];
      }
    }
    var selList = [];
    var i;
    selList[0] = {key:0, item: ""};
    for(i=0; i<len; i++) {
      selList[i+1] = {key:i+1, item: trimlist[i]};
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            var i;
            var companyDetails = {};
            for(i=0; i< props.allCompanies.length; i++) {
              if(props.allCompanies[i].companyName === values.companyName)
                companyDetails = props.allCompanies[i];
            }
            const approved = (props.auth.user.role === "admin")?"approved":"wait";
            const input = {
              companyName: companyDetails.companyName,
              companyID: companyDetails._id,
              creatorName: props.auth.user.name,
              creatorID: props.auth.user.id,
              projectName: values.projectName,
              projectDetails: values.projectDetails,
              ownerName: values.ownerName,
              dueDate: values.dueDate,
              approved: approved
            };
            props.create(input, resetForm);
        }
    }

    useEffect(() => {
        if (props.company != null)
            setValues({companyName: props.company})
    }, [props.company])
    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={8}>
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="outlined-companyName-native-simple">Company Name</InputLabel>
                      <Select
                        native
                        value={values.companyName}
                        onChange={handleInputChange}
                        label="Company Name"
                        inputProps={{
                          name: 'companyName',
                          id: 'outlined-companyName-native-simple'
                        }}
                      >{selList.map(item =><option key={item.key} value={item.item}>{item.item}</option>)}
                      </Select>
                    </FormControl>
                    <Input
                        name="projectName"
                        label="Project Name"
                        value={values.projectName}
                        onChange={handleInputChange}
                        error={errors.projectName}
                    />
                    <Input
                        name="projectDetails"
                        label="Project Details"
                        value={values.projectDetails}
                        multiline  = {true}
                        rows = {5}
                        onChange={handleInputChange}
                        error={errors.projectDetails}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Input
                        name="ownerName"
                        label="Owner Name"
                        value={values.ownerName}
                        onChange={handleInputChange}
                        error={errors.ownerName}
                    />
                    <Input
                      id="date"
                      type="date"
                      defaultValue="2017-05-24"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="dueDate"
                      label="Due Date"
                      value={values.dueDate}
                      onChange={handleInputChange}
                      error={errors.dueDate}
                    />
                    <div>
                        <Button
                            type="submit"
                            text="Submit" />
                        <Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}
