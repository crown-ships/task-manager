import React, { useState, useEffect } from 'react'
import { Grid} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from "../../../controls/Button";
import Input from "../../../controls/Input";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useForm, Form } from '../../useForm';


const initialFValues = {
    investmentName: '',
    startDate: '',
    dueDate: '',
    profitPercent: '',
    capitalAmt: '',
    capitalPaid: '',
    investmentType: '',
    paymentTerms: '',
    investorName: ''
}

const invtype = [
  {
    key:0,
    item: ""
  },
  {
    key:1,
    item: "one-time",
    label: "One Time"
  },
  {
    key: 2,
    item: "recurring",
    label: "Recurring"
  }
];

const payterms = [
  {
    key:0,
    item: "none",
    label: "None"
  },
  {
    key: 1,
    item: "monthly",
    label: "Monthly"
  },
  {
    key:2,
    item: "quarterly",
    label: "Quarterly"
  },
  {
    key: 3,
    item: "half-yearly",
    label: "Half Yearly"
  },
  {
    key: 4,
    item: "yearly",
    label: "Yearly"
  }
];

export default function RegisterForm(props) {


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

    var complist = props.allInvestors.map(function(item) {
      if (item.approved === "approved")
        return item.investorName;
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
            const approved = (props.auth.user.role === "admin"|| props.auth.user.role === "super-admin")?"approved":"wait";

            var i;
            var investorDetails =  {};
            for(i=0; i< props.allInvestors.length; i++) {
              if(props.allInvestors[i].investorName === values.investorName)
                investorDetails = props.allInvestors[i];
            }

            const input = {
              investorName: investorDetails.investorName,
              investorID: investorDetails._id,
              investmentName: values.investmentName,
              startDate: values.startDate,
              dueDate: values.dueDate,
              profitPercent: values.profitPercent,
              capitalAmt: values.capitalAmt,
              capitalPaid: values.capitalPaid,
              investmentType: values.investmentType,
              paymentTerms: values.paymentTerms,
              approved: approved
            };
            console.log(investorDetails.investorID)
            props.create(input, resetForm);
        }
    }

    useEffect(() => {
        if (props.investor != null)
            setValues({investorName: props.investor})
    }, [props.investor])
    return (
      <React.Fragment>
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={4}>
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="outlined-investorName-native-simple">Investor Name</InputLabel>
                      <Select
                        native
                        value={values.investorName}
                        onChange={handleInputChange}
                        label="Investor Name"
                        inputProps={{
                          name: 'investorName',
                          id: 'outlined-investorName-native-simple'
                        }}
                      >{selList.map(item =><option key={item.key} value={item.item}>{item.item}</option>)}
                      </Select>
                    </FormControl>
                    <Input
                        name="investmentName"
                        label="Investment Name"
                        value={values.investmentName}
                        onChange={handleInputChange}
                        error={errors.investmentName}
                    />

                    <Input
                        name="capitalAmt"
                        label="Capital Amount"
                        value={values.capitalAmt}
                        onChange={handleInputChange}
                        error={errors.capitalAmt}
                    />
                    <Input
                        name="capitalPaid"
                        label="Capital Paid"
                        value={values.capitalPaid}
                        onChange={handleInputChange}
                        error={errors.capitalPaid}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Input
                        name="profitPercent"
                        label="Rate"
                        value={values.profitPercent}
                        onChange={handleInputChange}
                        error={errors.profitPercent}
                    />
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="outlined-investmentType-native-simple">Investment Type</InputLabel>
                      <Select
                        native
                        value={values.investmentType}
                        onChange={handleInputChange}
                        label="Investment Type"
                        InputProps={{
                          name: 'investmentType',
                          id: 'outlined-investmentType-native-simple'
                        }}
                      >{invtype.map(item =><option key={item.key} value={item.item}>{item.label}</option>)}
                      </Select>
                    </FormControl>
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="outlined-paymentTerms-native-simple">Payment Terms</InputLabel>
                      <Select
                        native
                        value={values.paymentTerms}
                        onChange={handleInputChange}
                        label="Payment Terms"
                        InputProps={{
                          name: 'paymentTerms',
                          id: 'outlined-paymentTerms-native-simple',
                          readOnly: (values.investmentType !== "recurring")
                        }}
                      >{payterms.map(item =><option key={item.key} value={item.item}>{item.label}</option>)}
                      </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                <Input
                  id="startDate"
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
                  id="dueDate"
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
        </React.Fragment>
    )
}
