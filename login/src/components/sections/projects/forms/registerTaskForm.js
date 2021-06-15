import React, { useState, useEffect } from 'react'
import { Grid} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from "../../../controls/Button";
import Input from "../../../controls/Input";
import { useForm, Form } from '../../useForm';


const initialFValues = {
    taskName: '',
    taskDetails: '',
    dueDate: '',
    ownerName: ''
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

    var i;
    var featureDetails = {};
    for(i=0; i< props.allFeatures.length; i++) {
      if(props.allFeatures[i].featureName === props.feature)
        featureDetails = props.allFeatures[i];
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const approved = (props.auth.user.role === "admin")?"approved":"wait";
            const input = {
              taskName: values.taskName,
              taskDetails: values.taskDetails,
              dueDate: values.dueDate,
              ownerName: values.ownerName,
              creatorName: props.auth.user.name,
              creatorID: props.auth.user.id,
              companyName: featureDetails.companyName,
              companyID: featureDetails.companyID,
              projectName:featureDetails.projectName,
              projectID:featureDetails.projectID,
              featureName:featureDetails.featureName,
              featureID:featureDetails._id,
              percentComplete: values.percentComplete
            };
            props.create(input, resetForm);
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={8}>
                    <Input
                        name="taskName"
                        label="Task Name"
                        value={values.taskName}
                        onChange={handleInputChange}
                        error={errors.taskName}
                    />
                    <Input
                        name="taskDetails"
                        label="Task Details"
                        value={values.taskDetails}
                        onChange={handleInputChange}
                        error={errors.taskDetails}
                    />
                    <Input
                        name="ownerName"
                        label="Owner Name"
                        value={values.ownerName}
                        onChange={handleInputChange}
                        error={errors.ownerName}
                    />
                </Grid>
                <Grid item xs={4}>
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
