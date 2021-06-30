import React, { useState, useEffect } from 'react'
import { Grid} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from "../../../controls/Button";
import Input from "../../../controls/Input";
import { useForm, Form } from '../../useForm';


const initialFValues = {
    featureName: '',
    featureDetails: '',
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

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const input = {
              projectName: projectDetails.projectName,
              projectID: projectDetails._id,
              creatorName: props.auth.user.name,
              creatorID: props.auth.user.id,
              companyName: projectDetails.companyName,
              companyID: projectDetails.companyID,
              ownerName: values.ownerName,
              featureName: values.featureName,
              featureDetails: values.featureDetails,
              dueDate: values.dueDate
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
                        name="featureName"
                        label="Milestone Name"
                        value={values.featureName}
                        onChange={handleInputChange}
                        error={errors.featureName}
                    />
                    <Input
                        name="featureDetails"
                        label="Milestone Details"
                        value={values.featureDetails}
                        onChange={handleInputChange}
                        error={errors.featureDetails}
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
