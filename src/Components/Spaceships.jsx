import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "../Axios/axios";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import "./Spaceship.css";

const Spaceships = () => {
  const [spaceShips, setSpaceShips] = useState([]);
  const [pilots, setPilots] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [isPilotTooltipOpen, setPilotToolTip] = useState(false);
  const [selectedSpaceship, setSelectedSpaceship] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    const fetchSpaceShips = async () => {
      try {
        const response = await axios.get("starships");
        const spaceShipsArr = response?.data?.results ?? [];
        setSpaceShips(spaceShipsArr);
      } catch (e) {
        console.log("Error in fetching spaceships");
      }
    };
    fetchSpaceShips();
  }, []);

  const getSpaceShipInfo = async (spaceship = {}) => {
    const pilotspromiseArr = [];
    let pilotsData = [];
    if (spaceship.pilots.length) {
      spaceship.pilots.forEach(async (pilot) => {
        pilotspromiseArr.push(axios.get(pilot));
      });
      const response = await Promise.all(pilotspromiseArr);
      pilotsData = response.map((pilot) => {
        return {
          name: pilot.data?.name,
          gender: pilot.data?.gender,
          hair_color: pilot.data?.hair_color,
          height: pilot.data?.homeworld,
          mass: pilot.data?.mass,
          skin_color: pilot.data?.skin_color,
          birth_year: pilot.data?.birth_year,
          created: pilot.data?.created,
        };
      });
    }
    setPilots(pilotsData);
    setPilotToolTip(true);
    setSelectedSpaceship(spaceship);
    handleOpen();
  };

  const getPilotsView = () => {
    return pilots.map((pilot) => (
      <>
        <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
          {pilot.name}
        </Typography>
        <Button onClick={handleTooltipOpen}>Click</Button>

        <div>
          <Tooltip
            PopperProps={{
              disablePortal: true,
            }}
            onClose={() => {
              setPilotToolTip(false);
            }}
            open={isPilotTooltipOpen}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title="Add"
          >
            <Typography
              id="keep-mounted-modal-title"
              variant="h6"
              component="h2"
            >
              {pilot.gender}
            </Typography>
          </Tooltip>
        </div>
      </>
    ));
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <div className="spaceships-container">
      {/* <Stack direction="row"> */}
      {spaceShips.map((spaceship, idx) => (
        <div
          key={"idx" + idx}
          className="SpaceShip"
          onClick={() => getSpaceShipInfo(spaceship)}
        >
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="/static/images/cards/contemplative-reptile.jpg"
                alt="green iguana"
              />
              <CardContent>
                <Typography component="div">Name: {spaceship.name}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      ))}
      {/* </Stack> */}

      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <div>
            <Typography component="div">
              Passangers: {selectedSpaceship.passengers}
            </Typography>
            <Typography component="div">
              Max Speed: {selectedSpaceship.max_atmosphering_speed}
            </Typography>
            <Typography component="div">
              Manufactured By: {selectedSpaceship.manufacturer}{" "}
            </Typography>
            <Typography component="div">
              Cargo Capacity: {selectedSpaceship.manufacturer}{" "}
            </Typography>
            <Typography component="div">
              Length: {selectedSpaceship.length}{" "}
            </Typography>
            <Typography component="div">
              Hyperdrive Rating: {selectedSpaceship.hyperdrive_rating}
            </Typography>
            <Typography component="div">
              Starship Class: {selectedSpaceship.starship_class}{" "}
            </Typography>
            {pilots.length ? getPilotsView() : ""}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Spaceships;
