import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Button from "../../../controls/Button";
import Input from "../../../controls/Input";
import { useForm, Form } from '../../useForm';

const initialFValues = {
    vendorEmail:'',
    contactNo:'',
    contractAmt:0,
    endDate:''
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
          console.log(props.recordForEdit);
            const approved = (props.auth.user.role === "admin" || props.auth.user.role === "super-admin")?"approved":"wait";
            const input = {
              vendorEmail:values.email,
              contactNo:values.contactNo,
              contractAmt:values.contractAmt,
              endDate:values.endDate,
              pendingAmt:values.pendingAmt,
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
                        name="vendorEmail"
                        label="Vendor Email"
                        value={values.vendorEmail}
                        onChange={handleInputChange}
                        error={errors.vendorEmail}
                    />
                    <Input
                        name="contactNo"
                        label="Contact Number"
                        value={values.contactNo}
                        onChange={handleInputChange}
                        error={errors.contactNo}
                    />
                    <Input
                        name="contractAmt"
                        label="Contract Amount"
                        value={values.contractAmt}
                        onChange={handleInputChange}
                        error={errors.contractAmt}
                    />
                    <Input
                      id="date"
                      type="date"
                      defaultValue="2017-05-24"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="endDate"
                      label="End Date"
                      value={values.endDate}
                      onChange={handleInputChange}
                      error={errors.endDate}
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
