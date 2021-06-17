import React, { useState, useEffect } from 'react'
import { Grid} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from "../../../controls/Button";
import Input from "../../../controls/Input";
import { useForm, Form } from '../../useForm';


const initialFValues = {
    projectName: '',
    projectDetails: '',
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
    var companyDetails = {};
    for(i=0; i< props.allCompanies.length; i++) {
      if(props.allCompanies[i].companyName === props.company)
        companyDetails = props.allCompanies[i];
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
            console.log(props);
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
                        onChange={handleInputChange}
                        error={errors.projectDetails}
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
