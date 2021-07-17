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
  vendorName:'',
  vendorEmail:'',
  contactNo:'',
  contractAmt:0,
  startDate:'',
  endDate:'',
  companyName: '',
  ownerName: ''
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

    var complist = props.allCompanies.map(function(item) {
      if(item.enabled === "true")
        return item.companyName;
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

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const approved = (props.auth.user.role === "admin" || props.auth.user.role === "super-admin")?"approved":"wait";
            const input = {
              vendorName:values.vendorName,
              companyName: values.companyName,
              ownerName: values.ownerName,
              vendorEmail:values.vendorEmail,
              contactNo:values.contactNo,
              contractAmt:values.contractAmt,
              startDate:values.startDate,
              endDate:values.endDate,
              pendingAmt:values.contractAmt,
              creatorName: props.auth.user.name,
              creatorID: props.auth.user.id,
              approved: approved
            };
            props.create(input, resetForm);
        }
    }

    useEffect(() => {
        if (props.company != null)
            setValues({companyName: props.company})
    }, [props.company])

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
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-companyName-native-simple">Company Name *</InputLabel>
                    <Select
                      native
                      value={values.companyName}
                      onChange={handleInputChange}
                      label="Company Name"
                      inputProps={{
                        name: 'companyName',
                        id: 'outlined-companyName-native-simple'
                      }}
                    >{selList.map(item =><option key={item.key} value={item.item}>{item.item}</option>)}
                    </Select>
                  </FormControl>
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-ownerName-native-simple">Owner Name *</InputLabel>
                    <Select
                      native
                      value={values.ownerName}
                      onChange={handleInputChange}
                      label="Owner Name"
                      inputProps={{
                        name: 'ownerName',
                        id: 'outlined-ownerName-native-simple'
                      }}
                    >{props.allAdmins.map(item =><option key={item.key} value={item.item}>{item.item}</option>)}
                    </Select>
                  </FormControl>
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
