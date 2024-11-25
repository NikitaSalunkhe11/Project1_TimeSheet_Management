import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Avatar,
  Typography,
  TextField,
  Box,
  Checkbox,
  InputAdornment,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { CheckCircle, Search } from "@mui/icons-material";
import "./SelectMember.css"; // Import the custom CSS file
import noMemberFoundImage from "./assest/No Member found.png";
import axios from "axios";

const SelectMember = () => {
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTechnology, setSelectedTechnology] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/members");
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  const handleSelect = (id) => {
    setSelectedMembers((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((memberId) => memberId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleTechnologyChange = (event) => {
    setSelectedTechnology(event.target.value);
  };

  const handleDesignationChange = (event) => {
    setSelectedDesignation(event.target.value);
  };

  const handleButtonClick = () => {
    if (selectedMembers.length > 0) {
      const selectedNames = members
        .filter((member) => selectedMembers.includes(member.id))
        .map((member) => member.name)
        .join(", ");
      alert(`Selected members: ${selectedNames}`);
      setSelectedMembers([]);
    } else {
      alert("Sorry!!! No members selected");
    }
  };

  const filteredMembers = members.filter(
    (member) =>
      (member.name.toLowerCase().includes(searchQuery) ||
        member.role.toLowerCase().includes(searchQuery) ||
        member.id.toString().includes(searchQuery)) && // Search by ID
      (!selectedTechnology || member.technologies === selectedTechnology) &&
      (!selectedDesignation ||
        selectedDesignation === "Both" ||
        member.role === selectedDesignation ||
        (selectedDesignation === "Both" &&
          (member.role === "Senior Developer" ||
            member.role === "Junior Developer")))
  );

  const technologyOptions = Array.from(
    new Set(members.map((member) => member.technologies))
  );
  const designationOptions = Array.from(
    new Set(members.map((member) => member.role))
  );

  const showImage = !searchQuery && !selectedTechnology && !selectedDesignation;

  return (
    <Container className="select-member-container">
      <Box textAlign="center" marginBottom={2}>
        <Typography variant="h4" className="header">
          Select Members
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" marginBottom={2}>
        <FormControl style={{ width: "48%" }}>
          <InputLabel id="technology-label">Technology</InputLabel>
          <Select
            labelId="technology-label"
            id="technology-select"
            value={selectedTechnology}
            onChange={handleTechnologyChange}
          >
            <MenuItem value="">None</MenuItem>
            {technologyOptions.map((tech, index) => (
              <MenuItem key={index} value={tech}>
                {tech}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl style={{ width: "48%" }}>
          <InputLabel id="designation-label">Designation</InputLabel>
          <Select
            labelId="designation-label"
            id="designation-select"
            value={selectedDesignation}
            onChange={handleDesignationChange}
          >
            <MenuItem value="Both">Both</MenuItem>
            {designationOptions.map((designation, index) => (
              <MenuItem key={index} value={designation}>
                {designation}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box display="flex" justifyContent="flex-end" marginBottom={2}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearch}
          className="search-bar"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      {showImage ? (
        <Box textAlign="center" marginTop={4}>
          <img
            src={noMemberFoundImage}
            alt="No Member found!"
            style={{ width: "50%", height: "auto" }}
          />
        </Box>
      ) : filteredMembers.length > 0 ? (
        <Box className="scroll-container">
          <Grid container spacing={2}>
            {filteredMembers.map((member) => (
              <Grid item xs={12} sm={6} md={3} key={member.id}>
                <Card
                  className={`member-card ${
                    selectedMembers.includes(member.id) ? "selected" : ""
                  }`}
                >
                  <CardActionArea onClick={() => handleSelect(member.id)}>
                    <CardContent style={{ position: "relative" }}>
                      <Avatar
                        alt={member.name}
                        src={member.img}
                        style={{ width: 100, height: 100, margin: "0 auto" }}
                      />
                      <Typography variant="h6" align="center">
                        {member.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        align="center"
                      >
                        {member.role}
                      </Typography>
                      {selectedMembers.includes(member.id) && (
                        <Checkbox
                          checked
                          icon={<CheckCircle />}
                          checkedIcon={<CheckCircle />}
                          style={{
                            color: "green",
                            position: "absolute",
                            top: 0,
                            right: 0,
                          }}
                        />
                      )}
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Box textAlign="center" marginTop={4}>
          <img
            src={noMemberFoundImage}
            alt="No Member found!"
            style={{ width: "50%", height: "auto" }}
          />
        </Box>
      )}
      <Box textAlign="center" marginTop={2}>
        <Button variant="contained" color="primary" onClick={handleButtonClick}>
          Select
        </Button>
      </Box>
    </Container>
  );
};

export default SelectMember;
