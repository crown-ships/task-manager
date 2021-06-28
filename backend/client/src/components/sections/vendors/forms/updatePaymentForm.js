import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Button from "../../../controls/Button";
import Input from "../../../controls/Input";
import { useForm, Form } from '../../useForm';

const initialFValues = {
  amtToBePaid: '',
  dueDate: ''
}

export default function UpdateForm(props) {

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
              paymentName: values.paymentName,
              amtToBePaid: values.amtToBePaid,
              dueDate: values.dueDate,
              approved: approved
          };
          props.edit(input, resetForm, props.recordForEdit._id);
        }
    }

    useEffect(() => {
        if (props.recordForEdit != null)
            setValues({
                ...props.recordForEdit
            })
    }, [props.recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={7}>
                    <Input
                        name="amtToBePaid"
                        label="Amount to Pay"
                        value={values.amtToBePaid}
                        onChange={handleInputChange}
                        error={errors.amtToBePaid}
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
