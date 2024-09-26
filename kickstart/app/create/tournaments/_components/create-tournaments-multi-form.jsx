"use client";

import { useState, useEffect, useRef, useContext } from "react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";

import QFMatcher from "./create-qf-matcher";
import SFMatcher from "./create-sf-matcher";
import GroupMatcher from "./create-group-matcher";
import CreateTeamsTournament from "./create-team-list";
import TournamentPreview from "./create-tournament-preview";

import { DateTimePicker } from "./date-time-picker";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { addTournaments } from "@/app/actions";
import { useRouter } from "next/navigation";
import { capitalizeFirstLetter } from "@/utils/data-util";
import { AuthContext } from "@/app/contexts";

export function TournamentMultiForm() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(6);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    location: "",
    organizer: "",
    groupsNum: 1,
    teamsPerGroup: 1,
    teamsQPerGroup: 1,
  });
  const [quarterSwitch, setQuarterSwitch] = useState(false);
  const [semiSwitch, setSemiSwitch] = useState(false);
  const [thirdSwitch, setThirdSwitch] = useState(false);
  const [teamsQualifiedList, setTeamsQualifiedList] = useState([]);
  const [isAllGroupsFilled, setIsAllGroupsFilled] = useState(false);
  const [groupMatch, setGroupMatch] = useState([]);
  const [quarterMatch, setQuarterMatch] = useState([]);
  const [semiMatch, setSemiMatch] = useState([]);
  const [teamsTournament, setTeamsTournament] = useState([]);
  const [loading, setLoading] = useState(false);

  const { loggedUser } = useContext(AuthContext);

  const [startDate, setStartDate] = useState(
    new Date(new Date().setHours(0, 0, 0, 0))
  );
  const [endDate, setEndDate] = useState(
    new Date(new Date().setHours(0, 0, 0, 0))
  );
  const router = useRouter();

  // console.log("semi");
  // console.log(quarterMatch);
  // console.log(semiMatch);
  // console.log(groupMatch);
  // console.log(teamsTournament);

  useEffect(() => {
    if (page === 2) {
      setSemiMatch([]);
      setQuarterMatch([]);
      setGroupMatch([]);
      // setTeamsTournament([]);
    }
  }, [page]);

  const validateGroups = (teamsQPerGroup, valueInt) => {
    const invalidCombinations = {
      2: [8],
      4: [4, 8],
      8: [2, 4, 8],
    };

    if (invalidCombinations[teamsQPerGroup]?.includes(valueInt)) {
      toast.error(
        "Number of Groups * Number of Teams Qualified must equal or less than 8"
      );
      return false;
    }
    return true;
  };
  const setSwitches = (teamsQPerGroup, valueInt, typeS) => {
    console.log(typeS);
    const quarterSwitchCombinations = [
      [8, 1],
      [1, 8],
      [2, 4],
      [4, 2],
    ];
    const semiSwitchCombinations = [
      [4, 1],
      [1, 4],
      [2, 2],
    ];

    const isQuarterSwitch = quarterSwitchCombinations.some(
      ([q, v]) => q === teamsQPerGroup && v === valueInt
    );
    const isSemiSwitch = semiSwitchCombinations.some(
      ([q, v]) => q === teamsQPerGroup && v === valueInt
    );

    setQuarterSwitch(isQuarterSwitch);

    if (isQuarterSwitch || isSemiSwitch) {
      if (typeS === "G") {
        console.log("quarter switch G");
        console.log(valueInt + "  " + teamsQPerGroup);
        const teamsQ = generateTeamLabels(valueInt, teamsQPerGroup);
        console.log(teamsQ);

        setTeamsQualifiedList(teamsQ);
      } else if (typeS === "Q") {
        console.log("quarter switch q");
        console.log(teamsQPerGroup + "  " + valueInt);
        const teamsQ = generateTeamLabels(teamsQPerGroup, valueInt);
        console.log(teamsQ);
        setTeamsQualifiedList(teamsQ);
      }
    }

    setSemiSwitch(isSemiSwitch && !isQuarterSwitch);
  };
  const handleRadioChangeGroup = (value) => {
    const valueInt = parseInt(value);
    if (!validateGroups(formData.teamsQPerGroup, valueInt)) {
      return;
    }
    setSwitches(formData.teamsQPerGroup, valueInt, "G");
    setFormData((prevData) => ({
      ...prevData,
      groupsNum: valueInt,
    }));
  };
  const handleRadioChangeGroupQ = (value) => {
    const valueInt = parseInt(value);

    if (!validateGroups(formData.groupsNum, valueInt)) {
      return;
    }

    setSwitches(formData.groupsNum, valueInt, "Q");

    setFormData((prevData) => {
      const newTeamsPerGroup =
        valueInt > prevData.teamsPerGroup ? valueInt : prevData.teamsPerGroup;
      return {
        ...prevData,
        teamsPerGroup: newTeamsPerGroup,
        teamsQPerGroup: valueInt,
      };
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    console.log(name);

    const valueInt = parseInt(value);
    setFormData((prevData) => {
      if (name === "teamsPerGroup" && valueInt < prevData.teamsQPerGroup) {
        return {
          ...prevData,
          teamsPerGroup: prevData.teamsQPerGroup,
        };
      } else {
        return {
          ...prevData,
          [name]: value,
        };
      }
    });
  };

  const handleNext = () => {
    console.log("next");
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevious = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const generateGroupLabels = (groupsNum) => {
    const labels = [];
    for (let i = 0; i < groupsNum; i++) {
      labels.push(String.fromCharCode(65 + i)); // 65 is the ASCII code for 'A'
    }
    return labels;
  };
  const generateTeamLabels = (groupsNum, teamsPerGroupQualified) => {
    const labels = [];
    for (let i = 0; i < groupsNum; i++) {
      const groupLabel = String.fromCharCode(65 + i); // 65 is the ASCII code for 'A'
      for (let j = 1; j <= teamsPerGroupQualified; j++) {
        labels.push(`${groupLabel}${j}`);
      }
    }
    return labels;
  };

  // console.log(startDate);
  // console.log(endDate);
  // console.log("page " + page);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (page < totalPages) {
      return; // Prevent form submission if not on the last page
    }
    console.log("submit");
    console.log(page);
    // console.log(formData);
    // Here you would typically send the data to a server
    if (
      formData.name === "" ||
      formData.organizer === "" ||
      formData.bio === "" ||
      formData.location === ""
    ) {
      toast.error("Fill all the tournament information");
      return;
    }

    const tournamentStatus = "upcoming";
    const tournamentData = {
      ...formData,
      startDate: startDate,
      endDate: endDate,
      teamsTournament: teamsTournament,
      status: tournamentStatus,
      isThirdPlace: thirdSwitch,
      groupMatch,
      quarterMatch,
      semiMatch,
      thirdSwitch,
      name: capitalizeFirstLetter(formData.name),
      bio: capitalizeFirstLetter(formData.bio),
      location: capitalizeFirstLetter(formData.location),
      organizer: capitalizeFirstLetter(formData.organizer),
    };

    // console.log(tournamentData);
    const createdTournament = await addTournaments(tournamentData, loggedUser);
    console.log("createdTournament");
    console.log(createdTournament);
    router.push(`/tournament/${createdTournament.id}`);
    setLoading(false);

    //     {
    //     "name": "tname",
    //     "groupsNum": 1,
    //     "teamsPerGroup": 8,
    //     "teamsQPerGroup": 8,
    //     "bio": "tbio",
    //     "location": "tlocaiton",
    //     "organizer": "torganizer",
    //     "startDate": "2024-09-09T21:00:00.000Z",
    //     "endDate": "2024-09-10T21:00:00.000Z",
    //     "teams": [
    //         {
    //             "id": "66da0d4dc3ad3ec6dafeacb6",
    //             "name": "Man City",
    //             "bio": "man is blue",
    //             "location": "Manchester",
    //             "players": [],
    //             "__v": 0
    //         },
    //         {
    //             "id": "66da0d9ac3ad3ec6dafeacbc",
    //             "name": "man u",
    //             "bio": "man is red",
    //             "location": "Manchester",
    //             "players": [],
    //             "__v": 0
    //         },
    //         {
    //             "id": "66da0dafc3ad3ec6dafeacbe",
    //             "name": "tottenham",
    //             "bio": "chickens",
    //             "location": "London",
    //             "players": [],
    //             "__v": 0
    //         },
    //         {
    //             "id": "66da0dfdc3ad3ec6dafeacc2",
    //             "name": "Real Madrid",
    //             "bio": "hala madrid",
    //             "location": "Madrid",
    //             "players": [],
    //             "__v": 0
    //         },
    //         {
    //             "id": "66da0e0dc3ad3ec6dafeacc4",
    //             "name": "FC Barcelona",
    //             "bio": "culers",
    //             "location": "Barcelona",
    //             "players": [],
    //             "__v": 0
    //         },
    //         {
    //             "id": "66da0e25c3ad3ec6dafeacc6",
    //             "name": "FC Bayern",
    //             "bio": "mia san mia",
    //             "location": "Berlin",
    //             "players": [],
    //             "__v": 0
    //         },
    //         {
    //             "id": "66dcadb3452f638115d30982",
    //             "name": "Argentina",
    //             "bio": "this is a country",
    //             "location": "Argentina",
    //             "players": [
    //                 "66d7733f6e2f2988fc3735fc"
    //             ],
    //             "__v": 0
    //         },
    //         {
    //             "id": "66da0d88c3ad3ec6dafeacba",
    //             "name": "arsenal",
    //             "bio": "london is red",
    //             "location": "London",
    //             "players": [],
    //             "__v": 0
    //         }
    //     ],
    //     "groupMatch": [
    //         {
    //             "name": "Group A",
    //             "teams": [
    //                 {
    //                     "id": "66da0d9ac3ad3ec6dafeacbc",
    //                     "name": "man u",
    //                     "bio": "man is red",
    //                     "location": "Manchester",
    //                     "players": [],
    //                     "__v": 0
    //                 },
    //                 {
    //                     "id": "66da0dafc3ad3ec6dafeacbe",
    //                     "name": "tottenham",
    //                     "bio": "chickens",
    //                     "location": "London",
    //                     "players": [],
    //                     "__v": 0
    //                 },
    //                 {
    //                     "id": "66da0e0dc3ad3ec6dafeacc4",
    //                     "name": "FC Barcelona",
    //                     "bio": "culers",
    //                     "location": "Barcelona",
    //                     "players": [],
    //                     "__v": 0
    //                 },
    //                 {
    //                     "id": "66da0e25c3ad3ec6dafeacc6",
    //                     "name": "FC Bayern",
    //                     "bio": "mia san mia",
    //                     "location": "Berlin",
    //                     "players": [],
    //                     "__v": 0
    //                 },
    //                 {
    //                     "id": "66dcadb3452f638115d30982",
    //                     "name": "Argentina",
    //                     "bio": "this is a country",
    //                     "location": "Argentina",
    //                     "players": [
    //                         "66d7733f6e2f2988fc3735fc"
    //                     ],
    //                     "__v": 0
    //                 },
    //                 {
    //                     "id": "66da0d88c3ad3ec6dafeacba",
    //                     "name": "arsenal",
    //                     "bio": "london is red",
    //                     "location": "London",
    //                     "players": [],
    //                     "__v": 0
    //                 },
    //                 {
    //                     "id": "66da0d4dc3ad3ec6dafeacb6",
    //                     "name": "Man City",
    //                     "bio": "man is blue",
    //                     "location": "Manchester",
    //                     "players": [],
    //                     "__v": 0
    //                 },
    //                 {
    //                     "id": "66da0dfdc3ad3ec6dafeacc2",
    //                     "name": "Real Madrid",
    //                     "bio": "hala madrid",
    //                     "location": "Madrid",
    //                     "players": [],
    //                     "__v": 0
    //                 }
    //             ]
    //         }
    //     ],
    //     "quarterMatch": [
    //         {
    //             "team1": {
    //                 "qName": "A8"
    //             },
    //             "team2": {
    //                 "qName": "A2"
    //             }
    //         },
    //         {
    //             "team1": {
    //                 "qName": "A5"
    //             },
    //             "team2": {
    //                 "qName": "A4"
    //             }
    //         },
    //         {
    //             "team1": {
    //                 "qName": "A3"
    //             },
    //             "team2": {
    //                 "qName": "A6"
    //             }
    //         },
    //         {
    //             "team1": {
    //                 "qName": "A7"
    //             },
    //             "team2": {
    //                 "qName": "A1"
    //             }
    //         }
    //     ],
    //     "semiMatch": [],
    //     "thirdSwitch": true
    // }
  };
  // console.log("filler" + isAllGroupsFilled);

  return (
    <Card className=" max-w-3xl w-full cardFull dark:bg-slate-900">
      <form>
        <CardHeader>
          <CardTitle>
            Create Tournament (Page {page}/{totalPages})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {page === 1 && (
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData?.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  required
                  className="dark:bg-slate-800"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="bio">Description</Label>
                <Input
                  id="bio"
                  name="bio"
                  type="text"
                  value={formData?.bio}
                  onChange={handleInputChange}
                  placeholder="Tournament Description"
                  className="dark:bg-slate-800"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="bio">Location</Label>
                <Input
                  id="location"
                  name="location"
                  type="text"
                  value={formData?.location}
                  onChange={handleInputChange}
                  placeholder="Tournament Location"
                  className="dark:bg-slate-800"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="bio">Start Date</Label>
                {/* <Input
                  id="startDate"
                  name="startDate"
                  type="text"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  placeholder="Tournament Start Date"
                /> */}

                {/* <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover> */}
                <DateTimePicker value={startDate} onChange={setStartDate} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="bio">End Date</Label>
                {/* <Input
                  id="endDate"
                  name="endDate"
                  type="text"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  placeholder="Tournament End Date"
                /> */}

                <DateTimePicker value={endDate} onChange={setEndDate} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="bio">Organizer</Label>
                <Input
                  id="organizer"
                  name="organizer"
                  type="text"
                  value={formData?.organizer}
                  onChange={handleInputChange}
                  placeholder="Tournament organizer"
                  required
                  className="dark:bg-slate-800"
                />
              </div>

              {page == 1 &&
                (formData.name === "" ||
                  formData.organizer === "" ||
                  formData.bio === "" ||
                  formData.location === "") && (
                  <Alert
                    variant="destructive"
                    className="my-4 dark:bg-slate-800 font-semibold dark:text-red-500"
                  >
                    <AlertDescription>
                      Remember to fill all information before proceeding
                    </AlertDescription>
                  </Alert>
                )}
            </div>
          )}

          {page === 2 && (
            <div className="grid w-full items-center gap-4">
              <div>
                <Label>Number of Groups</Label>
                <RadioGroup
                  value={formData.groupsNum.toString()}
                  onValueChange={handleRadioChangeGroup}
                  className="flex flex-row gap-4 my-2"
                >
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="1" id="1" />
                    <Label htmlFor="1">1</Label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="2" id="2" />
                    <Label htmlFor="2">2</Label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="4" id="4" />
                    <Label htmlFor="4">4</Label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="8" id="8" />
                    <Label htmlFor="8">8</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="age">Teams Per Group</Label>
                <Input
                  id="teamsPerGroup"
                  name="teamsPerGroup"
                  type="number"
                  value={formData.teamsPerGroup}
                  onChange={handleInputChange}
                  placeholder="5"
                  className="dark:bg-slate-800"
                />
              </div>
              <div>
                <Label>Teams Qualified Per Group</Label>
                <RadioGroup
                  value={formData.teamsQPerGroup.toString()}
                  onValueChange={handleRadioChangeGroupQ}
                  className="flex flex-row gap-4 my-2"
                >
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="1" id="1" />
                    <Label htmlFor="1">1</Label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="2" id="2" />
                    <Label htmlFor="2">2</Label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="4" id="4" />
                    <Label htmlFor="4">4</Label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="8" id="8" />
                    <Label htmlFor="8">8</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="flex flex-col space-y-1.5">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="quarter"
                    checked={quarterSwitch}
                    onClick={() => {
                      console.log("switch");
                      console.log(formData.groupsNum * formData.teamsQPerGroup);
                      if (formData.groupsNum * formData.teamsQPerGroup === 8) {
                        return;
                      } else {
                        toast.error(
                          "Number of Groups * Number of Teams Qualified must be 8"
                        );
                      }
                    }}
                  />

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label htmlFor="quarter">Quarter Final</Label>
                      </TooltipTrigger>
                      <TooltipContent>
                        Number of Groups * Number of Teams Qualified must be 8
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Label htmlFor="airplane-mode" className="text-gray-300">
                    8 teams
                  </Label>
                </div>
              </div>
              {!quarterSwitch && (
                <div className="flex flex-col space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="quarter"
                      checked={semiSwitch}
                      onClick={() => {
                        console.log("switch");
                        console.log(
                          formData.groupsNum * formData.teamsQPerGroup
                        );
                        if (
                          formData.groupsNum * formData.teamsQPerGroup ===
                          4
                        ) {
                          return;
                        } else {
                          toast.error(
                            "Number of Groups * Number of Teams Qualified must be 4"
                          );
                        }
                      }}
                    />

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Label htmlFor="quarter">Semi Final</Label>
                        </TooltipTrigger>
                        <TooltipContent>
                          Number of Groups * Number of Teams Qualified must be 4
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Label htmlFor="airplane-mode" className="text-gray-300">
                      4 teams
                    </Label>
                  </div>
                </div>
              )}
              {
                <div className="flex flex-col space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="third"
                      checked={thirdSwitch}
                      disabled={
                        formData.groupsNum * formData.teamsQPerGroup < 4
                      }
                      onClick={() => {
                        setThirdSwitch(!thirdSwitch);
                      }}
                    />

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Label htmlFor="third">Third Place</Label>
                        </TooltipTrigger>
                        <TooltipContent>
                          Number of Groups * Number of Teams Qualified must be 4
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              }

              {/* <CreateTeamsTournament /> */}
            </div>
          )}
          {page == 3 && (
            <CreateTeamsTournament
              groupsNum={formData.groupsNum}
              teamsPerGroup={formData.teamsPerGroup}
              setTeamsTournament={setTeamsTournament}
              teamsTournament={teamsTournament}
            />
          )}

          {page === 4 && (
            <div className="grid w-full items-center gap-4">
              <GroupMatcher
                numberOfGroups={formData.groupsNum}
                teamsPerGroup={formData.teamsPerGroup}
                teamsQualified={formData.teamsQPerGroup}
                isAllGroupsFilled={isAllGroupsFilled}
                setIsAllGroupsFilled={setIsAllGroupsFilled}
                groupMatch={groupMatch}
                setGroupMatch={setGroupMatch}
                teamsTournament={teamsTournament}
              />
            </div>
          )}

          {page === 5 && (
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col items-start">
                <p>Groups:</p>
                <div className="flex flex-row flex-wrap gap-2 py-2">
                  {generateGroupLabels(formData.groupsNum).map((label) => (
                    <Badge
                      className="bg-black dark:bg-slate-800 text-white text-base"
                      variant={"outline"}
                      key={label}
                    >
                      {label}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-start">
                <p>Qualified Teams:</p>
                <div className="flex flex-row flex-wrap gap-2 py-2">
                  {generateTeamLabels(
                    formData.groupsNum,
                    formData.teamsQPerGroup
                  ).map((label) => (
                    <Badge
                      className="bg-black text-white text-sm dark:bg-slate-800"
                      variant={"outline"}
                      key={label}
                    >
                      {label}
                    </Badge>
                  ))}
                </div>
              </div>

              {quarterSwitch && (
                <QFMatcher
                  teamsQ={teamsQualifiedList}
                  setQuarterMatch={setQuarterMatch}
                />
              )}
              {semiSwitch && (
                <SFMatcher
                  teamsQ={teamsQualifiedList}
                  setSemiMatch={setSemiMatch}
                />
              )}
            </div>
          )}

          {page == 6 && (
            <TournamentPreview
              groupMatch={groupMatch}
              teamsTournament={teamsTournament}
              quarterMatch={quarterMatch}
              semiMatch={semiMatch}
              thirdSwitch={thirdSwitch}
              formData={formData}
              startDate={startDate}
              endDate={endDate}
            />
            // <div>pp</div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between py-4 ">
          {page > 1 && (
            <div
              className="customButton w-28"
              onClick={handlePrevious}
              type="button"
            >
              Previous
            </div>
          )}
          {page < totalPages ? (
            <div
              type="button"
              disabled={
                (page === 1 &&
                  (formData.name === "" ||
                    formData.organizer === "" ||
                    formData.bio === "" ||
                    formData.location === "")) ||
                (page === 4 && !isAllGroupsFilled) ||
                (page === 3 &&
                  teamsTournament.length !==
                    formData.groupsNum * formData.teamsPerGroup)
              }
              onClick={handleNext}
              className="customButton w-28"
            >
              Next
            </div>
          ) : (
            <button
              className="customButton w-28 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
              type="button"
              onClick={(e) => handleSubmit(e)}
            >
              {loading ? "Creating..." : "Submit"}
            </button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
