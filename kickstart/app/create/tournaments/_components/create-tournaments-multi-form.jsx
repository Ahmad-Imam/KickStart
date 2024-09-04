"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
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
import { set } from "mongoose";

export function TournamentMultiForm() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(3);
  const [formData, setFormData] = useState({
    name: "",
    groupsNum: 1,
    teamsPerGroup: 1,
    teamsQPerGroup: 1,
  });

  const [quarterSwitch, setQuarterSwitch] = useState(false);
  const [semiSwitch, setSemiSwitch] = useState(false);
  const [thirdSwitch, setThirdSwitch] = useState(false);

  useEffect(() => {
    // Determine total pages based on age
    if (formData.age && parseInt(formData.age) < 18) {
      setTotalPages(2);
      if (page > 2) setPage(2);
    } else {
      setTotalPages(3);
    }
  }, [formData.age, page]);

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
  const setSwitches = (teamsQPerGroup, valueInt) => {
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
    setSemiSwitch(isSemiSwitch && !isQuarterSwitch);
  };
  const handleRadioChangeGroup = (value) => {
    const valueInt = parseInt(value);
    if (!validateGroups(formData.teamsQPerGroup, valueInt)) {
      return;
    }
    setSwitches(formData.teamsQPerGroup, valueInt);
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

    setSwitches(formData.groupsNum, valueInt);

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
          [name]: valueInt,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to a server
  };

  return (
    <Card className="mx-auto max-w-lg w-full ">
      <CardHeader>
        <CardTitle>
          Create Tournament (Page {page}/{totalPages})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {page === 1 && (
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="bio">Description</Label>
                <Input
                  id="bio"
                  name="bio"
                  type="text"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Tournament Description"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="bio">Location</Label>
                <Input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Tournament Location"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="bio">Start Date</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="text"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  placeholder="Tournament Start Date"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="bio">End Date</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="text"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  placeholder="Tournament End Date"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="bio">Organizer</Label>
                <Input
                  id="organizer"
                  name="organizer"
                  type="text"
                  value={formData.organizer}
                  onChange={handleInputChange}
                  placeholder="Tournament organizer"
                />
              </div>
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
              {semiSwitch && (
                <div className="flex flex-col space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="quarter"
                      checked={thirdSwitch}
                      onClick={() => {
                        setThirdSwitch(!thirdSwitch);
                      }}
                    />

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Label htmlFor="quarter">Third Place</Label>
                        </TooltipTrigger>
                        <TooltipContent>
                          Number of Groups * Number of Teams Qualified must be 4
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              )}
            </div>
          )}

          {page === 3 && (
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="interests">Interests</Label>
                <Input
                  id="interests"
                  name="interests"
                  value={formData.interests}
                  onChange={handleInputChange}
                  placeholder="Your interests"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="additionalInfo">Additional Information</Label>
                <Textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  placeholder="Any additional information"
                />
              </div>
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {page > 1 && (
          <Button variant="outline" onClick={handlePrevious}>
            Previous
          </Button>
        )}
        {page < totalPages ? (
          <Button onClick={handleNext}>Next</Button>
        ) : (
          <Button type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
