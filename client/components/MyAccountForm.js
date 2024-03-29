import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../store"
import { useState,useEffect } from "react";
import { setflashMessage } from "../store";



export const MyAccountForm = () => {
    const profile = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const {
        register: register5,
        handleSubmit: handleSubmit5,
        formState: { errors,isDirty,isValid },
        setValue,
      } = useForm({mode:"onChange",
          defaultValues:{
              form:{
                  firstName: profile.firstName,
                  lastName: profile.lastName,
                  email:profile.email
              }
          }
      });


    useEffect( ()=>{
        setValue("form",{
            firstName:profile.firstName,
            lastName:profile.lastName,
            email:profile.email
        })
    }, [profile])

    const onSubmit = async (data) => {
        const newUser = {
            email: data.form.email,
            firstName: data.form.firstName,
            lastName: data.form.lastName,
            isAdmin: profile.isAdmin,
            id: profile.id,
            password: profile.password,
        }
      try{
          await dispatch(updateUser(newUser))
          .then(()=>{
              dispatch(setflashMessage(true,"success","Your profile has been updated"));
          })
      }catch(ex){
          console.log(ex)
      }
    }

  return (
    <div>
   {profile ?
    <Box component="form" onSubmit={handleSubmit5(onSubmit)} key={4}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoFocus
            name="firstName"
            {...register5("form.firstName", { required: true })}
            id="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="lastName"
            {...register5("form.lastName", { required: true })}
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="email"
            {...register5("form.email", {
                required: "Required field",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9._%+-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              error={!!errors?.email}
              helperText={errors?.email ? errors.email.message : null}
            label="Email"
            fullWidth
            autoComplete="email"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Button type="submit" fullWidth variant="contained" color="primary" disabled={!isDirty || !isValid}>
            Update Information
          </Button>
        </Grid>
      </Grid>
    </Box>:null}
    </div>
  );
};
