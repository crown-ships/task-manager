import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Button from "../../../controls/Button";
import Input from "../../../controls/Input";
import { useForm, Form } from '../../useForm';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const initialFValues = {
    featureDetails: '',
    dueDate: '',
    startDate: '',
    assignee: ''
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
              featureDetails: values.featureDetails,
              dueDate: values.dueDate,
              startDate: values.startDate,
              assignee: values.assignee
          };
          props.edit(input, resetForm, props.recordForEdit._id);
        }
    }

    const dateToString = (date) => {
      if (date != undefined) {
        var d = date.toString();
        d = d.substring(0, d.indexOf('T'));
        return d;
      }
      else {
        return "";
      }
    }


    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit,
                startDate: dateToString(recordForEdit.startDate),
                dueDate: dateToString(recordForEdit.dueDate),
            })
    }, [recordForEdit])


    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={7}>
                    <Input
                        name="featureDetails"
                        label="Milestone Details"
                        value={values.featureDetails}
                        multiline  = {true}
                        rows = {5}
                        onChange={handleInputChange}
                        error={errors.featureDetails}
                    />
                </Grid>
                <Grid item xs={5}>
                <FormControl variant="outlined">
                  <InputLabel htmlFor="outlined-assignee-native-simple">Assignee *</InputLabel>
                  <Select
                    native
                    value={values.assignee}
                    onChange={handleInputChange}
                    label="Assignee"
                    inputProps={{
                      name: 'assignee',
                      id: 'outlined-assignee-native-simple'
                    }}
                  >{props.allUsers.map(item =><option key={item.key} value={item.item}>{item.item}</option>)}
                  </Select>
                </FormControl>
                    <Input
                      id="startDate"
                      type="date"
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
                      id="dueDate"
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
