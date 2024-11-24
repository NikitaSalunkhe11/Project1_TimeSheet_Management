import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  IconButton,
  Container,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

type TaskData = {
  task: string;
  start: string;
  end: string;
  time: string;
  status: string;
};

const Schedule: React.FC = () => {
  let [curDate, setCurDate] = useState(28);
  let [data, setData] = useState([
    {
      task: "ERP Management",
      start: "10:00 am",
      end: "6:00 pm",
      time: "1h",
      status: "Task Done",
    },
    {
      task: "ERP Management",
      start: "10:05 am",
      end: "6:10 pm",
      time: "1h",
      status: "Task Done",
    },
    {
      task: "BugDiscover",
      start: "10:10 am",
      end: "6:05 pm",
      time: "2h",
      status: "Task Done",
    },
    {
      task: "BugDiscover",
      start: "10:00 am",
      end: "6:00 pm",
      time: "1h",
      status: "Task Done",
    },
    {
      task: "ERP Management",
      start: "10:00 am",
      end: "6:00 pm",
      time: "1h",
      status: "Task Done",
    },
  ]);

  // const setDataToTable = () => {
  //   setData(newData);
  // }

  // useEffect(() => {
  //   setDataToTable();
  // }, [])

  // const rows = [
  //   { task: 'new Management', start: '10:00 am', end: '6:00 pm', time: "1h", status: "Task Done" },
  //   { task: 'BugDiscover', start: '10:00 am', end: '6:00 pm', time: "1h", status: "Task Done" },
  //   { task: 'ERP Management', start: '10:00 am', end: '6:00 pm', time: "1h", status: "Task Done" },
  //   { task: 'ERP Management', start: '10:00 am', end: '6:00 pm', time: "1h", status: "Task Done" },
  //   { task: 'ERP Management', start: '10:00 am', end: '6:00 pm', time: "1h", status: "Task Done" },
  // ];

  const newData = [
    {
      task: "new Management",
      start: "10:00 am",
      end: "6:00 pm",
      time: "1h",
      status: "Task Done",
    },
    {
      task: "BugDiscover",
      start: "10:00 am",
      end: "6:00 pm",
      time: "1h",
      status: "Task Done",
    },
    {
      task: "ERP Management",
      start: "10:00 am",
      end: "6:00 pm",
      time: "1h",
      status: "Task Done",
    },
    {
      task: "ERP Management",
      start: "10:00 am",
      end: "6:00 pm",
      time: "1h",
      status: "Task Done",
    },
    {
      task: "ERP Management",
      start: "10:00 am",
      end: "6:00 pm",
      time: "1h",
      status: "Task Done",
    },
  ];

  const dataByDate: { [key: number]: TaskData[] } = {
    1: [
      {
        task: "Task A1",
        start: "9:00 am",
        end: "5:00 pm",
        time: "8h",
        status: "Task Done",
      },
      {
        task: "Task B1",
        start: "10:00 am",
        end: "6:00 pm",
        time: "8h",
        status: "Task Done",
      },
    ],
    2: [
      {
        task: "Task A2",
        start: "9:00 am",
        end: "5:00 pm",
        time: "8h",
        status: "Task Done",
      },
      {
        task: "Task B2",
        start: "10:00 am",
        end: "6:00 pm",
        time: "8h",
        status: "Task Done",
      },
    ],
    3: [
      {
        task: "Task A3",
        start: "9:00 am",
        end: "5:00 pm",
        time: "8h",
        status: "Task Done",
      },
      {
        task: "Task B3",
        start: "10:00 am",
        end: "6:00 pm",
        time: "8h",
        status: "Task Done",
      },
    ],
    4: [
      {
        task: "Task A4",
        start: "9:00 am",
        end: "5:00 pm",
        time: "8h",
        status: "Task Done",
      },
      {
        task: "Task B4",
        start: "10:00 am",
        end: "6:00 pm",
        time: "8h",
        status: "Task Done",
      },
    ],
    5: [
      {
        task: "Task A5",
        start: "9:00 am",
        end: "5:00 pm",
        time: "8h",
        status: "Task Done",
      },
      {
        task: "Task B5",
        start: "10:00 am",
        end: "6:00 pm",
        time: "8h",
        status: "Task Done",
      },
    ],
    6: [
      {
        task: "Task A6",
        start: "9:00 am",
        end: "5:00 pm",
        time: "8h",
        status: "Task Done",
      },
      {
        task: "Task B6",
        start: "10:00 am",
        end: "6:00 pm",
        time: "8h",
        status: "Task Done",
      },
    ],
    7: [
      {
        task: "Task A7",
        start: "9:00 am",
        end: "5:00 pm",
        time: "8h",
        status: "Task Done",
      },
      {
        task: "Task B7",
        start: "10:00 am",
        end: "6:00 pm",
        time: "8h",
        status: "Task Done",
      },
    ],
    8: [
      {
        task: "Task A8",
        start: "9:00 am",
        end: "5:00 pm",
        time: "8h",
        status: "Task Done",
      },
      {
        task: "Task B8",
        start: "10:00 am",
        end: "6:00 pm",
        time: "8h",
        status: "Task Done",
      },
    ],
    9: [
      {
        task: "Task A9",
        start: "9:00 am",
        end: "5:00 pm",
        time: "8h",
        status: "Task Done",
      },
      {
        task: "Task B9",
        start: "10:00 am",
        end: "6:00 pm",
        time: "8h",
        status: "Task Done",
      },
    ],
    10: [
      {
        task: "Task A10",
        start: "9:00 am",
        end: "5:00 pm",
        time: "8h",
        status: "Task Done",
      },
      {
        task: "Task B10",
        start: "10:00 am",
        end: "6:00 pm",
        time: "8h",
        status: "Task Done",
      },
    ],
    11: [
      {
        task: "Task A11",
        start: "9:00 am",
        end: "5:00 pm",
        time: "8h",
        status: "Task Done",
      },
      {
        task: "Task B11",
        start: "10:00 am",
        end: "6:00 pm",
        time: "8h",
        status: "Task Done",
      },
    ],
    12: [
      {
        task: "Task A12",
        start: "9:00 am",
        end: "5:00 pm",
        time: "8h",
        status: "Task Done",
      },
      {
        task: "Task B12",
        start: "10:00 am",
        end: "6:00 pm",
        time: "8h",
        status: "Task Done",
      },
    ],
    13: [
      {
        task: "Task A13",
        start: "9:00 am",
        end: "5:00 pm",
        time: "8h",
        status: "Task Done",
      },
      {
        task: "Task B13",
        start: "10:00 am",
        end: "6:00 pm",
        time: "8h",
        status: "Task Done",
      },
    ],
    14: [
      {
        task: "Task A14",
        start: "9:00 am",
        end: "5:00 pm",
        time: "8h",
        status: "Task Done",
      },
      {
        task: "Task B14",
        start: "10:00 am",
        end: "6:00 pm",
        time: "8h",
        status: "Task Done",
      },
    ],
    15: [
      {
        task: "Task A15",
        start: "9:00 am",
        end: "5:00 pm",
        time: "8h",
        status: "Task Done",
      },
      {
        task: "Task B15",
        start: "10:00 am",
        end: "6:00 pm",
        time: "8h",
        status: "Task Done",
      },
    ],
    16: [
      {
        task: "Task A16",
        start: "9:00 am",
        end: "5:00 pm",
        time: "8h",
        status: "Task Done",
      },
      {
        task: "Task B16",
        start: "10:00 am",
        end: "6:00 pm",
        time: "8h",
        status: "Task Done",
      },
    ],
    17: [
      {
        task: "Task A17",
        start: "9:00 am",
        end: "5:00 pm",
        time: "8h",
        status: "Task Done",
      },
      {
        task: "Task B17",
        start: "10:00 am",
        end: "6:00 pm",
        time: "8h",
        status: "Task Done",
      },
    ],
    18: [
      {
        task: "Task A18",
        start: "9:00 am",
        end: "5:00 pm",
        time: "8h",
        status: "Task Done",
      },
      {
        task: "Task B18",
        start: "10:00 am",
        end: "6:00 pm",
        time: "8h",
        status: "Task Done",
      },
    ],
    19: [
      {
        task: "Task A19",
        start: "9:00 am",
        end: "5:00 pm",
        time: "8h",
        status: "Task Done",
      },
      {
        task: "Task B19",
        start: "10:00 am",
        end: "6:00 pm",
        time: "8h",
        status: "Task Done",
      },
    ],
    20: [
      {
        task: "Task A20",
        start: "9:00 am",
        end: "5:00 pm",
        time: "8h",
        status: "Task Done",
      },
      {
        task: "Task B20",
        start: "10:00 am",
        end: "6:00 pm",
        time: "8h",
        status: "Task Done",
      },
    ],
    // Add more date-specific data here...
    21: [
      {
        task: "ERP Management",
        start: "10:00 am",
        end: "6:00 pm",
        time: "1h",
        status: "Task Done",
      },
      {
        task: "ERP Management",
        start: "10:05 am",
        end: "6:10 pm",
        time: "1h",
        status: "Task Done",
      },
      {
        task: "BugDiscover",
        start: "10:10 am",
        end: "6:05 pm",
        time: "2h",
        status: "Task Done",
      },
      {
        task: "BugDiscover",
        start: "10:00 am",
        end: "6:00 pm",
        time: "1h",
        status: "Task Done",
      },
      {
        task: "ERP Management",
        start: "10:00 am",
        end: "6:00 pm",
        time: "1h",
        status: "Task Done",
      },
    ],
    22: [
      {
        task: "Task A22",
        start: "9:00 am",
        end: "5:00 pm",
        time: "8h",
        status: "Task Done",
      },
      {
        task: "Task B22",
        start: "10:00 am",
        end: "6:00 pm",
        time: "8h",
        status: "Task Done",
      },
    ],
    23: [
      {
        task: "Task A23",
        start: "9:00 am",
        end: "5:00 pm",
        time: "8h",
        status: "Task Done",
      },
      {
        task: "Task B23",
        start: "10:00 am",
        end: "6:00 pm",
        time: "8h",
        status: "Task Done",
      },
    ],
    24: [
      {
        task: "Task A24",
        start: "9:00 am",
        end: "5:00 pm",
        time: "8h",
        status: "Task Done",
      },
      {
        task: "Task B24",
        start: "10:00 am",
        end: "6:00 pm",
        time: "8h",
        status: "Task Done",
      },
    ],
    25: [
      {
        task: "Task A25",
        start: "9:00 am",
        end: "5:00 pm",
        time: "8h",
        status: "Task Done",
      },
      {
        task: "Task B25",
        start: "10:00 am",
        end: "6:00 pm",
        time: "8h",
        status: "Task Done",
      },
    ],
    26: [
      {
        task: "Task A26",
        start: "9:00 am",
        end: "5:00 pm",
        time: "8h",
        status: "Task Done",
      },
      {
        task: "Task B26",
        start: "10:00 am",
        end: "6:00 pm",
        time: "8h",
        status: "Task Done",
      },
    ],
    27: [
      {
        task: "Task A27",
        start: "9:00 am",
        end: "5:00 pm",
        time: "8h",
        status: "Task Done",
      },
      {
        task: "Task B27",
        start: "10:00 am",
        end: "6:00 pm",
        time: "8h",
        status: "Task Done",
      },
    ],
    28: [
      {
        task: "Task A28",
        start: "9:00 am",
        end: "5:00 pm",
        time: "8h",
        status: "Task Done",
      },
      {
        task: "Task B28",
        start: "10:00 am",
        end: "6:00 pm",
        time: "8h",
        status: "Task Done",
      },
    ],
    29: [
      {
        task: "Task A29",
        start: "9:00 am",
        end: "5:00 pm",
        time: "8h",
        status: "Task Done",
      },
      {
        task: "Task B29",
        start: "10:00 am",
        end: "6:00 pm",
        time: "8h",
        status: "Task Done",
      },
    ],
    30: [
      {
        task: "Task A30",
        start: "9:00 am",
        end: "5:00 pm",
        time: "8h",
        status: "Task Done",
      },
      {
        task: "Task B30",
        start: "10:00 am",
        end: "6:00 pm",
        time: "8h",
        status: "Task Done",
      },
    ],
    31: [
      {
        task: "Task A31",
        start: "9:00 am",
        end: "5:00 pm",
        time: "8h",
        status: "Task Done",
      },
      {
        task: "Task B31",
        start: "10:00 am",
        end: "6:00 pm",
        time: "8h",
        status: "Task Done",
      },
    ],
  };

  useEffect(() => {
    if (dataByDate[curDate]) {
      setData(dataByDate[curDate]);
    } else {
      setData([]); // Set empty data if no data is defined for the date
    }
  }, [curDate]);

  const handleDecreaseDate = () => {
    if (curDate > 1) {
      setCurDate(curDate - 1);
    }
  };

  const handleIncreaseDate = () => {
    if (curDate < 31) {
      setCurDate(curDate + 1);
    }
  };

  return (
    <Container
      sx={{
        padding: "16px",
        width: "900px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: "0px",
        backgroundColor: "#F1F0FA",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          width: "620px",
          height: "60px",
          marginLeft: "45px",
        }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt={2}
        mb={2}
      >
        <Typography variant="h6" sx={{ fontSize: "24px" }}>
          <button onClick={handleDecreaseDate}>{"<"}</button>
          {curDate}
          {" May 2024"}
          <button onClick={handleIncreaseDate}>{">"}</button>
        </Typography>
      </Box>
      <Typography
        variant="body2"
        color="red"
        align="right"
        sx={{ marginBottom: "8px" }}
      >
        <Box>
          <Box>
            <IconButton>
              <SearchIcon />
            </IconButton>

            <IconButton>
              <CalendarTodayIcon />
            </IconButton>
          </Box>
          <Box
            sx={{ justifyContent: "space-between" }}
            display="flex"
            color="black"
          >
            <Typography sx={{ marginLeft: "380px" }}>{"<May 2024>"}</Typography>
            <Typography sx={{ color: "red", marginRight: "60px" }}>
              Working Hours 10am - 6pm
            </Typography>
          </Box>
        </Box>
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: 750,
          margin: "auto",
          backgroundColor: "#fff",
          height: "350px",
          justifyContent: "center",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#D8D5F3" }}>
              <TableCell sx={{ textAlign: "center" }}>Task</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Start Time</TableCell>
              <TableCell sx={{ textAlign: "center" }}>End Time</TableCell>
              <TableCell sx={{ display: "flex", justifyContent: "center" }}>
                Working Hours
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={{ textAlign: "center" }}>{row.task}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{row.start}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{row.end}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{row.time}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Schedule;
