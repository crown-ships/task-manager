import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Button from "../../../controls/Button";
import Input from "../../../controls/Input";
import { useForm, Form } from '../../useForm';


const initialFValues = {
    companyName: '',
    email: '',
    websiteURL: '',
    contactNo: ''
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
            const input = {
              companyName: values.companyName,
              email: values.email,
              websiteURL: values.websiteURL,
              contactNo: values.contactNo
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
                <Grid item xs={9}>
                    <Input
                        name="companyName"
                        label="Company Name"
                        value={values.companyName}
                        onChange={handleInputChange}
                        error={errors.companyName}
                    />
                    <Input
                        name="email"
                        label="Email Address"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                    <Input
                        name="websiteURL"
                        label="Website"
                        value={values.websiteURL}
                        onChange={handleInputChange}
                        error={errors.websiteURL}
                    />
                    <Input
                        name="contactNo"
                        label="Contact Info"
                        value={values.contactNo}
                        onChange={handleInputChange}
                        error={errors.contactNo}
                    />
                </Grid>
                <Grid item xs={3}>
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
