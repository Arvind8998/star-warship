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
import CircularProgress from "@mui/material/CircularProgress";
import RocketIcon from "@mui/icons-material/Rocket";
import "./Spaceship.css";

const Spaceships = () => {
  const [spaceShips, setSpaceShips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pilots, setPilots] = useState([]);
  const [isPilotDetailsModalOpen, openPilotDetailsModal] =
    React.useState(false);
  const [pilotToolTip, setPilotToolTip] = useState(null);
  const [selectedSpaceship, setSelectedSpaceship] = useState(false);

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

  const fetchSpaceShips = async () => {
    try {
      setLoading(true);
      const response = {
        count: 36,
        next: "https://swapi.dev/api/starships/?page=2",
        previous: null,
        results: [
          {
            name: "CR90 corvette",
            model: "CR90 corvette",
            manufacturer: "Corellian Engineering Corporation",
            cost_in_credits: "3500000",
            length: "150",
            max_atmosphering_speed: "950",
            crew: "30-165",
            passengers: "600",
            cargo_capacity: "3000000",
            consumables: "1 year",
            hyperdrive_rating: "2.0",
            MGLT: "60",
            starship_class: "corvette",
            pilots: [],
            films: [
              "https://swapi.dev/api/films/1/",
              "https://swapi.dev/api/films/3/",
              "https://swapi.dev/api/films/6/",
            ],
            created: "2014-12-10T14:20:33.369000Z",
            edited: "2014-12-20T21:23:49.867000Z",
            url: "https://swapi.dev/api/starships/2/",
          },
          {
            name: "Star Destroyer",
            model: "Imperial I-class Star Destroyer",
            manufacturer: "Kuat Drive Yards",
            cost_in_credits: "150000000",
            length: "1,600",
            max_atmosphering_speed: "975",
            crew: "47,060",
            passengers: "n/a",
            cargo_capacity: "36000000",
            consumables: "2 years",
            hyperdrive_rating: "2.0",
            MGLT: "60",
            starship_class: "Star Destroyer",
            pilots: [],
            films: [
              "https://swapi.dev/api/films/1/",
              "https://swapi.dev/api/films/2/",
              "https://swapi.dev/api/films/3/",
            ],
            created: "2014-12-10T15:08:19.848000Z",
            edited: "2014-12-20T21:23:49.870000Z",
            url: "https://swapi.dev/api/starships/3/",
          },
          {
            name: "Sentinel-class landing craft",
            model: "Sentinel-class landing craft",
            manufacturer: "Sienar Fleet Systems, Cyngus Spaceworks",
            cost_in_credits: "240000",
            length: "38",
            max_atmosphering_speed: "1000",
            crew: "5",
            passengers: "75",
            cargo_capacity: "180000",
            consumables: "1 month",
            hyperdrive_rating: "1.0",
            MGLT: "70",
            starship_class: "landing craft",
            pilots: [],
            films: ["https://swapi.dev/api/films/1/"],
            created: "2014-12-10T15:48:00.586000Z",
            edited: "2014-12-20T21:23:49.873000Z",
            url: "https://swapi.dev/api/starships/5/",
          },
          {
            name: "Death Star",
            model: "DS-1 Orbital Battle Station",
            manufacturer:
              "Imperial Department of Military Research, Sienar Fleet Systems",
            cost_in_credits: "1000000000000",
            length: "120000",
            max_atmosphering_speed: "n/a",
            crew: "342,953",
            passengers: "843,342",
            cargo_capacity: "1000000000000",
            consumables: "3 years",
            hyperdrive_rating: "4.0",
            MGLT: "10",
            starship_class: "Deep Space Mobile Battlestation",
            pilots: [],
            films: ["https://swapi.dev/api/films/1/"],
            created: "2014-12-10T16:36:50.509000Z",
            edited: "2014-12-20T21:26:24.783000Z",
            url: "https://swapi.dev/api/starships/9/",
          },
          {
            name: "Millennium Falcon",
            model: "YT-1300 light freighter",
            manufacturer: "Corellian Engineering Corporation",
            cost_in_credits: "100000",
            length: "34.37",
            max_atmosphering_speed: "1050",
            crew: "4",
            passengers: "6",
            cargo_capacity: "100000",
            consumables: "2 months",
            hyperdrive_rating: "0.5",
            MGLT: "75",
            starship_class: "Light freighter",
            pilots: [
              "https://swapi.dev/api/people/13/",
              "https://swapi.dev/api/people/14/",
              "https://swapi.dev/api/people/25/",
              "https://swapi.dev/api/people/31/",
            ],
            films: [
              "https://swapi.dev/api/films/1/",
              "https://swapi.dev/api/films/2/",
              "https://swapi.dev/api/films/3/",
            ],
            created: "2014-12-10T16:59:45.094000Z",
            edited: "2014-12-20T21:23:49.880000Z",
            url: "https://swapi.dev/api/starships/10/",
          },
          {
            name: "Y-wing",
            model: "BTL Y-wing",
            manufacturer: "Koensayr Manufacturing",
            cost_in_credits: "134999",
            length: "14",
            max_atmosphering_speed: "1000km",
            crew: "2",
            passengers: "0",
            cargo_capacity: "110",
            consumables: "1 week",
            hyperdrive_rating: "1.0",
            MGLT: "80",
            starship_class: "assault starfighter",
            pilots: [],
            films: [
              "https://swapi.dev/api/films/1/",
              "https://swapi.dev/api/films/2/",
              "https://swapi.dev/api/films/3/",
            ],
            created: "2014-12-12T11:00:39.817000Z",
            edited: "2014-12-20T21:23:49.883000Z",
            url: "https://swapi.dev/api/starships/11/",
          },
          {
            name: "X-wing",
            model: "T-65 X-wing",
            manufacturer: "Incom Corporation",
            cost_in_credits: "149999",
            length: "12.5",
            max_atmosphering_speed: "1050",
            crew: "1",
            passengers: "0",
            cargo_capacity: "110",
            consumables: "1 week",
            hyperdrive_rating: "1.0",
            MGLT: "100",
            starship_class: "Starfighter",
            pilots: [
              "https://swapi.dev/api/people/1/",
              "https://swapi.dev/api/people/9/",
              "https://swapi.dev/api/people/18/",
              "https://swapi.dev/api/people/19/",
            ],
            films: [
              "https://swapi.dev/api/films/1/",
              "https://swapi.dev/api/films/2/",
              "https://swapi.dev/api/films/3/",
            ],
            created: "2014-12-12T11:19:05.340000Z",
            edited: "2014-12-20T21:23:49.886000Z",
            url: "https://swapi.dev/api/starships/12/",
          },
          {
            name: "TIE Advanced x1",
            model: "Twin Ion Engine Advanced x1",
            manufacturer: "Sienar Fleet Systems",
            cost_in_credits: "unknown",
            length: "9.2",
            max_atmosphering_speed: "1200",
            crew: "1",
            passengers: "0",
            cargo_capacity: "150",
            consumables: "5 days",
            hyperdrive_rating: "1.0",
            MGLT: "105",
            starship_class: "Starfighter",
            pilots: ["https://swapi.dev/api/people/4/"],
            films: ["https://swapi.dev/api/films/1/"],
            created: "2014-12-12T11:21:32.991000Z",
            edited: "2014-12-20T21:23:49.889000Z",
            url: "https://swapi.dev/api/starships/13/",
          },
          {
            name: "Executor",
            model: "Executor-class star dreadnought",
            manufacturer: "Kuat Drive Yards, Fondor Shipyards",
            cost_in_credits: "1143350000",
            length: "19000",
            max_atmosphering_speed: "n/a",
            crew: "279,144",
            passengers: "38000",
            cargo_capacity: "250000000",
            consumables: "6 years",
            hyperdrive_rating: "2.0",
            MGLT: "40",
            starship_class: "Star dreadnought",
            pilots: [],
            films: [
              "https://swapi.dev/api/films/2/",
              "https://swapi.dev/api/films/3/",
            ],
            created: "2014-12-15T12:31:42.547000Z",
            edited: "2014-12-20T21:23:49.893000Z",
            url: "https://swapi.dev/api/starships/15/",
          },
          {
            name: "Rebel transport",
            model: "GR-75 medium transport",
            manufacturer: "Gallofree Yards, Inc.",
            cost_in_credits: "unknown",
            length: "90",
            max_atmosphering_speed: "650",
            crew: "6",
            passengers: "90",
            cargo_capacity: "19000000",
            consumables: "6 months",
            hyperdrive_rating: "4.0",
            MGLT: "20",
            starship_class: "Medium transport",
            pilots: [],
            films: [
              "https://swapi.dev/api/films/2/",
              "https://swapi.dev/api/films/3/",
            ],
            created: "2014-12-15T12:34:52.264000Z",
            edited: "2014-12-20T21:23:49.895000Z",
            url: "https://swapi.dev/api/starships/17/",
          },
        ],
      };

      //   await axios.get("/starships");
      const spaceShipsArr = response?.results ?? [];
      //   response?.data?.results ?? [];
      setSpaceShips(spaceShipsArr);
      setLoading(false);
    } catch (e) {
      console.log("Error in fetching spaceships");
    }
  };

  useEffect(() => {
    fetchSpaceShips();
  }, []);

  const getSpaceShipInfo = async (spaceship = {}) => {
    openPilotDetailsModal(true);
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
    setSelectedSpaceship(spaceship);
  };
  const handleTooltip = (index) => {
    setPilotToolTip(pilotToolTip === index ? null : index);
  };

  const getPilotsView = () => {
    return pilots.map((pilot, idx) => (
      <Tooltip
        onClose={() => handleTooltip(null)}
        open={pilotToolTip === idx}
        title={
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            {pilot.gender}
          </Typography>
        }
        arrow
        PopperProps={{
          disablePortal: true,
        }}
        disableFocusListener
        disableHoverListener
        disableTouchListener
      >
        <Typography
          onClick={() => handleTooltip(idx)}
          id="keep-mounted-modal-title"
          variant="h6"
          component="h2"
          className="pilotName"
        >
          {pilot.name}
        </Typography>
      </Tooltip>

      //   <>
      // <Typography
      //   onClick={() => handleTooltip(idx)}
      //   id="keep-mounted-modal-title"
      //   variant="h6"
      //   component="h2"
      //   className="pilotName"
      // >
      //   {pilot.name}
      //       <Tooltip
      //         PopperProps={{
      //           disablePortal: true,
      //         }}
      //         onClose={() => {
      //           setPilotToolTip(null);
      //         }}
      //         open={pilotToolTip === idx}
      //         disableFocusListener
      //         disableHoverListener
      //         disableTouchListener
      //         title="Add"
      //       >
      //   <Typography
      //     id="keep-mounted-modal-title"
      //     variant="h6"
      //     component="h2"
      //   >
      //     {pilot.gender}
      //   </Typography>
      //       </Tooltip>
      //     </Typography>
      //   </>
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
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="spaceships-container">
          {spaceShips.map((spaceship, idx) => (
            <div
              key={"idx" + idx}
              className="SpaceShip"
              onClick={() => getSpaceShipInfo(spaceship)}
            >
              <Paper elevation={0}>
                <Card>
                  <CardActionArea>
                    <RocketIcon />
                    <CardContent>
                      <Typography component="div">
                        Name: {spaceship.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Paper>
            </div>
          ))}

          <Modal
            keepMounted
            open={isPilotDetailsModalOpen}
            onClose={() => {
              openPilotDetailsModal(false);
            }}
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
      )}
    </>
  );
};

export default Spaceships;
