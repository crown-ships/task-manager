import React, { useState, useEffect } from 'react'
import { Grid} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from "../../../controls/Button";
import Input from "../../../controls/Input";
import { useForm, Form } from '../../useForm';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const initialFValues = {
  amtToBePaid: '',
  dueDate: '',
  vendorName: ''
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


    var complist = props.allVendors.map(function(item) {
      if(item.enabled === "true" && item.approved === "approved")
        return item.vendorName;
      else
        return "0"
    });

    var j;
    var len = 0;
    var trimlist = [];
    for(j=0; j<complist.length; j++) {
      if(complist[j] !== "0"){
        trimlist[len++] = complist[j];
      }
    }
    var selList = [];
    var i;
    selList[0] = {key:0, item: ""};
    for(i=0; i<len; i++) {
      selList[i+1] = {key:i+1, item: trimlist[i]};
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
              vendorName: values.vendorName,
              vendorID: vendorDetails._id,
              vendorStartDate: vendorDetails.startDate,
              vendorEndDate: vendorDetails.endDate,
              vendorCrtAmt: vendorDetails.contractAmt,
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
        if (props.vendor != null)
            setValues({
                vendorName: props.vendor
            })
    }, [props.vendor])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={8}>
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="outlined-vendorName-native-simple">Vendor Name</InputLabel>
                      <Select
                        native
                        value={values.vendorName}
                        onChange={handleInputChange}
                        label="Vendor Name"
                        inputProps={{
                          name: 'vendorName',
                          id: 'outlined-vendorName-native-simple'
                        }}
                      >{selList.map(item =><option key={item.key} value={item.item}>{item.item}</option>)}
                      </Select>
                    </FormControl>
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
                <Grid item xs={4}>
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
