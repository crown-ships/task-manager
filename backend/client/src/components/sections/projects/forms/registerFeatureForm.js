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
    featureName: '',
    featureDetails: '',
    startDate: '',
    dueDate: '',
    assignee: '',
    projectName: ''
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

    var i;
    var projectDetails = {};
    for(i=0; i< props.allProjects.length; i++) {
      if(props.allProjects[i].projectName === props.project)
        projectDetails = props.allProjects[i];

    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    var complist = props.allProjects.map(function(item) {
      if(item.enabled === "true" && item.approved === "approved")
        return item.projectName;
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
            var projectDetails = {};
            for(i=0; i< props.allProjects.length; i++) {
              if(props.allProjects[i].projectName === values.projectName)
                projectDetails = props.allProjects[i];

            }

            const input = {
              projectName: projectDetails.projectName,
              projectID: projectDetails._id,
              creatorName: props.auth.user.name,
              creatorID: props.auth.user.id,
              companyName: projectDetails.companyName,
              companyID: projectDetails.companyID,
              ownerName: projectDetails.ownerName,
              assignee: values.assignee,
              featureName: values.featureName,
              featureDetails: values.featureDetails,
              dueDate: values.dueDate,
              startDate: values.startDate
            };
            props.create(input, resetForm);
        }
    }

    useEffect(() => {
        if (props.project != null)
            setValues({projectName: props.project})
    }, [props.project])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={8}>
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="outlined-projectName-native-simple">Project Name *</InputLabel>
                      <Select
                        native
                        value={values.projectName}
                        onChange={handleInputChange}
                        label="Project Name"
                        inputProps={{
                          name: 'projectName',
                          id: 'outlined-projectName-native-simple'
                        }}
                      >{selList.map(item =><option key={item.key} value={item.item}>{item.item}</option>)}
                      </Select>
                    </FormControl>
                    <Input
                        name="featureName"
                        label="Milestone Name *"
                        value={values.featureName}
                        onChange={handleInputChange}
                        error={errors.featureName}
                    />
                    <Input
                        name="featureDetails"
                        label="Milestone Details *"
                        value={values.featureDetails}
                        onChange={handleInputChange}
                        multiline  = {true}
                        rows = {5}
                        error={errors.featureDetails}
                    />
                </Grid>
                <Grid item xs={4}>
                <FormControl variant="outlined">
                  <InputLabel htmlFor="outlined-assignee-native-simple">Assignee *</InputLabel>
                  <Select
                    native
                    value={values.assignee}
                    onChange={handleInputChange}
                    label="Assignee"
                    inputProps={{
                      name: 'assignee',
                      id: 'outlined-assignee-native-simple'
                    }}
                  >{props.allUsers.map(item =><option key={item.key} value={item.item}>{item.item}</option>)}
                  </Select>
                </FormControl>
                    <Input
                      id="startDate"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="startDate"
                      label="Start Date *"
                      value={values.startDate}
                      onChange={handleInputChange}
                      error={errors.startDate}
                    />
                    <Input
                      id="dueDate"
                      type="date"
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
