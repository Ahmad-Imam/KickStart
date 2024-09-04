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

export function TournamentMultiForm() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(3);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    occupation: "",
    interests: "",
    additionalInfo: "",
    groupsNum: 0,
    teamsPerGroup: 0,
    teamsQPerGroup: 0,
  });

  const [quarterSwitch, setQuarterSwitch] = useState(false);

  useEffect(() => {
    // Determine total pages based on age
    if (formData.age && parseInt(formData.age) < 18) {
      setTotalPages(2);
      if (page > 2) setPage(2);
    } else {
      setTotalPages(3);
    }
  }, [formData.age, page]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  console.log(formData);
  const handleRadioChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      occupation: value,
    }));
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
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="age">Number of Groups</Label>
                <Input
                  id="groupsNum"
                  name="groupsNum"
                  type="number"
                  value={formData.groupsNum}
                  onChange={handleInputChange}
                  placeholder="4"
                />
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
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="age">Teams Qualified Per Group</Label>
                <Input
                  id="teamsQPerGroup"
                  name="teamsQPerGroup"
                  type="number"
                  value={formData.teamsQPerGroup}
                  onChange={handleInputChange}
                  placeholder="2"
                />
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
                        return setQuarterSwitch(!quarterSwitch);
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
