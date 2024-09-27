"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, HelpCircle } from "lucide-react";

// FAQ data
const faqs = [
  {
    question: "How do I create a new tournament?",
    answer: [
      "To create a new tournament, log in to your account and click on the 'Create Tournament' button on the dashboard. Fill in the required details such as tournament name, date, format, and number of participants. Once you've entered all the information, click 'Create' to set up your tournament.",
    ],
  },
  {
    question: "Can I edit tournament details after creation?",
    answer: [
      "You can not edit most tournament details after creation. You can edit team squad and match details, but you can't change the tournament format or number of participants. If you need to make changes, you can cancel the tournament and create a new one with the updated details.",
    ],
  },
  {
    question: "How do I add moderators to my tournament?",
    answer: [
      "After creating your tournament, go to the tournament page and click on 'Edit Moderators'. You can add users as moderators by searching their names. Moderators will have access to manage the matches and update scores.",
    ],
  },
  {
    question: "What tournament formats are supported?",
    answer: [
      "Our app supports different tournament types. Only limitations are there are no 2nd round matches and no home-away systems.  You can select the format that best suits your needs when creating a new tournament.",
    ],
  },
  {
    question: "How can I track scores and update brackets?",
    answer: [
      "As the tournament progresses, admin and moderators can update scores on the tournament page. Click on a match and enter the scores. The app will automatically update the brackets after all the matches have been completed in one category.",
    ],
  },
  {
    question: "Is there a limit to the number of participants?",
    answer: [
      "The maximum number of participants depends on your tournament type.",
    ],
  },
  // {
  //   question: "Can I generate a tournament report?",
  //   answer: [
  //     "Yes, you can generate a comprehensive tournament report once the event is completed. Go to the tournament page and click on 'Generate Report'. This will create a PDF with all match results, final standings, and statistics.",
  //   ],
  // },
  {
    question: "What user roles are in the application",
    answer: [
      "The user who creates the tournament is the admin by default. Admins can add moderators to help manage the tournament. Moderators have access to only update match scores",
      "Admins can also remove moderators from the tournament page.",
    ],
  },

  {
    question: "What does Start Tournament do?",
    answer: [
      " Clicking on the 'Start Tournament' button will mark the tournament as active, the squad becomes final and can not be changed. You also can not change the match details after a tournament is started. Admins and moderators can update scores and manage the tournament.",
    ],
  },
  {
    question: "How do I delete a tournament?",
    answer: [
      "To delete a tournament, go to the tournament page and click on 'Delete Tournament'.",
    ],
  },
  // {
  //   question: "How do I contact support?",
  //   answer: [
  //     "If you have any questions or need assistance, you can contact our support team by sending an email to",
  //   ],
  // },
  {
    question: "What can I change about a match?",
    answer: ["You can change match location and date"],
  },
  {
    question: "How do I change Squad?",
    answer: [
      "You can change the squad by clicking on the 'Edit Squad' button in the team page.",
      "You can find from all available players and add them to the squad. This does not affect the general team squad",
    ],
  },
];

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="cardFull dark:bg-slate-900">
        <CardHeader>
          <div className="flex items-center justify-center space-x-2">
            <HelpCircle className="w-6 h-6 text-primary" />
            <CardTitle className="text-2xl font-bold">
              Frequently Asked Questions
            </CardTitle>
          </div>
          <CardDescription className="text-center">
            Find answers to common questions about creating and managing
            tournaments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search FAQs..."
                className="pl-8 dark:bg-slate-950"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {filteredFaqs.map((faq, index) => (
              <AccordionItem
                value={`item-${index}`}
                key={index}
                className="border border-muted rounded-lg overflow-hidden shadow-sm"
              >
                <AccordionTrigger className="px-4 py-3 hover:bg-muted/50 transition-colors">
                  <span className="text-left font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="p-4 dark:bg-slate-800 bg-slate-100">
                  {faq.answer.map((answer, index) => (
                    <li key={index} className="text-left py-2">
                      {answer}
                    </li>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          {filteredFaqs.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground text-lg">
                No matching questions found. Please try a different search term.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
