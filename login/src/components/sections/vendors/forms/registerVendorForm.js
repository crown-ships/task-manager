import React, { useState, useEffect } from 'react'
import { Grid} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from "../../../controls/Button";
import Input from "../../../controls/Input";
import { useForm, Form } from '../../useForm';


const initialFValues = {
  vendorName:'',
  vendorEmail:'',
  contactNo:'',
  contractAmt:0,
  startDate:'',
  endDate:'',
  pendingAmt:0
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
              vendorName:values.vendorName,
              vendorEmail:values.vendorEmail,
              contactNo:values.contactNo,
              contractAmt:values.contractAmt,
              startDate:values.startDate,
              endDate:values.endDate,
              pendingAmt:values.pendingAmt,
              creatorName: props.auth.user.name,
              creatorID: props.auth.user.id,
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
              <Grid item xs={7}>
                  <Input
                      name="vendorName"
                      label="Vendor Name"
                      value={values.vendorName}
                      onChange={handleInputChange}
                      error={errors.vendorName}
                  />
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
                      name="pendingAmt"
                      label="Pending Amount"
                      value={values.pendingAmt}
                      onChange={handleInputChange}
                      error={errors.pendingAmt}
                  />
                  <Input
                    id="date"
                    type="date"
                    defaultValue="2017-05-24"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="startDate"
                    label="Start Date"
                    value={values.startDate}
                    onChange={handleInputChange}
                    error={errors.startDate}
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
