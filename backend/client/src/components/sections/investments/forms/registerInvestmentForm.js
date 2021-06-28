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
    paymentTerms: 'none'
}

const invtype = [
  {
    key:0,
    item: ""
  },
  {
    key:1,
    item: "one-time"
  },
  {
    key: 2,
    item: "recurring"
  }
];

const payterms = [
  {
    key:0,
    item: "none"
  },
  {
    key: 1,
    item: "monthly"
  },
  {
    key:2,
    item: "quarterly"
  },
  {
    key: 3,
    item: "half-yearly"
  },
  {
    key: 4,
    item: "yearly"
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

    var i;
    var investorDetails =  {};
    for(i=0; i< props.allInvestors.length; i++) {
      if(props.allInvestors[i].investorName === props.investor)
        investorDetails = props.allInvestors[i];
    }


    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const approved = (props.auth.user.role === "admin")?"approved":"wait";
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

    const handleInvChange = (event) => {
      let val = event.target;
      values.investmentType = val;
    };
    const handleTermChange = (event) => {
      let val = event.target;
      values.paymentTerms = val;
    };
    return (
      <React.Fragment>
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={8}>
                <Input
                    name="investmentName"
                    label="Investment Name"
                    value={values.investmentName}
                    onChange={handleInputChange}
                    error={errors.investmentName}
                />
                    <Input
                        name="profitPercent"
                        label="Rate"
                        value={values.profitPercent}
                        onChange={handleInputChange}
                        error={errors.profitPercent}
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

                      <InputLabel htmlFor="outlined-investmentType-native-simple">Investment Type</InputLabel>
                      <Select
                        native
                        value={values.investmentType}
                        onChange={handleInputChange}
                        label="Investment Type"
                        inputProps={{
                          name: 'Investment Type',
                          id: 'outlined-investmentType-native-simple',
                        }}
                      >{invtype.map(item =><option key={item.key} value={item.item}>{item.item}</option>)}
                      </Select>


                      <InputLabel htmlFor="outlined-paymentTerms-native-simple">Payment Terms</InputLabel>
                      <Select
                        native
                        value={values.paymentTerms}
                        onChange={handleInputChange}
                        label="Payment Terms"
                        inputProps={{
                          name: 'Payment Terms',
                          id: 'outlined-paymentTerms-native-simple',
                        }}
                      >{payterms.map(item =><option key={item.key} value={item.item}>{item.item}</option>)}
                      </Select>
                    
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
