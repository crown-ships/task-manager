import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Button from "../../../controls/Button";
import Input from "../../../controls/Input";
import { useForm, Form } from '../../useForm';

const initialFValues = {
    taskName: '',
    taskDetails: '',
    dueDate: '',
    ownerName:'',
    percentComplete:0
}

export default function UpdateForm(props) {
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
            const input = {
              taskName: values.taskName,
              taskDetails: values.taskDetails,
              dueDate: values.dueDate,
              percentComplete: parseInt(values.percentComplete),
              ownerName: values.ownerName
          };

          props.edit(input, resetForm, recordForEdit._id);
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
                <Grid item xs={7}>
                    <Input
                        name="taskName"
                        label="Project Name"
                        value={values.taskName}
                        onChange={handleInputChange}
                        error={errors.taskName}
                    />
                    <Input
                        name="taskDetails"
                        label="Project Details"
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
                    <Input
                        name="percentComplete"
                        label="Progress"
                        value={values.percentComplete}
                        onChange={handleInputChange}
                        error={errors.percentComplete}
                    />
                    <Input
                      id="date"
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
                </Grid>
                <Grid item xs={5}>
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
