import { Avatar, Button, Divider, Grid2, IconButton, Typography } from "@mui/material";
import { Edit, Save } from "@mui/icons-material";


const ProfilePicture = ({ profilePicture, handleFileChange, isEditingProfile, handleEditProfile, handleSaveProfile }) => {
    return (
      <div style={{display:"flex", flexDirection:"column"}}>
        <Typography variant="h6" sx={{fontWeight:"bold", color:"darkblue"}} gutterBottom>
            Profile Picture
        </Typography> 
        <Divider sx={{ mb: 2}} />
        <Grid2 container spacing={2} alignItems="center">
          <Grid2 item xs={12} sm={4} md={3} sx={{ textAlign: "center" }}>
            <Avatar src={profilePicture} alt="Profile" sx={{ width: 150, height: 150, mx: "auto" }} />
          </Grid2>
          <Grid2 item xs={12} sm={8} md={9}>
            {isEditingProfile ? (
              <>
                <Button
                  variant="contained"
                  component="label"
                  sx={{ mr: 2, mb: { xs: 2, sm: 0 } }}
                >
                  Upload New Picture
                  <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                </Button>
                <IconButton color="primary" onClick={handleSaveProfile}>
                  <Save />
                </IconButton>
              </>
            ) : (
              <IconButton color="primary" onClick={handleEditProfile}>
                <Edit />
              </IconButton>
            )}
          </Grid2>
        </Grid2>
      </div>
    );
  };

  export default ProfilePicture;
  