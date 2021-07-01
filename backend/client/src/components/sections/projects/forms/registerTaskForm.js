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
    taskName: '',
    taskDetails: '',
    dueDate: '',
    ownerName: '',
    featureName: ''
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

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    var complist = props.allFeatures.map(function(item) {
      if(item.enabled === "true")
        return item.featureName;
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
            var i;
            var featureDetails = {};
            for(i=0; i< props.allFeatures.length; i++) {
              if(props.allFeatures[i].featureName === values.featureName)
                featureDetails = props.allFeatures[i];
            }
            const input = {
              taskName: values.taskName,
              taskDetails: values.taskDetails,
              dueDate: values.dueDate,
              ownerName: values.ownerName,
              creatorName: props.auth.user.name,
              creatorID: props.auth.user.id,
              companyName: featureDetails.companyName,
              companyID: featureDetails.companyID,
              projectName:featureDetails.projectName,
              projectID:featureDetails.projectID,
              featureName:featureDetails.featureName,
              featureID:featureDetails._id,
              percentComplete: values.percentComplete
            };
            props.create(input, resetForm);
        }
    }

    useEffect(() => {
        if (props.feature != null)
            setValues({featureName: props.feature})
    }, [props.feature])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={8}>
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="outlined-featureName-native-simple">Feature Name</InputLabel>
                      <Select
                        native
                        value={values.featureName}
                        onChange={handleInputChange}
                        label="Feature Name"
                        inputProps={{
                          name: 'featureName',
                          id: 'outlined-featureName-native-simple'
                        }}
                      >{selList.map(item =><option key={item.key} value={item.item}>{item.item}</option>)}
                      </Select>
                    </FormControl>
                    <Input
                        name="taskName"
                        label="Task Name"
                        value={values.taskName}
                        onChange={handleInputChange}
                        error={errors.taskName}
                    />
                    <Input
                        name="taskDetails"
                        label="Task Details"
                        value={values.taskDetails}
                        onChange={handleInputChange}
                        error={errors.taskDetails}
                    />

                </Grid>
                <Grid item xs={4}>
                    <Input
                        name="ownerName"
                        label="Owner Name"
                        value={values.ownerName}
                        onChange={handleInputChange}
                        error={errors.ownerName}
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
