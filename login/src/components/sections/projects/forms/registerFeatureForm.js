import React, { useState, useEffect } from 'react'
import { Grid} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from "../../../controls/Button";
import Input from "../../../controls/Input";
import { useForm, Form } from '../../useForm';


const initialFValues = {
    projectName: '',
    projectDetails: '',
    dueDate: ''
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

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const approved = (props.auth.user.role === "admin")?"approved":"wait";
            const input = {
              companyName: props.company,
              creatorName: props.auth.user.name,
              projectName: values.projectName,
              projectDetails: values.projectDetails,
              dueDate: values.dueDate,
              approved: approved
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
