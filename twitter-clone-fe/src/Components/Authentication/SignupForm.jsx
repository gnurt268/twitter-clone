import React from "react";
import { Grid, TextField, Button,InputLabel, Select, MenuItem } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { blue } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { registerUser } from "../../Store/Auth/Action";
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, index) => currentYear - index);
const days = Array.from({ length: 31 }, (_, index) => index + 1);
const months = [
    {value:1,label:"January"},
    {value:2,label:"February"},
    {value:3,label:"March"},
    {value:4,label:"April"},
    {value:5,label:"May"},
    {value:6,label:"June"},
    {value:7,label:"July"},
    {value:8,label:"August"},
    {value:9,label:"September"},
    {value:10,label:"October"},
    {value:11,label:"November"},
    {value:12,label:"December"},
]
const SignupForm = () => {
  const dispath=useDispatch()
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      dateOfBirth: {
        day: "",
        month: "",
        year: "",
      }
    },
    validationSchema,
    onSubmit: (values) => {
        const {day, month, year} = values.dateOfBirth;
        const dateOfBirth = `${year}-${month}-${day}`;
        values.dateOfBirth = dateOfBirth;
        dispath(registerUser(values))
      console.log("form value ", values);
    },
  });

  const handleDateChange=(name)=>(event) => {
      formik.setFieldValue("dateOfBirth",{
          ...formik.values.dateOfBirth,
          [name]: event.target.value,
      })
  }
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Full Name"
            name="fullName"
            autoComplete="off"
            variant="outlined"
            size="large"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            variant="outlined"
            size="large"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Password"
            name="password"
            variant="outlined"
            size="large"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Grid>
        <Grid item xs={4}>
            <InputLabel>Month</InputLabel>
            <Select name="month" value={formik.values.dateOfBirth.month}
            onChange={handleDateChange("month")}
            onBlur={formik.handleBlur}
            fullWidth
            >
                {months.map((month) => <MenuItem key={month.label} value={month.value}>{month.label}</MenuItem>)}
            </Select>
        </Grid>
        <Grid item xs={4}>
            <InputLabel>Day</InputLabel>
            <Select name="day" value={formik.values.dateOfBirth.day}
            onChange={handleDateChange("day")}
            onBlur={formik.handleBlur}
            fullWidth
            >
                {days.map((day) => <MenuItem key={day} value={day}>{day}</MenuItem>)}
            </Select>
        </Grid>
        <Grid item xs={4}>
            <InputLabel>Year</InputLabel>
            <Select name="year" value={formik.values.dateOfBirth.year}
            onChange={handleDateChange("year")}
            onBlur={formik.handleBlur}
            fullWidth
            >
                {years.map((year) => <MenuItem key={year} value={year}>{year}</MenuItem>)}
            </Select>
        </Grid>
        <Grid className="mt-20" item xs={12}>
          <Button
            sx={{ borderRadius: "29px", py: "15px", bgColor: blue[500] }}
            type="submit"
            fullWidth
            variant="contained"
            size="large"
          >
            Sign up
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SignupForm;
