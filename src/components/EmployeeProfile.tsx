import React from 'react';
import { Employee } from './Employee';
import { Card, CardContent, Typography, Avatar, Grid, Button, Divider, Box, IconButton, TextField, Input, Link } from '@mui/material';
import { LinkedIn, Twitter, Facebook } from '@mui/icons-material';
import './EmployeeProfile.css';
// import axios from 'axios';

interface EmployeeProfileProps {
  employee: Employee;
}

const EmployeeProfile: React.FC<EmployeeProfileProps> = ({ employee }) => {
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // const [preview, setPreview] = useState<string | null>(null);
  // const [uploadStatus, setUploadStatus] = useState<string>('');

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     setSelectedFile(file);
  //     setPreview(URL.createObjectURL(file));
  //   }
  // };

  // const handleUpload = async () => {
  //   if (!selectedFile) {
  //     setUploadStatus('No file selected.');
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append('image', selectedFile);

  //   try {
  //     const response = await axios.post('/upload', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });
  //     setUploadStatus('Upload successful!');
  //     console.log(response.data);
  //   } catch (error) {
  //     setUploadStatus('Upload failed.');
  //     console.error(error);
  //   }
  // };
  const confirmDelete = (): boolean => {
    return window.confirm('Are you sure you want to delete this profile?');
  };

  return (
    <Card className="employee-profile" sx={{ bgcolor: '#F1F0FA' }}>
      <CardContent sx={{ mx: 25 }}>
        <CardContent sx={{ display: 'flex' }}>
          <Card sx={{ display: 'flex' }}>
            <Grid item xs={12} sm={4}>
              <Avatar src={employee.image} alt={employee.name} sx={{ position: 'relative', width: 200, height: 200, margin: 2 }} />
              <Button sx={{ position: 'absolute', width: 40, height: 40, margin: 20, mt: -10, cursor: 'pointer' }}
                startIcon={<Avatar src="/src/images/edit1.png" />}
              />

              {/* <Button variant="outlined" startIcon={<Edit />} sx={{ position: 'absolute', m: -10, ml: 8, bgcolor: '#f6a071' }}></Button> */}
            </Grid>
            <Grid item xs={12} sm={8} sx={{ textAlign: 'start', ml: 5 }}>
              <Grid gap={3} sx={{ display: 'flex', pt: 2 }}>
                <Typography variant="h5" ><strong>{employee.name}</strong></Typography>
                <Typography variant="subtitle1" px={1} borderRadius={1} bgcolor={'#6FCFE8'} color={'white'}>{employee.status}</Typography>
              </Grid>
              <Typography variant="body1" color={'#8A8A8A'}><strong>Role: </strong> {employee.role}</Typography>
              <Typography variant="body1" color={'#8A8A8A'}><strong>Position: </strong> {employee.position}</Typography>
              <Typography variant="body1" color={'#8A8A8A'}><strong>Email: </strong> {employee.email}</Typography>
              <Typography variant="body1" color={'#8A8A8A'}><strong>Phone: </strong> {employee.phone}</Typography>
              <Typography variant="body1" color={'#8A8A8A'}><strong>Company: </strong> {employee.company}</Typography>
              <Grid sx={{ display: 'flex' }}>
                <Box mt={2}>
                  <IconButton color="primary"><Link href="https://www.linkedin.com/"><LinkedIn /></Link></IconButton>
                  <IconButton color="primary"><Link href="https://x.com/i/flow/login?input_flow_data=%7B%22requested_variant%22%3A%22eyJteCI6IjIifQ%3D%3D%22%7D"><Twitter /></Link></IconButton>
                  <IconButton color="primary"><Link href="https://www.facebook.com/"><Facebook /></Link></IconButton>
                </Box>
                <Box mt={2} ml={6}>
                  <Button variant="outlined" sx={{ color: '#C51D1D', bgcolor: '#F6A1A1', mr: 2 }} onClick={() => confirmDelete() && /* delete profile logic */ alert('Profile deleted!')}>Delete Profile</Button>
                </Box>
              </Grid>
            </Grid>
          </Card>
          <Card className='emptyCard'></Card>
        </CardContent>
        <Card className='personal-detail'>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h5" pt={3} pl={3} textAlign={'left'}><strong>Basic Information</strong></Typography>
              <Grid display={'flex'} textAlign={'left'} gap={6} pl={2}>
                <Typography pl={2} pt={2} color={'#8A8A8A'}><strong>Hired Date</strong><br /> {employee.hiredDate}</Typography>
                <Typography pl={2} pt={2} color={'#8A8A8A'}><strong>Employee ID</strong><br /> {employee.employeeId}</Typography>
              </Grid>
              <Divider sx={{ my: 2 }} variant="middle" />
              <Typography variant="h5" sx={{ pl: 3, textAlign: 'left' }}><strong>Personal Information</strong></Typography>
              <Grid sx={{ p: 2 }}>
                <Grid sx={{ display: 'flex', textAlign: 'left', gap: 4, pl: 2 }}>
                  <Grid>
                    <Typography variant="body1" color={'#8A8A8A'}>Birth Date</Typography>
                    <TextField id="standard-basic" defaultValue={employee.birthDate} size="small" variant="standard" />
                  </Grid>
                  <Grid>
                    <Typography variant="body1" color={'#8A8A8A'}><strong>Address</strong></Typography>
                    <TextField id="standard-basic" defaultValue={employee.address} size="small" variant="standard" />
                  </Grid>
                  <Grid>
                    <Typography variant="body1" color={'#8A8A8A'}><strong>City</strong></Typography>
                    <TextField id="standard-basic" defaultValue={employee.city} size="small" variant="standard" />
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={12} sx={{ display: 'flex', textAlign: 'left', pt: 2, gap: 4, pl: 2 }}>
                  <Grid>
                    <Typography variant="body1" color={'#8A8A8A'}><strong>State</strong></Typography>
                    <TextField id="standard-basic" defaultValue={employee.state} size="small" variant="standard" />
                  </Grid>
                  <Grid>
                    <Typography variant="body1" color={'#8A8A8A'}><strong>Country</strong></Typography>
                    <TextField id="standard-basic" defaultValue={employee.country} size="small" variant="standard" />
                  </Grid>
                  <Grid>
                    <Typography variant="body1" color={'#8A8A8A'}><strong>Postal Code</strong></Typography>
                    <Input id="standard-basic" defaultValue={employee.postalCode} size="small"></Input>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Divider variant="middle" orientation="vertical" flexItem />
            <Grid item xs={12} sm={5}>
              <Typography variant="h5" sx={{ textAlign: 'left', pt: 3, pl: 2 }}><strong>Financial Information</strong></Typography>
              <Grid sx={{ display: 'flex', p: 2, textAlign: 'left', gap: 10 }}>
                <Grid>
                  <Typography variant="body1" color={'#8A8A8A'}><strong>Bank Name</strong></Typography>
                  <TextField id="standard-basic1" defaultValue={employee.bankName} size="small" variant="standard" />
                  <Typography variant="body1" color={'#8A8A8A'}><strong>Tax ID</strong></Typography>
                  <TextField id="standard-basic1" defaultValue={employee.taxId} size="small" disabled variant="standard" />
                </Grid>
                <Grid>
                  <Typography variant="body1" color={'#8A8A8A'}><strong>Account Number</strong></Typography>
                  <TextField id="standard-basic1" defaultValue={employee.accountNumber} size="small" variant="standard" />
                  <Typography variant="body1" color={'#8A8A8A'}><strong>Salary</strong></Typography>
                  <TextField id="standard-basic1" defaultValue={employee.salary} size="small" disabled variant="standard" />
                </Grid>
              </Grid>
              <Box mt={2}>
                <Button variant="outlined" sx={{ bgcolor: '#A767E7', color: 'white', border: 1, borderColor: '#000051', ml: 6 }}>Save Changes</Button>
                <Button variant="outlined" sx={{ bgcolor: '#E0DFFF', color: 'black', ml: 6 }} >Cancel</Button>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </CardContent>
    </Card>
  );
};

export default EmployeeProfile;
