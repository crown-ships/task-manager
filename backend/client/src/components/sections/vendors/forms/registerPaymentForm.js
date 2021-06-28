import React, { useState, useEffect } from 'react'
import { Grid} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from "../../../controls/Button";
import Input from "../../../controls/Input";
import { useForm, Form } from '../../useForm';


const initialFValues = {
  paymentName: '',
  amtToBePaid: '',
  dueDate: ''
}

export default function RegisterForm(props) {

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x == "")
    }
    var i;
    var vendorDetails = {};
    for(i=0; i< props.allVendors.length; i++) {
      if(props.allVendors[i].vendorName === props.vendor)
        vendorDetails = props.allVendors[i];

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
              vendorName: vendorDetails.vendorName,
              vendorID: vendorDetails._id,
              vendorStartDate: vendorDetails.startDate,
              vendorEndDate: vendorDetails.endDate,
              vendorCrtAmt: vendorDetails.contractAmt,
              paymentName: values.paymentName,
              amtToBePaid: values.amtToBePaid,
              dueDate: values.dueDate,
              creatorName: props.auth.user.name,
              creatorID:props.auth.user.id,
              approved:approved
            };
            console.log(input);
            props.create(input, resetForm);
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
                <Grid item xs={8}>
                    <Input
                        name="paymentName"
                        label="Payment Name"
                        value={values.paymentName}
                        onChange={handleInputChange}
                        error={errors.paymentName}
                    />
                    <Input
                        name="amtToBePaid"
                        label="Amount to Pay"
                        value={values.amtToBePaid}
                        onChange={handleInputChange}
                        error={errors.amtToBePaid}
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
