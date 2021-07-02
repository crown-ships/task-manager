import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Button from "../../../controls/Button";
import Input from "../../../controls/Input";
import { useForm, Form } from '../../useForm';

const initialFValues = {
    rejectReason: ''
}

export default function RejectForm(props) {

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
            props.reject(props.recordForReject._id, values.rejectReason, resetForm);
        }
    }

    useEffect(() => {
        if (props.recordForReject != null)
            setValues({
                ...props.recordForReject
            })
    }, [props.recordForReject])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={7}>
                    <Input
                        name="rejectReason"
                        label="Reason for Rejection"
                        value={values.rejectReason}
                        multiline  = {true}
                        rows = {5}
                        onChange={handleInputChange}
                        error={errors.rejectReason}
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
